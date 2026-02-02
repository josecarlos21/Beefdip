const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.join(__dirname, '../tokens');
const OUTPUT_FILE = path.join(__dirname, '../public/theme.js');

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

// Read all token files
const tokens = {};
const levels = ['0-atomic', '1-semantic', '2-component', '3-pattern', '4-contextual'];

levels.forEach(level => {
  const levelDir = path.join(TOKENS_DIR, level);
  if (fs.existsSync(levelDir)) {
    fs.readdirSync(levelDir).forEach(file => {
      if (file.endsWith('.json')) {
        const content = JSON.parse(fs.readFileSync(path.join(levelDir, file), 'utf8'));
        deepMerge(tokens, content);
      }
    });
  }
});

// Resolve references
function resolveValue(value, allTokens) {
  if (typeof value !== 'string') return value;

  const regex = /{([^}]+)}/g;
  let resolved = value;
  let match;

  while ((match = regex.exec(value)) !== null) {
    const path = match[1].split('.');
    let current = allTokens;
    for (const part of path) {
      current = current && current[part];
    }

    if (current && current.$value) {
      // Recursively resolve
      const replacement = resolveValue(current.$value, allTokens);
      // If the whole string is the reference, replace strictly (to keep types like objects)
      if (match[0] === value) return replacement;
      resolved = resolved.replace(match[0], replacement);
    } else {
      console.warn(`Could not resolve reference: ${match[0]}`);
    }
  }
  return resolved;
}

function resolveTokens(node, allTokens) {
  if (typeof node !== 'object' || node === null) return node;

  if (node.$value !== undefined) {
    return { ...node, $value: resolveValue(node.$value, allTokens) };
  }

  const resolvedNode = {};
  for (const key in node) {
    resolvedNode[key] = resolveTokens(node[key], allTokens);
  }
  return resolvedNode;
}

const resolvedTokens = resolveTokens(tokens, tokens);

// Transform to Tailwind Config
function transformToTailwind(node) {
  if (node.$value !== undefined) {
    return node.$value;
  }

  const output = {};
  for (const key in node) {
    output[key] = transformToTailwind(node[key]);
  }
  return output;
}

const tailwindConfig = {
  darkMode: 'class',
  theme: {
    extend: {}
  }
};

// Map Colors
if (resolvedTokens.color) {
  // Use semantic colors mostly, but we can expose all
  // Map 'color' tokens to 'colors'
  tailwindConfig.theme.extend.colors = transformToTailwind(resolvedTokens.color);
}

// Map Animations
if (resolvedTokens.animation) {
  tailwindConfig.theme.extend.animation = transformToTailwind(resolvedTokens.animation);
}

// Map Keyframes
if (resolvedTokens.keyframes) {
  tailwindConfig.theme.extend.keyframes = transformToTailwind(resolvedTokens.keyframes);
}

// Map Effects (Blur)
if (resolvedTokens.effect && resolvedTokens.effect.blur) {
   tailwindConfig.theme.extend.backdropBlur = transformToTailwind(resolvedTokens.effect.blur);
   tailwindConfig.theme.extend.blur = transformToTailwind(resolvedTokens.effect.blur);
}

// Generate Output
const fileContent = `
window.tailwind = window.tailwind || {};
window.tailwind.config = ${JSON.stringify(tailwindConfig, null, 4)};
console.log('Tailwind config loaded from tokens');
`;

fs.writeFileSync(OUTPUT_FILE, fileContent);
console.log(`Theme generated at ${OUTPUT_FILE}`);
