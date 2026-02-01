const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.join(__dirname, '../tokens');
const OUTPUT_FILE = path.join(__dirname, '../public/theme.js');

// Helper to recursively read JSON files
function readTokens(dir) {
  let tokens = {};
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      const nested = readTokens(fullPath);
      tokens = deepMerge(tokens, nested);
    } else if (item.isFile() && item.name.endsWith('.json')) {
      const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      tokens = deepMerge(tokens, content);
    }
  }
  return tokens;
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

// Reference resolver
function resolveReferences(tokens, root) {
  const REGEX = /\{([^}]+)\}/g;

  function resolveValue(value) {
    if (typeof value === 'string') {
      return value.replace(REGEX, (_, path) => {
        const parts = path.split('.');
        let current = root;
        for (const part of parts) {
          current = current?.[part];
        }
        // If the resolved target is an object with $value, take that.
        if (current && current.$value !== undefined) {
          return resolveValue(current.$value);
        }
        return current !== undefined ? current : `{${path}}`; // Return original if not found
      });
    } else if (typeof value === 'object' && value !== null) {
      // Handle keyframe objects recursively
      const result = {};
      for (const key in value) {
         result[key] = resolveValue(value[key]);
      }
      return result;
    }
    return value;
  }

  function walk(node) {
    if (typeof node !== 'object' || node === null) return node;

    // If it's a token (has $value), resolve it
    if (node.$value !== undefined) {
      // We resolve the $value.
      // Note: If $type is keyframe, $value is an object.
      node.$value = resolveValue(node.$value);
      return node;
    }

    for (const key in node) {
      node[key] = walk(node[key]);
    }
    return node;
  }

  return walk(tokens);
}

// Flatten tokens for Tailwind (remove $value, $type wrapper)
// and map to specific config sections
function mapToTailwind(tokens) {
  const config = {
    colors: {},
    fontFamily: {},
    keyframes: {},
    animation: {},
    blur: {} // We map effect.blur to backdropBlur/blur?
  };

  // Helper to flatten object: { orange: { 500: { $value: ... } } } -> { orange: { 500: ... } }
  function flatten(node) {
    if (node.$value !== undefined) return node.$value;
    const result = {};
    for (const key in node) {
      result[key] = flatten(node[key]);
    }
    return result;
  }

  // Map Colors
  if (tokens.color) {
    config.colors = flatten(tokens.color);
  }

  // Map Typography
  if (tokens.font && tokens.font.family) {
    config.fontFamily = flatten(tokens.font.family);
  }

  // Map Keyframes
  if (tokens.animation && tokens.animation.keyframe) {
    config.keyframes = flatten(tokens.animation.keyframe);
  }

  // Map Animation Utilities
  if (tokens.animation && tokens.animation.semantic) {
    config.animation = flatten(tokens.animation.semantic);
  }

  // Map Blurs (Effects)
  // Tailwind expects theme.blur or theme.backdropBlur
  if (tokens.effect && tokens.effect.blur) {
     const blurs = flatten(tokens.effect.blur);
     config.blur = blurs;
     config.backdropBlur = blurs;
  }

  return config;
}

// Main execution
console.log('Building theme...');
let tokens = readTokens(TOKENS_DIR);
// Need a copy for resolution root because resolution modifies in place
const tokensForResolution = JSON.parse(JSON.stringify(tokens));
tokens = resolveReferences(tokens, tokensForResolution);

const tailwindConfig = mapToTailwind(tokens);

const outputContent = `
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: ${JSON.stringify(tailwindConfig.colors, null, 2)},
      fontFamily: ${JSON.stringify(tailwindConfig.fontFamily, null, 2)},
      keyframes: ${JSON.stringify(tailwindConfig.keyframes, null, 2)},
      animation: ${JSON.stringify(tailwindConfig.animation, null, 2)},
      blur: ${JSON.stringify(tailwindConfig.blur, null, 2)},
      backdropBlur: ${JSON.stringify(tailwindConfig.backdropBlur, null, 2)}
    }
  }
};
console.log('Theme loaded from tokens');
`;

fs.writeFileSync(OUTPUT_FILE, outputContent);
console.log(`Theme generated at ${OUTPUT_FILE}`);
