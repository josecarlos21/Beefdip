const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.join(__dirname, '../tokens');
const OUTPUT_FILE = path.join(__dirname, '../public/theme.js');

// Helper to get all files recursively
function getFiles(dir) {
    const subdirs = fs.readdirSync(dir);
    const files = subdirs.map((subdir) => {
        const res = path.resolve(dir, subdir);
        return fs.statSync(res).isDirectory() ? getFiles(res) : res;
    });
    return files.reduce((a, f) => a.concat(f), []);
}

// Deep merge objects
function deepMerge(target, source) {
    for (const key in source) {
        if (source[key] instanceof Object && key in target) {
            Object.assign(source[key], deepMerge(target[key], source[key]));
        }
    }
    Object.assign(target || {}, source);
    return target;
}

// Resolve dot notation path in object
function get(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

// Resolve references like {color.base.orange.500}
function resolveReferences(obj, root) {
    if (typeof obj === 'string') {
        if (obj.startsWith('{') && obj.endsWith('}')) {
            const refPath = obj.slice(1, -1);
            const refValue = get(root, refPath);
            if (refValue && refValue.$value) {
                // If the reference points to another token, resolve that first (if needed)
                // But for simplicity, let's assume one level or recursive call
                return resolveReferences(refValue.$value, root);
            }
             if (refValue) {
                return resolveReferences(refValue, root);
            }
            console.warn(`Could not resolve reference: ${obj}`);
            return obj;
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

// Flatten and extract values (remove $value, $type)
function extractValues(obj) {
    if (obj.hasOwnProperty('$value')) {
        return obj.$value;
    }

    // Special handling for keyframes which might have nested objects that look like tokens but aren't exactly
    // Or if the value itself is an object (like keyframes definitions)

    const newObj = {};
    let hasChildren = false;
    for (const key in obj) {
        if (key !== '$type' && key !== '$description') {
            newObj[key] = extractValues(obj[key]);
            hasChildren = true;
        }
    }
    return hasChildren ? newObj : obj;
}

// Main execution
try {
    const files = getFiles(TOKENS_DIR).filter(f => f.endsWith('.json'));
    let allTokens = {};

    files.forEach(file => {
        const content = JSON.parse(fs.readFileSync(file, 'utf8'));
        deepMerge(allTokens, content);
    });

    // Resolve references
    // We do this repeatedly until no more changes or limit reached to handle chains
    let resolvedTokens = JSON.parse(JSON.stringify(allTokens));
    for (let i = 0; i < 5; i++) {
        resolvedTokens = resolveReferences(resolvedTokens, resolvedTokens);
    }

    // Extract raw values
    const rawValues = extractValues(resolvedTokens);

    // Map to Tailwind Theme Structure
    // We assume top-level keys in tokens match Tailwind theme keys or need mapping
    const tailwindTheme = {
        extend: {}
    };

    // Mappings
    if (rawValues.color) tailwindTheme.extend.colors = rawValues.color;
    if (rawValues.fontFamily) tailwindTheme.extend.fontFamily = rawValues.fontFamily;
    if (rawValues.spacing) tailwindTheme.extend.spacing = rawValues.spacing;
    if (rawValues.animation) tailwindTheme.extend.animation = rawValues.animation;
    if (rawValues.keyframes) tailwindTheme.extend.keyframes = rawValues.keyframes;
    if (rawValues.blur) tailwindTheme.extend.blur = rawValues.blur;
    if (rawValues.backdropBlur) tailwindTheme.extend.backdropBlur = rawValues.backdropBlur;

    // Add other mappings as needed

    const outputContent = `
/**
 * Generated Theme file. Do not edit directly.
 * Generated from /tokens
 */
window.tailwind = window.tailwind || {};
window.tailwind.config = {
    darkMode: 'class',
    theme: ${JSON.stringify(tailwindTheme, null, 4)}
};
`;

    fs.writeFileSync(OUTPUT_FILE, outputContent);
    console.log(`Theme generated at ${OUTPUT_FILE}`);

} catch (error) {
    console.error('Error generating theme:', error);
    process.exit(1);
}
