const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.join(__dirname, '../tokens');
const OUTPUT_FILE = path.join(__dirname, '../public/theme.js');

// Helper to deep merge objects
function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

// Helper to read tokens
function readTokens(dir) {
  let tokens = {};
  if (!fs.existsSync(dir)) return tokens;
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      const nested = readTokens(filePath);
      tokens = deepMerge(tokens, nested);
    } else if (file.endsWith('.json')) {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      tokens = deepMerge(tokens, content);
    }
  });
  return tokens;
}

// Helper to resolve references {path.to.value}
function resolveReferences(obj, root) {
  const traverse = (node) => {
    if (typeof node === 'string') {
        // Handle {reference}
        return node.replace(/\{([^}]+)\}/g, (match, pathStr) => {
            const parts = pathStr.split('.');
            let current = root;
            for (const part of parts) {
                current = current ? current[part] : undefined;
            }
            if (current && current.$value) {
                return current.$value;
            }
            return match; // Keep if not found
        });
    } else if (typeof node === 'object' && node !== null) {
        if (node.$value !== undefined) {
             // It's a token
             const resolvedValue = traverse(node.$value);
             return { ...node, $value: resolvedValue };
        }
        // It's a group
        const newObj = {};
        for (const key in node) {
            newObj[key] = traverse(node[key]);
        }
        return newObj;
    }
    return node;
  };

  // Resolve multiple passes to handle chained refs
  let resolved = obj;
  for(let i=0; i<3; i++) {
     resolved = traverse(resolved);
  }
  return resolved;
}

// Helper to transform to Tailwind config
function transformToTailwind(tokens) {
  const theme = {
    extend: {
      colors: {},
      fontFamily: {},
      blur: {},
      backdropBlur: {},
      animation: {},
      keyframes: {}
    }
  };

  function process(node, path = []) {
    if (node && node.$value !== undefined) {
      const value = node.$value;
      const type = node.$type;

      if (type === 'color') {
        const colorPath = path[0] === 'color' ? path.slice(1) : path;
        setDeep(theme.extend.colors, colorPath, value);
      } else if (type === 'fontFamily') {
          const fontPath = path[0] === 'typography' && path[1] === 'fontFamily' ? path.slice(2) : path;
           setDeep(theme.extend.fontFamily, fontPath, value);
      } else if (type === 'dimension' && (path.includes('blur') || path.includes('effect'))) {
          // effect.blur.std
          const blurPath = path[path.length - 1];
          theme.extend.blur[blurPath] = value;
          theme.extend.backdropBlur[blurPath] = value;
      } else if (type === 'animation') {
          const animKey = path[path.length - 1];
          theme.extend.animation[animKey] = value;
      } else if (type === 'keyframes') {
          const kfKey = path[path.length - 1];
          theme.extend.keyframes[kfKey] = value;
      }
    } else if (typeof node === 'object') {
      for (const key in node) {
        process(node[key], [...path, key]);
      }
    }
  }

  process(tokens);
  return theme;
}

function setDeep(obj, path, value) {
    let current = obj;
    for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (!current[key]) current[key] = {};
        current = current[key];
    }
    current[path[path.length - 1]] = value;
}

// Main execution
try {
  console.log('Generating theme...');
  const rawTokens = readTokens(TOKENS_DIR);
  const resolvedTokens = resolveReferences(rawTokens, rawTokens);
  const tailwindConfig = transformToTailwind(resolvedTokens);

  const fileContent = `window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: 'class',
  theme: ${JSON.stringify(tailwindConfig, null, 4)}
};
`;

  fs.writeFileSync(OUTPUT_FILE, fileContent);
  console.log('Theme generated at', OUTPUT_FILE);
} catch (err) {
  console.error('Error generating theme:', err);
  process.exit(1);
}
