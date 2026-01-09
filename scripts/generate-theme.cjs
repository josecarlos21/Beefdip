const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.join(__dirname, '../tokens');
const OUTPUT_FILE = path.join(__dirname, '../public/theme.js');

// Helper to deeply merge objects
function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

// Recursively read directory and merge JSONs
function loadTokens(dir) {
  let tokens = {};
  if (!fs.existsSync(dir)) return tokens;

  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      tokens = deepMerge(tokens, loadTokens(fullPath));
    } else if (item.name.endsWith('.json')) {
      const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      tokens = deepMerge(tokens, content);
    }
  }
  return tokens;
}

// Resolve references like {color.palette.orange.400}
function resolveReferences(tokens, root) {
  const resolved = {};
  for (const key in tokens) {
    const value = tokens[key];
    if (typeof value === 'object' && value !== null) {
      if ('$value' in value) {
        let val = value.$value;
        if (typeof val === 'string' && val.startsWith('{') && val.endsWith('}')) {
          const refPath = val.slice(1, -1).split('.');
          let refValue = root;
          for (const part of refPath) {
            refValue = refValue && refValue[part];
          }
          if (refValue && refValue.$value) {
             val = refValue.$value;
             while (typeof val === 'string' && val.startsWith('{') && val.endsWith('}')) {
                const nextRefPath = val.slice(1, -1).split('.');
                let nextRefValue = root;
                for (const part of nextRefPath) {
                   nextRefValue = nextRefValue && nextRefValue[part];
                }
                if (nextRefValue && nextRefValue.$value) {
                    val = nextRefValue.$value;
                } else {
                    break;
                }
             }
          }
        }
        resolved[key] = val;
      } else {
        resolved[key] = resolveReferences(value, root);
      }
    } else {
      resolved[key] = value;
    }
  }
  return resolved;
}

// Transform resolved tokens into Tailwind config structure
function transformToTailwind(tokens) {
  const theme = {
    extend: {
      colors: {},
      fontFamily: {},
      borderRadius: {}
    }
  };

  // Map Color
  if (tokens.color) {
    const mapColors = (obj) => {
        const res = {};
        for (const k in obj) {
            if (typeof obj[k] === 'string') {
                res[k] = obj[k];
            } else {
                res[k] = mapColors(obj[k]);
            }
        }
        // If 'main' exists, alias it to 'DEFAULT' for Tailwind classes like bg-primary
        if (res.main) {
            res.DEFAULT = res.main;
        }
        return res;
    }

    for (const key in tokens.color) {
        if (key === 'palette') continue;
        theme.extend.colors[key] = mapColors(tokens.color[key]);
    }
  }

  // Map Typography
  if (tokens.font && tokens.font.family) {
      for (const key in tokens.font.family) {
          theme.extend.fontFamily[key] = tokens.font.family[key].split(',').map(s => s.trim());
      }
  }

  // Map Shape/Radius
  if (tokens.shape && tokens.shape.radius) {
      for (const key in tokens.shape.radius) {
          theme.extend.borderRadius[key] = tokens.shape.radius[key];
      }
  }

  return theme;
}

function generate() {
  console.log('Loading tokens...');
  const rawTokens = loadTokens(TOKENS_DIR);

  console.log('Resolving references...');
  const resolvedTokens = resolveReferences(rawTokens, rawTokens);

  console.log('Transforming to Tailwind config...');
  const tailwindTheme = transformToTailwind(resolvedTokens);

  // Add hardcoded animations from original index.html
  tailwindTheme.extend.animation = {
    'visual-pulse': 'vpulse 3s ease-in-out infinite',
    'reveal': 'reveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
    'float': 'float 4s ease-in-out infinite',
    'connector-flow': 'flow 3s linear infinite'
  };
  tailwindTheme.extend.keyframes = {
    vpulse: { '0%, 100%': { opacity: '0.4', transform: 'scale(1)' }, '50%': { opacity: '0.8', transform: 'scale(1.05)' } },
    reveal: { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
    float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
    flow: { '0%': { strokeDashoffset: '40' }, '100%': { strokeDashoffset: '0' } }
  };

  const outputContent = `
// Generated Theme from Design Tokens
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: 'class',
  theme: ${JSON.stringify(tailwindTheme, null, 2)}
};
  `;

  fs.writeFileSync(OUTPUT_FILE, outputContent);
  console.log(`Theme generated at ${OUTPUT_FILE}`);
}

generate();
