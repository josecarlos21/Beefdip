const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.resolve(__dirname, '../tokens');
const OUTPUT_FILE = path.resolve(__dirname, '../public/theme.js');

// Deep merge helper
function deepMerge(target, source) {
    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object && key in target) {
            Object.assign(source[key], deepMerge(target[key], source[key]));
        }
    }
    Object.assign(target || {}, source);
    return target;
}

// Recursive file reader
function readTokens(dir) {
    let tokens = {};
    if (!fs.existsSync(dir)) return tokens;

    const files = fs.readdirSync(dir);

    // Ensure order: 0-atomic, 1-semantic, etc.
    files.sort((a, b) => a.localeCompare(b));

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            tokens = deepMerge(tokens, readTokens(fullPath));
        } else if (file.endsWith('.json')) {
            try {
                const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
                tokens = deepMerge(tokens, content);
            } catch (e) {
                console.error(`Error parsing ${fullPath}:`, e);
            }
        }
    }
    return tokens;
}

// Resolve a single value (handling references)
function resolveRef(value, rootTokens) {
    if (typeof value !== 'string') return value;

    const regex = /\{([^}]+)\}/g;
    if (!regex.test(value)) return value;

    return value.replace(regex, (match, pathStr) => {
        const parts = pathStr.split('.');
        let current = rootTokens;
        for (const part of parts) {
            current = current && current[part];
        }

        if (current && current.$value !== undefined) {
            // Recursively resolve the referenced value
            return resolveRef(current.$value, rootTokens);
        } else if (current && typeof current === 'string' || typeof current === 'number') {
             // Case where intermediate node might be the value (unlikely in DTCG but possible if sloppy)
             return current;
        }

        console.warn(`Warning: Could not resolve reference "${match}"`);
        return match;
    });
}

// Recursively resolve all tokens and strip metadata
function resolveAll(node, rootTokens) {
    if (typeof node !== 'object' || node === null) return node;

    // If it's a token (has $value), resolve it
    if (node.$value !== undefined) {
        return resolveRef(node.$value, rootTokens);
    }

    const resolved = {};
    for (const key in node) {
        if (key === '$type') continue;
        resolved[key] = resolveAll(node[key], rootTokens);
    }
    return resolved;
}

// Main execution
try {
    console.log('Generating theme...');
    const rawTokens = readTokens(TOKENS_DIR);
    const resolvedTokens = resolveAll(rawTokens, rawTokens);

    const tailwindConfig = {
        darkMode: 'class',
        theme: {
            extend: {
                colors: resolvedTokens.color || {},
                fontFamily: resolvedTokens.fontFamily || {},
                blur: resolvedTokens.blur || {},
                backdropBlur: {
                    ...(resolvedTokens.blur || {}), // Include atomic blurs in backdropBlur by default if desired, or just use mapped ones
                    ...(resolvedTokens.backdropBlur || {})
                },
                keyframes: resolvedTokens.keyframes || {},
                animation: resolvedTokens.animation || {},
                // Map component tokens if useful, though mostly for documentation or specific plugins
                // We'll skip adding 'component' to theme.extend as it might not match Tailwind schema
            }
        }
    };

    const outputContent = `// Auto-generated from Design Tokens
window.tailwind = window.tailwind || {};
window.tailwind.config = ${JSON.stringify(tailwindConfig, null, 4)};
`;

    // Ensure public dir exists
    const publicDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, outputContent);
    console.log(`Theme generated successfully at ${OUTPUT_FILE}`);

} catch (err) {
    console.error('Error generating theme:', err);
    process.exit(1);
}
