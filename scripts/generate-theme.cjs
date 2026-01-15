const fs = require('fs');
const path = require('path');

// Helper to deep merge objects
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

// Helper to read all JSON files recursively
function readTokens(dir) {
  let tokens = {};
  const files = fs.readdirSync(dir);

  // Sort files/dirs to ensure consistent order (e.g. 0-atomic before 1-semantic)
  files.sort();

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      tokens = deepMerge(tokens, readTokens(fullPath));
    } else if (file.endsWith('.json')) {
      const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      tokens = deepMerge(tokens, content);
    }
  }
  return tokens;
}

// Helper to resolve references like {color.primary.400}
function resolveReferences(tokens, rootTokens) {
  const resolved = {};

  for (const key in tokens) {
    const value = tokens[key];
    if (typeof value === 'object' && value !== null) {
        if ('$value' in value) {
            // It's a token
            let val = value.$value;
            if (typeof val === 'string' && val.startsWith('{') && val.endsWith('}')) {
                const refPath = val.slice(1, -1).split('.');
                let current = rootTokens;
                for (const p of refPath) {
                    current = current[p];
                    if (!current) break;
                }
                if (current && current.$value) {
                    resolved[key] = current.$value;
                    // Verify if the resolved value is itself a reference (simple 1-level for now, recursive if needed)
                    if (typeof resolved[key] === 'string' && resolved[key].startsWith('{')) {
                         // naive 2nd pass or recursive needed for deep chains.
                         // For now let's assume 1 level or handle simply.
                         // To do it properly, we should resolve *everything* first then map.
                    }
                } else {
                    console.warn(`Could not resolve reference: ${val}`);
                    resolved[key] = val;
                }
            } else {
                resolved[key] = val;
            }
        } else {
            // It's a group
            resolved[key] = resolveReferences(value, rootTokens);
        }
    } else {
        resolved[key] = value;
    }
  }
  return resolved;
}

// Better resolver: flatten everything first or resolve on demand.
// Let's rewrite resolveReferences to be more robust for the full tree.
function resolveTokenValue(val, root) {
    if (typeof val !== 'string' || !val.startsWith('{') || !val.endsWith('}')) {
        return val;
    }
    const refPath = val.slice(1, -1).split('.');
    let current = root;
    for (const p of refPath) {
        current = current[p];
        if (!current) return val; // Failed to resolve
    }
    if (current.$value) {
        return resolveTokenValue(current.$value, root); // Recursive resolution
    }
    return val;
}

function resolveAll(node, root) {
    const res = {};
    for (const key in node) {
        if (key.startsWith('$')) continue; // Skip metadata keys if mixed in
        if (node[key] && typeof node[key] === 'object' && '$value' in node[key]) {
            res[key] = resolveTokenValue(node[key].$value, root);
        } else if (typeof node[key] === 'object') {
            res[key] = resolveAll(node[key], root);
        } else {
            res[key] = node[key];
        }
    }
    return res;
}


// Mapper to Tailwind Config
function mapToTailwind(resolvedTokens) {
    const theme = {
        extend: {
            colors: {},
            fontFamily: {},
            animation: {},
            keyframes: {}
        }
    };

    // 1. Colors
    // Flatten color structure? Tailwind expects { colors: { primary: { 400: '...' } } }
    // Our structure: { color: { primary: { 400: "..." } } } -> resolved: { color: { primary: { 400: "#..." } } }
    if (resolvedTokens.color) {
        theme.extend.colors = resolvedTokens.color;
        // Merge semantic colors if they exist
        if (resolvedTokens.semantic && resolvedTokens.semantic.color) {
             deepMerge(theme.extend.colors, resolvedTokens.semantic.color);
        }
    }

    // 2. Typography
    if (resolvedTokens.font && resolvedTokens.font.family) {
        theme.extend.fontFamily = resolvedTokens.font.family;
    }

    // 3. Animations & Keyframes
    if (resolvedTokens.animation) {
        theme.extend.animation = resolvedTokens.animation;
    }
    if (resolvedTokens.keyframes) {
        theme.extend.keyframes = resolvedTokens.keyframes;
    }

    return theme;
}

const tokensDir = path.join(__dirname, '../tokens');
const allTokens = readTokens(tokensDir);
const resolved = resolveAll(allTokens, allTokens);
const tailwindTheme = mapToTailwind(resolved);

const output = `
// Generated by scripts/generate-theme.cjs
window.tailwindConfig = {
  darkMode: 'class',
  theme: ${JSON.stringify(tailwindTheme, null, 2)}
};
`;

fs.writeFileSync(path.join(__dirname, '../public/theme.js'), output);
console.log('Theme generated at public/theme.js');
