const fs = require('fs');
const path = require('path');

// Helper to deeply merge objects
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    // If source[key] has $value or value, it's a token, so we overwrite.
    // Otherwise it's a group, so we merge recursively.
    const isToken = source[key] && (source[key].$value !== undefined || source[key].value !== undefined);

    if (source[key] instanceof Object && !isToken) {
      if (!target[key]) Object.assign(target, { [key]: {} });
      deepMerge(target[key], source[key]);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  }
  return target;
}

// Helper to read all JSON files in a directory recursively
function readTokens(dir) {
  let tokens = {};
  if (!fs.existsSync(dir)) return tokens;

  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
        deepMerge(tokens, readTokens(filePath));
    } else if (file.endsWith('.json')) {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      deepMerge(tokens, content);
    }
  }
  return tokens;
}

// Helper to get token value
function getTokenValue(token) {
    return token.$value !== undefined ? token.$value : token.value;
}

function setTokenValue(token, val) {
    if (token.$value !== undefined) token.$value = val;
    else token.value = val;
}

function getTokenType(token) {
    return token.$type !== undefined ? token.$type : token.type;
}

// Flatten tokens for resolution
function flattenTokens(tokens, prefix = '', result = {}) {
  for (const key in tokens) {
    const val = getTokenValue(tokens[key]);
    if (val !== undefined) {
      result[prefix + key] = val;
    } else if (typeof tokens[key] === 'object') {
      flattenTokens(tokens[key], prefix + key + '.', result);
    }
  }
  return result;
}

// Resolve references e.g. {color.brand.primary}
function resolveReferences(tokens, flatTokens) {
    const resolve = (value) => {
        if (typeof value !== 'string') return value;
        return value.replace(/\{([^}]+)\}/g, (_, path) => {
            const resolved = flatTokens[path];
            if (!resolved) {
                console.warn(`Warning: Could not resolve reference {${path}}`);
                return _;
            }
            return resolve(resolved); // Recurse for nested references
        });
    };

    const process = (obj) => {
        for (const key in obj) {
            const val = getTokenValue(obj[key]);
            if (val !== undefined) {
                setTokenValue(obj[key], resolve(val));
            } else if (typeof obj[key] === 'object') {
                process(obj[key]);
            }
        }
    };
    process(tokens);
    return tokens;
}

// Map tokens to Tailwind config structure
function generateTailwindConfig(tokens) {

    // We only want to output 'extend' for colors, etc. to preserve defaults.
    // Unless we specifically want to override.
    // The previous implementation created empty objects for colors, spacing etc.
    // which overrides defaults. We must NOT do that if we want to keep text-white etc.

    const theme = {
        extend: {
            colors: {},
            spacing: {},
            borderRadius: {},
            fontSize: {},
            fontFamily: {}
        }
    };

    const extractByType = (root, type, prefix = '') => {
        let res = {};
        for(const key in root) {
             const val = getTokenValue(root[key]);
             const tokenType = getTokenType(root[key]);

             if (val !== undefined) {
                 // Check type compatibility (fuzzy match or explicit)
                 // If type is not defined, we might infer or skip.
                 // For now, if type matches or if we are lenient.
                 if (tokenType === type || (!tokenType && type === 'any')) {
                     res[key] = val;
                 }
             } else {
                 const nested = extractByType(root[key], type);
                 if (Object.keys(nested).length > 0) {
                     res[key] = nested;
                 }
             }
        }
        return res;
    };

    // Extract tokens
    theme.extend.colors = extractByType(tokens, 'color');
    theme.extend.spacing = extractByType(tokens, 'spacing');
    theme.extend.borderRadius = extractByType(tokens, 'borderRadius');
    theme.extend.fontSize = extractByType(tokens, 'fontSize');
    theme.extend.fontFamily = extractByType(tokens, 'fontFamily');

    // Add aliases for backward compatibility
    // Map old 'primary' to 'theme.action.primary.default'
    if (!theme.extend.colors.primary) {
        theme.extend.colors.primary = theme.extend.colors.theme?.action?.primary?.default || '#fb923c';
    }
    if (!theme.extend.colors.accent) {
        theme.extend.colors.accent = theme.extend.colors.brand?.secondary || '#f43f5e';
    }
    if (!theme.extend.colors.background) {
         theme.extend.colors.background = {};
    }
    theme.extend.colors.background.dark = theme.extend.colors.theme?.background?.base || '#0a0f1e';
    theme.extend.colors.background.surface = theme.extend.colors.theme?.background?.surface || '#161e31';

    return theme;
}

const tokensDir = path.join(__dirname, '../tokens');
const outputDir = path.join(__dirname, '../public');

console.log('Reading tokens...');
const allTokens = readTokens(tokensDir);

console.log('Resolving references...');
const flatTokens = flattenTokens(allTokens);
resolveReferences(allTokens, flatTokens);

console.log('Generating Tailwind config...');
const tailwindTheme = generateTailwindConfig(allTokens);

// Custom additions to match the original index.html animations
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

const fileContent = `
window.tailwindConfig = {
    darkMode: 'class',
    theme: ${JSON.stringify(tailwindTheme, null, 4)}
};
`;

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

fs.writeFileSync(path.join(outputDir, 'theme.js'), fileContent);
console.log(`Theme generated at ${path.join(outputDir, 'theme.js')}`);
