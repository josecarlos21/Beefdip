const fs = require('fs');
const path = require('path');

// Helper: Deep merge objects
function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function deepMerge(target, source) {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

// Helper: Resolve references like {color.base.orange.400}
function resolveReferences(obj, fullObj) {
  const str = JSON.stringify(obj);
  // Match only valid token paths (alphanumeric, underscore, dot, hyphen) to avoid matching JSON object braces
  const regex = /\{([a-zA-Z0-9_\.\-]+)\}/g;

  const resolvedStr = str.replace(regex, (match, p1) => {
    const parts = p1.split('.');
    let value = fullObj;
    for (const part of parts) {
      value = value?.[part];
    }
    // If it points to a token object with $value, take that
    if (value && typeof value === 'object' && '$value' in value) {
        return value.$value;
    }
    // If it points to a value directly (already resolved or primitive)
    if (value !== undefined && typeof value !== 'object') {
        return value;
    }
    return match; // Return original if not found
  });

  return JSON.parse(resolvedStr);
}

// Recursive resolver to handle nested references
function recursiveResolve(obj) {
    let previousStr = "";
    let currentObj = obj;

    // limited loops to prevent infinite recursion
    let loops = 0;
    while (loops < 10) {
        let currentStr = JSON.stringify(currentObj);
        if (previousStr === currentStr) break;

        previousStr = currentStr;
        currentObj = resolveReferences(currentObj, currentObj);
        loops++;
    }
    return currentObj;
}

// Flatten tokens to remove $value and $type, keeping structure
function flattenTokens(obj) {
    const result = {};
    for (const key in obj) {
        if (key === '$value' || key === '$type') continue;

        if (obj[key] && typeof obj[key] === 'object' && '$value' in obj[key]) {
             result[key] = obj[key].$value;
        } else if (typeof obj[key] === 'object') {
             result[key] = flattenTokens(obj[key]);
        } else {
             result[key] = obj[key];
        }
    }
    return result;
}

const tokensDir = path.resolve(__dirname, '../tokens');
let allTokens = {};

function readTokens(dir) {
    const files = fs.readdirSync(dir);
    // Sort to ensure hierarchy (0 -> 4)
    files.sort();

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            readTokens(fullPath);
        } else if (file.endsWith('.json')) {
            const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
            allTokens = deepMerge(allTokens, content);
        }
    });
}

console.log('Reading tokens from:', tokensDir);
readTokens(tokensDir);

console.log('Resolving references...');
// Resolve references
const resolvedTokens = recursiveResolve(allTokens);
const finalTokens = flattenTokens(resolvedTokens);

// Map to Tailwind Config
console.log('Mapping to Tailwind config...');
const tailwindConfig = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: finalTokens.color?.primary,
                accent: finalTokens.color?.accent,
                background: finalTokens.color?.background,
                // Expose base colors as well if useful, but kept minimal for now
            },
            fontFamily: finalTokens.font?.family,
            blur: finalTokens.effect?.blur,
            backdropBlur: finalTokens.effect?.blur,
            animation: {},
            keyframes: finalTokens.keyframes || {}
        }
    }
};

// Map animations (converting keys to kebab-case)
if (finalTokens.animation) {
    for (const key in finalTokens.animation) {
        if (key === 'timing' || key === 'curve') continue;
        const newKey = key.replace(/_/g, '-');
        tailwindConfig.theme.extend.animation[newKey] = finalTokens.animation[key];
    }
}

const outputContent = `window.tailwind = window.tailwind || {};
window.tailwind.config = ${JSON.stringify(tailwindConfig, null, 4)};
`;

const outputPath = path.resolve(__dirname, '../public/theme.js');
fs.writeFileSync(outputPath, outputContent);

console.log('Theme generated successfully at public/theme.js');
