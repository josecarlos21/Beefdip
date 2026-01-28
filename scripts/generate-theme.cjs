const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.join(__dirname, '../tokens');
const OUTPUT_FILE = path.join(__dirname, '../public/theme.js');

function getAllFiles(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.json')) {
        arrayOfFiles.push(path.join(dirPath, file));
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
    try {
      const content = JSON.parse(fs.readFileSync(file, 'utf8'));
      tokens = deepMerge(tokens, content);
    } catch (e) {
      console.error(`Error reading file ${file}:`, e);
    }
  });
  return tokens;
}

function resolveValue(value, allTokens) {
  if (typeof value !== 'string') return value;

  const regex = /\{([^}]+)\}/g;
  if (!regex.test(value)) return value;

  return value.replace(regex, (match, pathStr) => {
    const parts = pathStr.split('.');
    let current = allTokens;
    for (const part of parts) {
      current = current?.[part];
    }

    // If current is an object with $value, use that.
    if (current && typeof current === 'object' && '$value' in current) {
      return resolveValue(current.$value, allTokens);
    }

    return current || match;
  });
}

function resolveTokens(node, allTokens) {
  if (typeof node !== 'object' || node === null) return node;

  if ('$value' in node) {
    const resolved = resolveValue(node.$value, allTokens);
    return { ...node, $value: resolved };
  }

  const result = {};
  for (const key in node) {
    result[key] = resolveTokens(node[key], allTokens);
  }
  return result;
}

function stripMeta(node) {
  if (typeof node !== 'object' || node === null) return node;

  if ('$value' in node) {
    return node.$value;
  }

  const result = {};
  for (const key in node) {
    result[key] = stripMeta(node[key]);
  }
  return result;
}

function extractByType(node, type) {
  if (typeof node !== 'object' || node === null) return undefined;

  if ('$value' in node && node.$type === type) {
    return node.$value;
  }

  // Recursively check children
  const result = {};
  let hasMatch = false;

  for (const key in node) {
    const child = extractByType(node[key], type);
    if (child !== undefined) {
      result[key] = child;
      hasMatch = true;
    }
  }

  return hasMatch ? result : undefined;
}

// Specialized extraction because strict type checking might miss things if we just defined them structurally
// DTCG: $type should be on the token.
// But we can also look at the top level keys as a fallback if $type is missing but we know the structure.
// However, the prompt implies a robust system. I'll stick to extracting by category if possible, or mapping known roots.

function transformToTailwind(resolvedTokens) {
  // We can try to map top-level keys to Tailwind config sections
  // color -> colors
  // fontFamily -> fontFamily
  // keyframes -> keyframes
  // animation -> animation
  // effect.blur -> blur

  const theme = { extend: {} };

  // Helper to extract a subtree and strip $value/$type
  const extract = (pathArray) => {
    let current = resolvedTokens;
    for (const part of pathArray) {
      current = current?.[part];
    }
    return current ? stripMeta(current) : undefined;
  };

  // Colors: look for 'color' and 'component' (if it has colors)
  const colors = extract(['color']);
  if (colors) theme.extend.colors = colors;

  const component = extract(['component']);
  if (component) {
    // If we want components in colors, we merge them?
    // Or just put them in extend.colors.component?
    // Tailwind extends are deep merged usually.
    if (!theme.extend.colors) theme.extend.colors = {};
    theme.extend.colors.component = component;
  }

  const fontFamilies = extract(['fontFamily']);
  if (fontFamilies) theme.extend.fontFamily = fontFamilies;

  const animations = extract(['animation']);
  if (animations) theme.extend.animation = animations;

  const keyframes = extract(['keyframes']);
  if (keyframes) theme.extend.keyframes = keyframes;

  const effects = extract(['effect']);
  if (effects && effects.blur) theme.extend.blur = effects.blur;

  return theme;
}

function main() {
  console.log('Generating theme...');
  const tokens = loadTokens();
  const resolved = resolveTokens(tokens, tokens);
  const tailwindConfig = transformToTailwind(resolved);

  const fileContent = `window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: 'class',
  theme: ${JSON.stringify(tailwindConfig, null, 2)}
};`;

  fs.writeFileSync(OUTPUT_FILE, fileContent);
  console.log(`Theme generated at ${OUTPUT_FILE}`);
}

main();
