const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.join(__dirname, '../tokens');
const OUTPUT_JS_FILE = path.join(__dirname, '../public/theme.js');
const OUTPUT_CSS_FILE = path.join(__dirname, '../public/theme.css');

// Helper: Deep merge objects
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

// Helper: Read all JSON files in directory recursively
function readTokens(dir) {
  let tokens = {};
  const items = fs.readdirSync(dir, { withFileTypes: true });
  items.sort((a, b) => a.name.localeCompare(b.name));

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      tokens = deepMerge(tokens, readTokens(fullPath));
    } else if (item.isFile() && item.name.endsWith('.json')) {
      const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      tokens = deepMerge(tokens, content);
    }
  }
  return tokens;
}

// Helper: Resolve references
function resolveReferences(tokens, root) {
  const traverse = (node) => {
    if (typeof node === 'string') {
      return node.replace(/\{([^}]+)\}/g, (_, ref) => {
        const refPath = ref.split('.');
        let current = root;
        for (const p of refPath) {
          current = current ? current[p] : undefined;
        }
        if (current && current.$value) return traverse(current.$value);
        if (current !== undefined && typeof current !== 'object') return current;
        return `{${ref}}`;
      });
    } else if (Array.isArray(node)) {
      return node.map(traverse);
    } else if (typeof node === 'object' && node !== null) {
      const result = {};
      for (const key in node) {
        result[key] = traverse(node[key]);
      }
      return result;
    }
    return node;
  };
  return traverse(tokens);
}

// Helper: Flatten token object to simple key-value for JS usage
function flattenTokens(tokens) {
    if (typeof tokens !== 'object' || tokens === null) return tokens;
    if (tokens.hasOwnProperty('$value')) return tokens.$value;
    const result = {};
    for (const key in tokens) {
        result[key] = flattenTokens(tokens[key]);
    }
    return result;
}

// Helper: Flatten for CSS variables
function flattenToCssVars(tokens, prefix = '-') {
  let vars = {};
  for (const key in tokens) {
    const value = tokens[key];
    // If it's a token object ($value), use that.
    if (typeof value === 'object' && value !== null && value.hasOwnProperty('$value')) {
       // It's a token.
       vars[`${prefix}-${key}`] = value.$value;
    } else if (typeof value === 'object' && value !== null) {
       // Recurse
       Object.assign(vars, flattenToCssVars(value, `${prefix}-${key}`));
    } else {
       // It's a raw value (if already flattened, but here we pass raw resolved tokens)
       // Wait, resolveReferences returns structure with $value removed?
       // No, my resolveReferences keeps structure but resolves content of strings.
       // So I should pass resolvedTokens to this.
       // But wait, resolveReferences *returns* the resolved value inside the structure?
       // Ah, `traverse` returns `node` which might be the object containing `$value`.
       // No, `traverse` traverses keys.
       // If node is string, it replaces.
       // If node is object, it recurses.
       // So `$value` content is resolved.
    }
  }
  return vars;
}

// Better flatten for CSS: assumes resolvedTokens input
function generateCssVars(tokens, prefix = '-') {
    let vars = {};

    function recurse(obj, currentPrefix) {
        if (typeof obj === 'object' && obj !== null) {
            if (obj.hasOwnProperty('$value')) {
                vars[currentPrefix] = obj.$value;
            } else {
                for (const key in obj) {
                    recurse(obj[key], `${currentPrefix}-${key}`);
                }
            }
        }
    }
    recurse(tokens, prefix);
    return vars;
}


try {
  console.log('Reading tokens...');
  let rawTokens = readTokens(TOKENS_DIR);

  console.log('Resolving references...');
  let resolvedTokens = resolveReferences(rawTokens, rawTokens);

  let flatTokens = flattenTokens(resolvedTokens);

  // JS Output
  const tailwindConfig = {
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
            ...flatTokens.color,
            glass: { ...flatTokens.glass }
        },
        fontFamily: flatTokens.font?.family || {},
        animation: flatTokens.animation?.semantic || {},
        keyframes: flatTokens.keyframe || {},
        backdropBlur: {
            ...Object.keys(flatTokens.glass || {}).reduce((acc, key) => {
                if (flatTokens.glass[key].blur) {
                    acc[`glass-${key}`] = flatTokens.glass[key].blur;
                }
                return acc;
            }, {})
        }
      }
    }
  };

  const jsContent = `window.tailwind = window.tailwind || {};
window.tailwind.config = ${JSON.stringify(tailwindConfig, null, 4)};
`;
  fs.writeFileSync(OUTPUT_JS_FILE, jsContent);
  console.log(`Theme JS generated at ${OUTPUT_JS_FILE}`);

  // CSS Output
  const cssVars = generateCssVars(resolvedTokens);
  let cssContent = ':root {\n';
  for (const [key, val] of Object.entries(cssVars)) {
      cssContent += `  ${key}: ${val};\n`;
  }
  cssContent += '}\n\n';

  // Generate component classes for legacy/CSS usage
  if (flatTokens.glass) {
      for (const [variant, props] of Object.entries(flatTokens.glass)) {
          // Use CSS vars if possible, or values
          // variant: pure, panel, morphism
          // props: bg, blur, border

          cssContent += `.glass-${variant} {\n`;
          // We can construct the var name: --glass-{variant}-bg
          cssContent += `  background: var(--glass-${variant}-bg);\n`;
          cssContent += `  backdrop-filter: blur(var(--glass-${variant}-blur));\n`;
          cssContent += `  -webkit-backdrop-filter: blur(var(--glass-${variant}-blur));\n`;

          // Border handling
          if (variant === 'panel') {
             // Mimic original behavior if needed, or stick to all-sides.
             // Original was border-top. But let's standardize on border for the class
             // and let usage override if needed.
             // However, to keep screens looking right:
             // screens mostly use glass-pure.
             cssContent += `  border: 1px solid var(--glass-${variant}-border);\n`;
          } else {
             cssContent += `  border: 1px solid var(--glass-${variant}-border);\n`;
          }
          cssContent += '}\n';
      }
  }

  // Add some helper classes that were in index.html if not covered
  // .img-scrim-deep, etc. are not tokens yet, so they remain in index.html <style>
  // or we can move them here if we tokenized them. I'll leave them in index.html.

  fs.writeFileSync(OUTPUT_CSS_FILE, cssContent);
  console.log(`Theme CSS generated at ${OUTPUT_CSS_FILE}`);

} catch (err) {
  console.error('Error generating theme:', err);
  process.exit(1);
}
