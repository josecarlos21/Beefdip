const fs = require('fs');
const path = require('path');

// Helper to recursively read directory
function readDirRecursive(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(readDirRecursive(file));
        } else {
            if (file.endsWith('.json')) {
                results.push(file);
            }
        }
    });
    return results;
}

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

// Resolve alias references like "{colors.brand.primary}"
function resolveReferences(obj, root) {
    const regex = /\{([^}]+)\}/g;

    // Cache to prevent circular or infinite recursion in a single path
    // Although the main loop handles depths, resolveValue might recurse infinitely if regex keeps matching

    function resolveValue(value, visited = new Set()) {
        if (typeof value === 'string') {
            // Check for circular reference by tracking visited keys is hard because we pass values, not keys
            // But we can check if the value we are resolving is exactly the same as one we've seen?
            // Better: just rely on the pass-limit in the main loop, but here we need to be careful not to recurse endlessly
            // if A -> B -> A.

            if (!value.includes('{')) return value;

            return value.replace(regex, (match, path) => {
                const parts = path.split('.');
                let current = root;
                for (const part of parts) {
                    if (current && current[part]) {
                        current = current[part];
                    } else {
                        // console.warn(`Reference not found: ${path}`);
                        return match; // return original string if not found
                    }
                }

                // If the resolved target is an object with $value, we might need to resolve THAT value too
                if (current && typeof current === 'object' && current.$value !== undefined) {
                     // Check for self-reference (simple)
                     if (current.$value === value) {
                         console.error(`Circular reference detected for ${path}`);
                         return match;
                     }
                     // Recurse, but verify we aren't stuck
                     // We allow one level of recursion here, the outer loop handles the rest?
                     // Actually, if we return the raw value here, the outer loop in generateTheme calls resolveReferences multiple times.
                     // So we should just return the raw value found.
                     return current.$value;
                }

                if (typeof current === 'object') {
                    // We can't insert an object into a string.
                    console.warn(`Cannot insert object into string reference: ${path}`);
                    return match;
                }

                return current;
            });
        } else if (typeof value === 'object' && value !== null) {
             // If it's a token object with $value
            if (value.$value !== undefined) {
                 value.$value = resolveValue(value.$value);
                 return value;
            }
            // Recursive for nested objects
            for (const key in value) {
                value[key] = resolveValue(value[key]);
            }
            return value;
        }
        return value;
    }

    return resolveValue(obj);
}

// Extract values from DTCG structure for Tailwind
function transformToTailwind(tokens) {
    const result = {};

    function recurse(obj, currentResult) {
        for (const key in obj) {
            const value = obj[key];
            if (value && typeof value === 'object') {
                if (value.$value !== undefined) {
                    // It's a token
                    currentResult[key] = value.$value;
                } else {
                    // It's a group
                    currentResult[key] = {};
                    recurse(value, currentResult[key]);
                }
            } else {
                 // fallback
                 currentResult[key] = value;
            }
        }
    }
    recurse(tokens, result);
    return result;
}

function generateTheme() {
    const tokensDir = path.join(__dirname, '../tokens');
    const levels = ['0-atomic', '1-semantic', '2-component', '3-pattern', '4-contextual'];

    let allTokens = {};

    // Load tokens in order
    levels.forEach(level => {
        const levelDir = path.join(tokensDir, level);
        if (fs.existsSync(levelDir)) {
            const files = readDirRecursive(levelDir);
            files.forEach(file => {
                try {
                    const content = JSON.parse(fs.readFileSync(file, 'utf8'));
                    allTokens = deepMerge(allTokens, content);
                } catch (e) {
                    console.error(`Error reading ${file}:`, e);
                }
            });
        }
    });

    // Resolve references
    // We do a multi-pass resolution to handle nested references
    let resolvedTokens = JSON.parse(JSON.stringify(allTokens));
    let previousString = "";

    for (let i = 0; i < 5; i++) { // Max depth 5
        resolvedTokens = resolveReferences(resolvedTokens, resolvedTokens);
        const currentString = JSON.stringify(resolvedTokens);
        if (currentString === previousString) break; // Converged
        previousString = currentString;
    }

    // Map to Tailwind Theme Configuration
    const tailwindTheme = {
        extend: {}
    };

    const simpleMap = {
        'color': 'colors',
        'fontFamily': 'fontFamily',
        'fontSize': 'fontSize',
        'fontWeight': 'fontWeight',
        'letterSpacing': 'letterSpacing',
        'lineHeight': 'lineHeight',
        'spacing': 'spacing',
        'borderRadius': 'borderRadius',
        'boxShadow': 'boxShadow',
        'opacity': 'opacity',
        'zIndex': 'zIndex',
        'transitionProperty': 'transitionProperty',
        'transitionDuration': 'transitionDuration',
        'transitionTimingFunction': 'transitionTimingFunction',
        'keyframes': 'keyframes',
        'animation': 'animation',
        'blur': 'backdropBlur',
    };

    const transformed = transformToTailwind(resolvedTokens);

    for (const [tokenKey, themeKey] of Object.entries(simpleMap)) {
        if (transformed[tokenKey]) {
            tailwindTheme.extend[themeKey] = transformed[tokenKey];
            if (tokenKey === 'blur') {
                 tailwindTheme.extend['blur'] = transformed[tokenKey];
            }
        }
    }

    // Write output
    const outputPath = path.join(__dirname, '../public/theme.js');
    const outputContent = `window.tailwindConfig = {
    theme: ${JSON.stringify(tailwindTheme, null, 2)}
};`;

    if (!fs.existsSync(path.join(__dirname, '../public'))) {
        fs.mkdirSync(path.join(__dirname, '../public'));
    }

    fs.writeFileSync(outputPath, outputContent);
    console.log('Theme generated at public/theme.js');
}

generateTheme();
