const fs = require('fs');
const path = require('path');

// Helper to deep merge objects
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && !Array.isArray(source[key]) && key !== '$value' && key !== '$type') {
      if (!target[key]) Object.assign(target, { [key]: {} });
      deepMerge(target[key], source[key]);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  }
  return target;
}

// Helper to resolve aliases like {color.primary}
function resolveValue(value, allTokens) {
  if (typeof value !== 'string') return value;
  const match = value.match(/\{([^}]+)\}/);
  if (match) {
    const path = match[1].split('.');
    let current = allTokens;
    for (const part of path) {
      if (current[part]) {
        current = current[part];
      } else {
        console.warn(`Token reference not found: ${match[1]}`);
        return value; // Return original if not found
      }
    }
    // If the resolved target is an object with $value, take it. Otherwise take the object (intermediate node?)
    // DTCG says resolved value should be the value of the token.
    const resolved = current.$value !== undefined ? current.$value : current;

    // Recursively resolve if the resolved value itself contains an alias
    return resolveValue(value.replace(match[0], resolved), allTokens);
  }
  return value;
}

// Flatten tokens to a map of dot-separated keys -> resolved values
function flattenTokens(tokens, parentKey = '', allTokens, result = {}) {
  for (const key in tokens) {
    if (key === '$value' || key === '$type') continue;

    const prop = tokens[key];
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (prop.$value !== undefined) {
      result[newKey] = resolveValue(prop.$value, allTokens);
    } else {
      flattenTokens(prop, newKey, allTokens, result);
    }
  }
  return result;
}

// Main generation function
function generateTheme() {
  const tokensDir = path.join(__dirname, '../tokens');
  const tokenFiles = [
    '0-primitives.json',
    '1-semantics.json',
    '2-components.json',
    '3-patterns.json',
    '4-context.json'
  ];

  let allTokens = {};

  // Load and merge all tokens
  tokenFiles.forEach(file => {
    const filePath = path.join(tokensDir, file);
    if (fs.existsSync(filePath)) {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      deepMerge(allTokens, content);
    }
  });

  // Resolve all values in place (crude implementation, better to do on demand or multiple passes)
  // For simplicity, we'll assume DAG and no cycles, and resolve during flattening or do a pass.
  // Actually, let's just use the helper which accesses `allTokens` which is fully merged now.

  const flattened = flattenTokens(allTokens, '', allTokens);

  // Generate Tailwind Config
  // We need to map our semantic tokens to Tailwind's theme structure
  // This mapping is specific to how we structured our tokens.

  // Extract colors
  const colors = {};
  // Traverse flattened tokens and pick color.*
  // Actually, we want to map semantic.color.* to theme.colors.*
  // and color.* to theme.colors (if we want primitives available)

  // Let's implement a specific mapping strategy for this project
  const tailwindTheme = {
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: flattened['semantic.color.primary'],
          accent: flattened['semantic.color.accent'],
          background: {
            dark: flattened['semantic.color.background.main'],
            surface: flattened['semantic.color.background.surface']
          }
        },
        fontFamily: {
          sans: [flattened['semantic.font.display'], 'sans-serif'],
          body: [flattened['semantic.font.ui'], 'sans-serif']
        },
        animation: {
          'visual-pulse': 'vpulse 3s ease-in-out infinite',
          'reveal': 'reveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          'float': 'float 4s ease-in-out infinite',
          'connector-flow': 'flow 3s linear infinite'
        },
        keyframes: {
            vpulse: { '0%, 100%': { opacity: '0.4', transform: 'scale(1)' }, '50%': { opacity: '0.8', transform: 'scale(1.05)' } },
            reveal: { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
            float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
            flow: { '0%': { strokeDashoffset: '40' }, '100%': { strokeDashoffset: '0' } }
        }
      }
    }
  };

  // Generate CSS Variables for root
  const cssVars = [
    `--glass: ${flattened['semantic.glass.base']}`,
    `--glass-light: ${flattened['color.base.glass_light']}`,
    `--border-subtle: ${flattened['semantic.glass.border']}`,
    `--blur-std: ${flattened['semantic.glass.blur']}`,
    // Component specific vars if needed, or stick to what index.html had
  ];

  // Output content
  const outputContent = `
// Generated by scripts/generate-theme.cjs
// Do not edit directly.

window.tailwindConfig = ${JSON.stringify(tailwindTheme, null, 2)};

const style = document.createElement('style');
style.textContent = \`
  :root {
    ${cssVars.join(';\n    ')};
  }
\`;
document.head.appendChild(style);
console.log('Theme loaded');
`;

  const outputPath = path.join(__dirname, '../public/theme.js');
  fs.writeFileSync(outputPath, outputContent);
  console.log(`Theme generated at ${outputPath}`);
}

generateTheme();
