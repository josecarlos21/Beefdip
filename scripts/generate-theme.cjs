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

// Helper to read all JSON files recursively
function readTokens(dir) {
    let tokens = {};
    if (!fs.existsSync(dir)) return tokens;

    const items = fs.readdirSync(dir);

    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            tokens = deepMerge(tokens, readTokens(fullPath));
        } else if (item.endsWith('.json')) {
            try {
                const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
                tokens = deepMerge(tokens, content);
            } catch (e) {
                console.error(`Error reading ${fullPath}:`, e);
            }
        }
    });

    return tokens;
}

// Helper to resolve references like {color.base.orange.500}
function resolveReferences(tokens, root = tokens) {
    const regex = /\{([^}]+)\}/g;

    function resolve(value) {
        if (typeof value === 'string') {
            return value.replace(regex, (match, pathStr) => {
                const keys = pathStr.split('.');
                let current = root;
                for (const key of keys) {
                    if (current && current[key]) {
                        current = current[key];
                    } else {
                        console.warn(`Reference not found: ${pathStr}`);
                        return match;
                    }
                }
                // If the resolved target has a $value, use it. Otherwise use the object itself (unlikely for simple refs)
                if (current && current.$value !== undefined) {
                    // Recursively resolve the found value in case it's also a reference
                    return resolve(current.$value);
                }
                return match;
            });
        }
        if (typeof value === 'object' && value !== null) {
            for (const key in value) {
                value[key] = resolve(value[key]);
            }
        }
        return value;
    }

    // Iterate over the whole tree to resolve values
    // We do a deep copy or in-place? In-place is fine for this script.
    // But we need to handle the structure.

    // Actually, it's safer to traverse and resolve only $value fields first.
    function traverseAndResolve(node) {
        if (typeof node !== 'object' || node === null) return;

        if (node.$value !== undefined) {
             node.$value = resolve(node.$value);
        }

        for (const key in node) {
            if (key !== '$value' && key !== '$type') {
                traverseAndResolve(node[key]);
            }
        }
    }

    traverseAndResolve(tokens);
    return tokens;
}

// Helper to flatten/transform to Tailwind config format
// Removing $value and $type, and mapping keys.
function transformToTailwind(tokens) {
    const tailwindConfig = {
        colors: {},
        animation: {},
        keyframes: {},
        blur: {},
        backdropBlur: {}
    };

    function processLayer(node, path = []) {
        if (typeof node !== 'object' || node === null) return;

        if (node.$value !== undefined) {
            // It's a token
            const value = node.$value;
            const type = node.$type; // optional usage

            // Map based on path or type
            // Path example: ['color', 'base', 'orange', '500']

            if (path[0] === 'color') {
                // Tailwind colors structure: colors: { base: { orange: { 500: ... } } }
                setPath(tailwindConfig.colors, path.slice(1), value);
            } else if (path[0] === 'keyframes') {
                 setPath(tailwindConfig.keyframes, path.slice(1), value);
            } else if (path[0] === 'animation') {
                 setPath(tailwindConfig.animation, path.slice(1), value);
            } else if (path[0] === 'effect' && path[1] === 'blur') {
                 // Map to blur and backdropBlur
                 setPath(tailwindConfig.blur, path.slice(2), value);
                 setPath(tailwindConfig.backdropBlur, path.slice(2), value);
            }
            return;
        }

        for (const key in node) {
            processLayer(node[key], [...path, key]);
        }
    }

    function setPath(obj, keys, value) {
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

    processLayer(tokens);
    return tailwindConfig;
}

// Main execution
console.log('Generating theme...');
let tokens = readTokens(TOKENS_DIR);
tokens = resolveReferences(tokens);
const tailwindTheme = transformToTailwind(tokens);

const outputContent = `
// Generated by scripts/generate-theme.cjs
window.tailwind = window.tailwind || {};
window.tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: ${JSON.stringify(tailwindTheme.colors, null, 4)},
            animation: ${JSON.stringify(tailwindTheme.animation, null, 4)},
            keyframes: ${JSON.stringify(tailwindTheme.keyframes, null, 4)},
            blur: ${JSON.stringify(tailwindTheme.blur, null, 4)},
            backdropBlur: ${JSON.stringify(tailwindTheme.backdropBlur, null, 4)}
        }
    }
};
console.log('Tailwind Theme Loaded', window.tailwind.config);
`;

fs.writeFileSync(OUTPUT_FILE, outputContent);
console.log(`Theme generated at ${OUTPUT_FILE}`);
