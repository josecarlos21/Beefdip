const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.join(__dirname, '../tokens');
const OUTPUT_FILE = path.join(__dirname, '../public/theme.js');

// Helper to recursively read files
function readTokens(dir) {
    let tokens = {};
    if (!fs.existsSync(dir)) return tokens;

    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            const subTokens = readTokens(fullPath);
            tokens = deepMerge(tokens, subTokens);
        } else if (item.name.endsWith('.json')) {
            try {
                const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
                tokens = deepMerge(tokens, content);
            } catch (e) {
                console.error(`Error reading ${fullPath}:`, e);
            }
        }
    }
    return tokens;
}

// Deep merge helper
function deepMerge(target, source) {
    if (typeof source !== 'object' || source === null) return source;
    if (typeof target !== 'object' || target === null) target = {};

    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (source[key] instanceof Object && !Array.isArray(source[key])) {
                target[key] = deepMerge(target[key], source[key]);
            } else {
                target[key] = source[key];
            }
        }
    }
    return target;
}

// Resolve references
function resolveReferences(obj, root) {
    if (typeof obj === 'string') {
        // Check if it's an exact reference match (e.g., "{color.primary}")
        const exactMatch = /^\{([^}]+)\}$/.exec(obj);
        if (exactMatch) {
            const path = exactMatch[1];
            const value = getValueByPath(root, path);
            if (value !== undefined) {
                 // Recursively resolve the found value in case it's also a reference
                 return resolveReferences(value, root);
            }
            console.warn(`Warning: Reference ${path} not found.`);
            return obj;
        }

        // Partial match (e.g., "1px solid {color.primary}")
        const regex = /\{([^}]+)\}/g;
        if (regex.test(obj)) {
             return obj.replace(regex, (match, path) => {
                 const value = getValueByPath(root, path);
                 if (value !== undefined) {
                     if (typeof value === 'object') {
                         console.warn(`Cannot embed object value for ${path} into string.`);
                         return match;
                     }
                     // Recursively resolve if the value is a string that might be a reference
                     // (Though in partial match usually it resolves to a primitive)
                     const resolvedValue = resolveReferences(value, root);
                     return resolvedValue;
                 }
                 console.warn(`Warning: Reference ${path} not found.`);
                 return match;
             });
        }
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => resolveReferences(item, root));
    }

    if (typeof obj === 'object' && obj !== null) {
        const newObj = {};
        for (const key in obj) {
            newObj[key] = resolveReferences(obj[key], root);
        }
        return newObj;
    }

    return obj;
}

function getValueByPath(obj, path) {
    const parts = path.split('.');
    let current = obj;
    for (const part of parts) {
        if (current && current[part]) {
            current = current[part];
        } else {
            return undefined;
        }
    }
    return current['$value'];
}

// Transform to Tailwind Config
function transformToTailwind(tokens) {
    const theme = {
        extend: {
            colors: {},
            fontFamily: {},
            keyframes: {},
            animation: {},
            blur: {}
        }
    };

    // Helper to traverse and extract values
    function extractValues(obj, target, typeFilter) {
        for (const key in obj) {
            if (key === '$value') continue;
            if (key === '$type') continue;

            if (obj[key] && obj[key].$value !== undefined) {
                // It's a token
                if (!typeFilter || obj[key].$type === typeFilter) {
                    target[key] = obj[key].$value;
                }
            } else if (typeof obj[key] === 'object') {
                // It's a group
                target[key] = target[key] || {};
                extractValues(obj[key], target[key], typeFilter);
                // Clean up empty objects
                if (Object.keys(target[key]).length === 0) {
                    delete target[key];
                }
            }
        }
    }

    if (tokens.color) extractValues(tokens.color, theme.extend.colors, 'color');
    if (tokens.font && tokens.font.family) extractValues(tokens.font.family, theme.extend.fontFamily, 'fontFamily');
    if (tokens.keyframes) extractValues(tokens.keyframes, theme.extend.keyframes, 'keyframes');
    if (tokens.animation) extractValues(tokens.animation, theme.extend.animation, 'string');
    if (tokens.effect && tokens.effect.blur) extractValues(tokens.effect.blur, theme.extend.blur, 'dimension');

    return theme;
}

// Main execution
try {
    console.log('Generating theme...');
    const rawTokens = readTokens(TOKENS_DIR);
    const resolvedTokens = resolveReferences(rawTokens, rawTokens);
    const tailwindTheme = transformToTailwind(resolvedTokens);

    const outputContent = `// Auto-generated by scripts/generate-theme.cjs
window.tailwind = window.tailwind || {};
window.tailwind.config = {
    darkMode: 'class',
    theme: ${JSON.stringify(tailwindTheme, null, 4)}
};
`;

    const publicDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, outputContent);
    console.log('Theme generated successfully at', OUTPUT_FILE);
} catch (error) {
    console.error('Theme generation failed:', error);
    process.exit(1);
}
