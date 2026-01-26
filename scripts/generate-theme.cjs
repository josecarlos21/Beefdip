const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.resolve(__dirname, '../tokens');
const OUTPUT_FILE = path.resolve(__dirname, '../public/theme.js');

function loadTokens(dir) {
    let tokens = {};
    if (!fs.existsSync(dir)) return tokens;

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            const subTokens = loadTokens(fullPath);
            deepMerge(tokens, subTokens);
        } else if (entry.name.endsWith('.json')) {
            const fileContent = fs.readFileSync(fullPath, 'utf-8');
            try {
                const json = JSON.parse(fileContent);
                deepMerge(tokens, json);
            } catch (e) {
                console.error(`Error parsing ${fullPath}:`, e);
            }
        }
    }
    return tokens;
}

function deepMerge(target, source) {
    for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            if (!target[key]) Object.assign(target, { [key]: {} });
            deepMerge(target[key], source[key]);
        } else {
            Object.assign(target, { [key]: source[key] });
        }
    }
    return target;
}

function resolveReferences(obj, root) {
    if (typeof obj === 'string') {
        if (obj.startsWith('{') && obj.endsWith('}')) {
            const refPath = obj.slice(1, -1).split('.');
            let current = root;
            for (const key of refPath) {
                if (current && current[key]) {
                    current = current[key];
                } else {
                    console.warn(`Reference not found: ${obj}`);
                    return obj;
                }
            }
            // If the resolved reference is a token object, return its value
            // We need to recursively resolve if the resolved value is also a reference (though simpler to resolve fully first)
            // For now assume single level of value object
            if (current && current.$value !== undefined) {
                 // Check if the value itself is a reference (recursion)
                 return resolveReferences(current.$value, root);
            }
            return current;
        }
        return obj;
    } else if (Array.isArray(obj)) {
        return obj.map(item => resolveReferences(item, root));
    } else if (typeof obj === 'object' && obj !== null) {
        const newObj = {};
        for (const key in obj) {
            newObj[key] = resolveReferences(obj[key], root);
        }
        return newObj;
    }
    return obj;
}

function flattenTokens(tokens) {
    // Transform from { key: { $value: "..." } } to { key: "..." }
    // Recursively
    if (tokens.$value !== undefined) {
        return tokens.$value;
    }

    const result = {};
    for (const key in tokens) {
        if (key === '$type') continue;
        result[key] = flattenTokens(tokens[key]);
    }
    return result;
}

function mapToTailwind(tokens) {
    const config = {
        darkMode: 'class',
        theme: {
            extend: {
                colors: {},
                keyframes: {},
                animation: {},
                blur: {},
                backdropBlur: {} // Map blurs here too
            }
        }
    };

    const flat = flattenTokens(tokens);

    // Map Colors
    if (flat.color) {
        config.theme.extend.colors = flat.color;
    }

    // Map Keyframes
    if (flat.keyframes) {
        config.theme.extend.keyframes = flat.keyframes;
    }

    // Map Animations
    if (flat.animation) {
        config.theme.extend.animation = flat.animation;
    }

    // Map Blur (from effects.blur)
    if (flat.blur) {
        config.theme.extend.blur = flat.blur;
        config.theme.extend.backdropBlur = flat.blur;
    }

    return config;
}

function generate() {
    console.log('Generating theme...');
    const rawTokens = loadTokens(TOKENS_DIR);

    // We need to resolve references.
    // Since references point to the structure, we can verify this.
    // However, resolveReferences expects the FULL tree to look up paths.
    // references are like {color.base.orange.400}

    // We first resolve references on the raw structure (which still has $value)
    // But wait, the value of a token is inside $value.
    // So when we lookup color.base.orange.400, we get { $value: "...", $type: "..." }
    // We want the value.

    const resolvedTokens = resolveReferences(rawTokens, rawTokens);

    const tailwindConfig = mapToTailwind(resolvedTokens);

    const outputContent = `window.tailwind = window.tailwind || {};
window.tailwind.config = ${JSON.stringify(tailwindConfig, null, 4)};
`;

    fs.writeFileSync(OUTPUT_FILE, outputContent);
    console.log(`Theme generated at ${OUTPUT_FILE}`);
}

generate();
