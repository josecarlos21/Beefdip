const fs = require('fs');
const path = require('path');

// Helper to deeply merge objects
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

// Helper to flatten token object to a single map for resolution
// Stores { "path.to.token": "value" }
function flattenTokens(obj, prefix = '', res = {}) {
  for (const key in obj) {
    if (key === '$value') {
      res[prefix.slice(0, -1)] = obj[key];
    } else if (key !== '$type' && typeof obj[key] === 'object') {
      flattenTokens(obj[key], prefix + key + '.', res);
    }
  }
  return res;
}

// Helper to get type map
// Stores { "path.to.token": "type" }
function getTypeMap(obj, prefix = '', res = {}) {
    for (const key in obj) {
      if (key === '$type') {
        res[prefix.slice(0, -1)] = obj[key];
      } else if (key !== '$value' && typeof obj[key] === 'object') {
        getTypeMap(obj[key], prefix + key + '.', res);
      }
    }
    return res;
}

// Helper to resolve references
function resolveReferences(value, tokenMap) {
  if (typeof value !== 'string') return value;

  const regex = /\{([^}]+)\}/g;

  if (!regex.test(value)) return value;

  return value.replace(regex, (match, tokenPath) => {
    const resolved = tokenMap[tokenPath];
    if (resolved === undefined) {
      console.warn(`Warning: Could not resolve token reference: ${tokenPath}`);
      return match;
    }
    return resolveReferences(resolved, tokenMap);
  });
}

function setNested(obj, path, value) {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (i === keys.length - 1) {
            current[key] = value;
        } else {
            current[key] = current[key] || {};
            current = current[key];
        }
    }
}

function generateTheme() {
    const tokensDir = path.resolve(__dirname, '../tokens');
    const allTokens = {};

    function readDir(dir) {
        if (!fs.existsSync(dir)) return;
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                readDir(fullPath);
            } else if (file.endsWith('.json')) {
                const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
                deepMerge(allTokens, content);
            }
        });
    }

    readDir(tokensDir);

    const flatValues = flattenTokens(allTokens);
    const flatTypes = getTypeMap(allTokens);
    const resolvedValues = {};

    // Resolve all values
    for (const [key, value] of Object.entries(flatValues)) {
        resolvedValues[key] = resolveReferences(value, flatValues);
    }

    // Map to Tailwind Config
    const tailwindTheme = {
        extend: {
            colors: {},
            fontFamily: {},
            animation: {},
            keyframes: {},
            backdropBlur: {},
            borderColor: {}
        }
    };

    for (const [key, value] of Object.entries(resolvedValues)) {
        const type = flatTypes[key];

        // Strategy: Use type if available, otherwise fallback to path heuristics
        // But for structure like 'colors', we want to recreate the nesting?
        // e.g. color.primary -> colors.primary
        // color.base.orange.400 -> colors.base.orange.400 (or just colors.orange.400?)

        // Let's rely on path prefixes as they map to our token structure

        if (key.startsWith('color.')) {
            // Remove 'color.' prefix
            const subPath = key.substring(6);
            // Add to colors
            setNested(tailwindTheme.extend.colors, subPath, value);
        } else if (key.startsWith('font.family.')) {
            const subPath = key.substring(12);
            setNested(tailwindTheme.extend.fontFamily, subPath, value.split(',').map(s => s.trim()));
        } else if (key.startsWith('motion.animation.')) {
            const subPath = key.substring(17);
            setNested(tailwindTheme.extend.animation, subPath, value);
        } else if (key.startsWith('motion.keyframes.')) {
            const subPath = key.substring(17);
            setNested(tailwindTheme.extend.keyframes, subPath, value);
        } else if (key.startsWith('effect.glass.')) {
             // specific mapping for glass effect colors
             const subPath = key.substring(13); // base, light
             setNested(tailwindTheme.extend.colors, `glass-${subPath}`, value);
             // Also map just 'glass' if it's base?
             if (subPath === 'base') {
                 setNested(tailwindTheme.extend.colors, 'glass', value);
             }
        } else if (key.startsWith('effect.blur.')) {
            const subPath = key.substring(12);
            setNested(tailwindTheme.extend.backdropBlur, subPath, value);
        }
    }

    const outputContent = `
// Generated by scripts/generate-theme.cjs
window.tailwindConfig = {
    darkMode: 'class',
    theme: ${JSON.stringify(tailwindTheme, null, 4)}
};
`;

    const outputPath = path.resolve(__dirname, '../public/theme.js');
    if (!fs.existsSync(path.dirname(outputPath))){
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    }
    fs.writeFileSync(outputPath, outputContent);
    console.log(`Theme generated at ${outputPath}`);
}

generateTheme();
