const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.join(__dirname, '../tokens');
const OUTPUT_FILE = path.join(__dirname, '../public/theme.js');

function getJsonFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getJsonFiles(file));
        } else if (file.endsWith('.json')) {
            results.push(file);
        }
    });
    return results;
}

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function deepMerge(target, source) {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target))
          Object.assign(output, { [key]: source[key] });
        else
          output[key] = deepMerge(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function resolveReferences(obj, root) {
    const regex = /\{([^}]+)\}/g;

    function resolve(value) {
        if (typeof value === 'string') {
            // Check if it looks like a reference
            if (!value.includes('{')) return value;

            return value.replace(regex, (match, path) => {
                const parts = path.split('.');
                let current = root;
                for (const part of parts) {
                    current = current?.[part];
                }
                if (current && current.$value !== undefined) {
                    return resolve(current.$value);
                }
                if (typeof current === 'string' || typeof current === 'number') {
                    return current;
                }
                return match;
            });
        }
        return value;
    }

    function traverse(node) {
        if (isObject(node)) {
            if (node.$value !== undefined) {
                node.$value = resolve(node.$value);
            }
            for (const key in node) {
                if (key !== '$value' && key !== '$type') {
                     traverse(node[key]);
                }
            }
        }
    }

    traverse(obj);
    return obj;
}

function mapToTailwind(tokens) {
    const theme = {
        colors: {},
        fontFamily: {},
        borderRadius: {},
        backdropBlur: {},
        blur: {},
        spacing: {},
        animation: {},
        keyframes: {}
    };

    // Helper to build object structure for Tailwind
    // If a node is a token ($value), returns the value.
    // If it's a group, returns an object with children.
    function buildObject(node) {
        if (!isObject(node)) return node;

        // If this node is strictly a token (has $value), return it directly?
        // But usually we call buildObject on the *parent* to decide keys.
        // Let's stick to the previous strategy: we are processing a Group.

        const res = {};
        for (const key in node) {
            if (key === '$value' || key === '$type') continue;

            const child = node[key];
            if (child && child.$value !== undefined) {
                res[key] = child.$value;
            } else if (isObject(child)) {
                const nested = buildObject(child);
                if (Object.keys(nested).length > 0) {
                    res[key] = nested;
                }
            }
        }
        return res;
    }

    if (tokens.color) {
       if (tokens.color.base) Object.assign(theme.colors, buildObject(tokens.color.base));
       if (tokens.color.brand) Object.assign(theme.colors, buildObject(tokens.color.brand));

       // Handle semantic background/text/border mapping to top-level names if needed
       // Or keep them nested: theme.colors.background.dark
       if (tokens.color.background) {
           theme.colors.background = buildObject(tokens.color.background);
       }
       if (tokens.color.text) {
           theme.colors.text = buildObject(tokens.color.text);
       }
       if (tokens.color.border) {
           theme.colors.border = buildObject(tokens.color.border);
       }
    }

    if (tokens.font && tokens.font.family) {
        Object.assign(theme.fontFamily, buildObject(tokens.font.family));
    }

    if (tokens.radius) {
         Object.assign(theme.borderRadius, buildObject(tokens.radius));
    }

    if (tokens.size && tokens.size.spacing) {
        Object.assign(theme.spacing, buildObject(tokens.size.spacing));
    }

    if (tokens.effect && tokens.effect.blur) {
        const blurs = buildObject(tokens.effect.blur);
        Object.assign(theme.backdropBlur, blurs);
        Object.assign(theme.blur, blurs);
    }

    if (tokens.animation) {
         Object.assign(theme.animation, buildObject(tokens.animation));
    }
    if (tokens.keyframes) {
         // Keyframes are not tokens, they are raw objects. We just copy them.
         // But we might need to resolve references inside them if we supported that.
         // For now, assume they are raw objects from the JSON.
         // But wait, our mergedTokens structure merges them.
         // And our recursive cleaner needs to handle them.

         // Since they don't have $value, buildObject would recurse and try to find $value or sub-objects.
         // But keyframes like "0%" don't have $value.
         // We can write a specific helper for keyframes or just dump the raw node content (minus $type/meta).

         function stripMeta(node) {
             const res = {};
             for (const key in node) {
                 if (key === '$value' || key === '$type') continue;
                 res[key] = node[key];
             }
             return res;
         }

         // Actually, keyframes structure: { vpulse: { '0%': { opacity: ... } } }
         // We can just iterate and copy.
         for (const key in tokens.keyframes) {
             if (key === '$value' || key === '$type') continue;
             theme.keyframes[key] = tokens.keyframes[key];
         }
    }

    return theme;
}

try {
    const files = getJsonFiles(TOKENS_DIR);
    files.sort(); // ensures 0-atomic before 1-semantic usually

    let mergedTokens = {};
    files.forEach(file => {
        const content = JSON.parse(fs.readFileSync(file, 'utf8'));
        mergedTokens = deepMerge(mergedTokens, content);
    });

    resolveReferences(mergedTokens, mergedTokens);

    const tailwindTheme = mapToTailwind(mergedTokens);

    const jsContent = `
// Generated from Design Tokens - Do not edit directly
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: ${JSON.stringify(tailwindTheme.colors, null, 2)},
      fontFamily: ${JSON.stringify(tailwindTheme.fontFamily, null, 2)},
      borderRadius: ${JSON.stringify(tailwindTheme.borderRadius, null, 2)},
      spacing: ${JSON.stringify(tailwindTheme.spacing, null, 2)},
      backdropBlur: ${JSON.stringify(tailwindTheme.backdropBlur, null, 2)},
      blur: ${JSON.stringify(tailwindTheme.blur, null, 2)},
      animation: ${JSON.stringify(tailwindTheme.animation, null, 2)},
      keyframes: ${JSON.stringify(tailwindTheme.keyframes, null, 2)}
    }
  }
};
`;

    fs.writeFileSync(OUTPUT_FILE, jsContent);
    console.log(`Theme generated successfully at ${OUTPUT_FILE}`);

} catch (error) {
    console.error('Error generating theme:', error);
    process.exit(1);
}
