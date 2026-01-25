const fs = require('fs');
const path = require('path');

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

// Helper to resolve references like {color.base.orange.400}
function resolveReferences(obj, root) {
    const regex = /\{([^}]+)\}/g;

    function resolveValue(value) {
        if (typeof value !== 'string') return value;

        return value.replace(regex, (match, pathStr) => {
            const keys = pathStr.split('.');
            let current = root;
            for (const key of keys) {
                if (current && current[key]) {
                    current = current[key];
                } else {
                    console.warn(`Warning: Reference not found: ${pathStr}`);
                    return match;
                }
            }
            // If the resolved target has a $value, use that.
            if (current && current.$value !== undefined) {
                // Recursively resolve the found value in case it is also a reference
                return resolveValue(current.$value);
            }
            return current;
        });
    }

    function traverse(currentObj) {
        for (const key in currentObj) {
            if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
                if (currentObj[key].$value !== undefined) {
                    currentObj[key].$value = resolveValue(currentObj[key].$value);
                } else {
                    traverse(currentObj[key]);
                }
            }
        }
    }

    traverse(obj);
    return obj;
}

// Helper to transform DTCG structure to Tailwind config
function transformToTailwind(tokens) {
    const theme = {
        colors: {},
        fontFamily: {},
        spacing: {},
        borderRadius: {},
        blur: {},
        backdropBlur: {},
        keyframes: {},
        animation: {}
    };

    function processToken(obj, category, target) {
        for (const key in obj) {
            if (obj[key].$value !== undefined) {
                const value = obj[key].$value;
                // If it's a deep object (like nested colors), we might need to handle it.
                // But for now, we assume simple mapping.
                target[key] = value;
            } else if (typeof obj[key] === 'object') {
                target[key] = {};
                processToken(obj[key], category, target[key]);
            }
        }
    }

    // Specific Mappings
    if (tokens.color) {
        // We want to flatten "base" out if possible or just keep structure
        // Tailwind allows nested colors.
        // We need to strip the "$value" wrapper.
        function stripValue(obj) {
            const result = {};
            for (const key in obj) {
                if (obj[key].$value !== undefined) {
                    result[key] = obj[key].$value;
                } else {
                    result[key] = stripValue(obj[key]);
                }
            }
            return result;
        }
        theme.colors = stripValue(tokens.color);
    }

    if (tokens.font && tokens.font.family) {
         const stripped = {};
         function strip(obj) {
             for(const k in obj) {
                 if(obj[k].$value) stripped[k] = obj[k].$value;
             }
         }
         strip(tokens.font.family);
         theme.fontFamily = stripped;
    }

    if (tokens.size && tokens.size.spacing) {
        const stripped = {};
        for(const k in tokens.size.spacing) {
            if(tokens.size.spacing[k].$value) stripped[k] = tokens.size.spacing[k].$value;
        }
        theme.spacing = stripped;
    }

    if (tokens.radius) {
        const stripped = {};
        for(const k in tokens.radius) {
            if(tokens.radius[k].$value) stripped[k] = tokens.radius[k].$value;
        }
        theme.borderRadius = stripped;
    }

    if (tokens.effect && tokens.effect.blur) {
        const stripped = {};
        for(const k in tokens.effect.blur) {
            if(tokens.effect.blur[k].$value) stripped[k] = tokens.effect.blur[k].$value;
        }
        theme.blur = stripped;
        theme.backdropBlur = stripped;
    }

    if (tokens.animation) {
        if (tokens.animation.keyframes) {
             const stripped = {};
             for(const k in tokens.animation.keyframes) {
                 if(tokens.animation.keyframes[k].$value) stripped[k] = tokens.animation.keyframes[k].$value;
             }
             theme.keyframes = stripped;
        }

        // Semantic animations or direct animations
        // In my structure, I put them directly in `animation` key in semantic step (which I just wrote)
        // Check for direct string values in animation object
         const strippedAnim = {};
         // Recursive check for non-keyframes/non-duration
         function extractAnimations(obj) {
             for(const k in obj) {
                 if (k === 'keyframes' || k === 'duration' || k === 'ease') continue;
                 if (obj[k].$value) {
                     strippedAnim[k] = obj[k].$value;
                 }
             }
         }
         extractAnimations(tokens.animation);
         theme.animation = strippedAnim;
    }

    return theme;
}

const tokensDir = path.join(__dirname, '../tokens');
const levels = ['0-atomic', '1-semantic', '2-component', '3-pattern', '4-contextual'];

let allTokens = {};

levels.forEach(level => {
    const levelDir = path.join(tokensDir, level);
    if (fs.existsSync(levelDir)) {
        const files = fs.readdirSync(levelDir);
        files.forEach(file => {
            if (file.endsWith('.json')) {
                const content = JSON.parse(fs.readFileSync(path.join(levelDir, file), 'utf8'));
                deepMerge(allTokens, content);
            }
        });
    }
});

// Resolve references
resolveReferences(allTokens, allTokens);

// Transform
const tailwindTheme = transformToTailwind(allTokens);

// Output
const outputContent = `
window.tailwind = window.tailwind || {};
window.tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: ${JSON.stringify(tailwindTheme, null, 4)}
    }
};
`;

const outputPath = path.join(__dirname, '../public/theme.js');
fs.writeFileSync(outputPath, outputContent);

console.log(`Theme generated at ${outputPath}`);
