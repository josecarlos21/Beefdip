const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.join(__dirname, '../tokens');
const OUTPUT_FILE = path.join(__dirname, '../public/theme.js');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.json')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
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

function loadTokens() {
  const files = getAllFiles(TOKENS_DIR);
  let tokens = {};
  files.forEach(file => {
    const content = JSON.parse(fs.readFileSync(file, 'utf8'));
    tokens = deepMerge(tokens, content);
  });
  return tokens;
}

function resolveValue(value, tokens) {
  if (typeof value !== 'string') return value;

  const refRegex = /{([^}]+)}/g;
  if (!refRegex.test(value)) return value;

  return value.replace(refRegex, (match, pathStr) => {
    const keys = pathStr.split('.');
    let current = tokens;
    for (const key of keys) {
      if (current && current[key]) {
        current = current[key];
      } else {
        console.warn(`Warning: Reference not found: ${pathStr}`);
        return match;
      }
    }

    if (current && current.$value) {
        // Recursively resolve
        return resolveValue(current.$value, tokens);
    }

    // If it points to an object without $value (e.g. intermediate node), that's an issue for string interpolation,
    // but maybe fine if we are just traversing?
    // For now assume leaf nodes have $value.
    return current;
  });
}

function resolveTokens(node, root) {
  if (typeof node !== 'object' || node === null) return node;

  // Clone to avoid mutation issues if needed, but in-place is fine here
  for (const key in node) {
    if (key === '$value') {
      node[key] = resolveValue(node[key], root);
    } else {
      resolveTokens(node[key], root);
    }
  }
  return node;
}

function flattenForTailwind(node) {
  if (node.$value !== undefined) {
      return node.$value;
  }

  const output = {};
  for (const key in node) {
      if (key === '$type' || key === '$description') continue;
      output[key] = flattenForTailwind(node[key]);
  }
  return output;
}

const tokens = loadTokens();
resolveTokens(tokens, tokens);

// Mapping to Tailwind Config
const tailwindConfig = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {},
      fontFamily: {},
      fontSize: {},
      spacing: {},
      borderRadius: {},
      animation: {},
      keyframes: {}
    }
  }
};

// Map Colors
// We want tokens.color.semantic.* to be at top level of colors, e.g. colors.primary
// And tokens.color.primitive.* maybe under colors.primitive.*?
// Let's flatten semantic colors to root.
if (tokens.color && tokens.color.semantic) {
    Object.assign(tailwindConfig.theme.extend.colors, flattenForTailwind(tokens.color.semantic));
}
// Add primitives too if needed, let's put them under 'primitive'
if (tokens.color && tokens.color.primitive) {
    tailwindConfig.theme.extend.colors.primitive = flattenForTailwind(tokens.color.primitive);
}

// Map Typography
if (tokens.font && tokens.font.family) {
    tailwindConfig.theme.extend.fontFamily = flattenForTailwind(tokens.font.family);
}
if (tokens.font && tokens.font.size) {
    // Tailwind fontSize can be just size, or [size, lineHeight]
    // Here we just have size.
    tailwindConfig.theme.extend.fontSize = flattenForTailwind(tokens.font.size);
}
// Map Weights? Tailwind usually handles this via utilities, but we can extend if needed.
// Skipping weights for now as standard tailwind weights usually suffice or match 100-900.

// Map Spacing
if (tokens.spacing) {
    tailwindConfig.theme.extend.spacing = flattenForTailwind(tokens.spacing);
}

// Map Radius
if (tokens.radius) {
    tailwindConfig.theme.extend.borderRadius = flattenForTailwind(tokens.radius);
}

// Map Effects (Blur)
if (tokens.effect && tokens.effect.blur) {
    tailwindConfig.theme.extend.backdropBlur = flattenForTailwind(tokens.effect.blur);
    tailwindConfig.theme.extend.blur = flattenForTailwind(tokens.effect.blur);
}

// Map Animations
if (tokens.animation && tokens.animation.custom) {
    tailwindConfig.theme.extend.animation = flattenForTailwind(tokens.animation.custom);
}
if (tokens.animation && tokens.animation.keyframes) {
    tailwindConfig.theme.extend.keyframes = flattenForTailwind(tokens.animation.keyframes);
}

const fileContent = `window.tailwindConfig = ${JSON.stringify(tailwindConfig, null, 4)};`;

fs.writeFileSync(OUTPUT_FILE, fileContent);
console.log(`Theme generated at ${OUTPUT_FILE}`);
