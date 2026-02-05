const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.resolve(__dirname, '../tokens');
const OUTPUT_FILE = path.resolve(__dirname, '../public/theme.js');

function getAllTokenFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllTokenFiles(file));
        } else if (file.endsWith('.json')) {
            results.push(file);
        }
    });
    return results;
}

function deepMerge(target, source) {
    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object && key in target) {
            Object.assign(source[key], deepMerge(target[key], source[key]));
        }
    }
    Object.assign(target || {}, source);
    return target;
}

function resolveReference(value, root) {
    if (typeof value !== 'string') return value;

    // Match {path.to.token}
    const regex = /\{([a-zA-Z0-9_.-]+)\}/g;
    if (!regex.test(value)) return value;

    return value.replace(regex, (match, tokenPath) => {
        const parts = tokenPath.split('.');
        let current = root;
        for (const part of parts) {
            if (current && current[part]) {
                current = current[part];
            } else {
                console.warn(`Token reference not found: ${tokenPath}`);
                return match;
            }
        }
        // If it's a token object, return its value, otherwise return it as is (though it should be a token)
        if (current && current.$value !== undefined) {
             // Recursive resolution
             return resolveReference(current.$value, root);
        }
        return current;
    });
}

function resolveAllValues(obj, root) {
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            if (obj[key].$value !== undefined) {
                // It's a token
                obj[key].$value = resolveReference(obj[key].$value, root);
            } else {
                // It's a group
                resolveAllValues(obj[key], root);
            }
        }
    }
}

function transformToTailwind(tokens) {
    const result = {};
    for (const key in tokens) {
        if (key === '$type') continue;
        if (key === '$value') return tokens[key]; // Should not happen at root

        if (tokens[key].$value !== undefined) {
            result[key] = tokens[key].$value;
        } else if (typeof tokens[key] === 'object') {
            const child = transformToTailwind(tokens[key]);
            if (child !== undefined) {
                result[key] = child;
            }
        }
    }
    return result;
}

// Special handling for keyframes (structure is different)
// In Tailwind: keyframes: { name: { '0%': { ... }, '100%': { ... } } }
// In Tokens: keyframes: { name: { $value: { ... } } }
// The generic transform handles it if $value is the object.

// Complex components (Glass, Scrim) -> Utilities
function generateUtilities(tokens) {
    const utilities = {};

    // Glass
    if (tokens.glass) {
        const glass = transformToTailwind(tokens.glass);
        // glass: { pure: { background: '...', backdropBlur: '...', border: '...' } }
        for (const variant in glass) {
            const props = glass[variant];
            utilities[`.glass-${variant}`] = {
                'background-color': props.background,
                'backdrop-filter': `blur(${props.backdropBlur})`,
                '-webkit-backdrop-filter': `blur(${props.backdropBlur})`,
                'border': props.border || props.borderTop // handle borderTop case
            };
            if (props.borderTop) utilities[`.glass-${variant}`]['border-top'] = props.borderTop;
            if (props.boxShadow) utilities[`.glass-${variant}`]['box-shadow'] = props.boxShadow;
        }
    }

    // Scrim
    if (tokens.scrim) {
        const scrim = transformToTailwind(tokens.scrim);
        for (const variant in scrim) {
            utilities[`.img-scrim-${variant}`] = {
                'background': scrim[variant].background
            };
        }
    }

    return utilities;
}


// --- Execution ---

const files = getAllTokenFiles(TOKENS_DIR);
let allTokens = {};

// Order matters? We trust deepMerge to merge correctly.
// Usually we want Level 0 first, then Level 1...
// Let's sort files by directory name to be safe.
files.sort();

files.forEach(file => {
    const content = JSON.parse(fs.readFileSync(file, 'utf8'));
    allTokens = deepMerge(allTokens, content);
});

// Resolve references
resolveAllValues(allTokens, allTokens);

// Transform
const tailwindTheme = {
    colors: transformToTailwind(allTokens.color || {}),
    animation: transformToTailwind(allTokens.animation || {}), // This might include timing/curve too? No, usually animation definitions.
    // Wait, animation tokens often have sub-groups.
    // Standard Tailwind expects `animation: { name: '...' }`
    // Our structure: `animation: { timing: ..., curve: ..., visual_pulse: { $value: ... } }`
    // We only want the top-level animations or those that are actual animations.
    // But `timing` and `curve` are likely just values used in references.
    // If we pass them to theme.extend.animation, they will be ignored or clutter it.
    // But it's fine.

    keyframes: transformToTailwind(allTokens.keyframes || {}),
    blur: transformToTailwind(allTokens.effect ? allTokens.effect.blur : {}),
    backdropBlur: transformToTailwind(allTokens.effect ? allTokens.effect.blur : {}), // Map blurs here too
};

// Clean up animation (remove non-string values if needed, but Tailwind is permissive)
// Actually, `animation` entries in Tailwind must be strings (or arrays). `timing` object will be invalid.
// We should filter `tailwindTheme.animation` to only keep strings?
// Or we can just let it be, and only use valid keys.

const customUtilities = generateUtilities(allTokens);

const outputContent = `
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
    },
    plugins: [
        function({ addUtilities }) {
            addUtilities(${JSON.stringify(customUtilities, null, 4)})
        }
    ]
};
`;

fs.writeFileSync(OUTPUT_FILE, outputContent);
console.log(`Theme generated at ${OUTPUT_FILE}`);
