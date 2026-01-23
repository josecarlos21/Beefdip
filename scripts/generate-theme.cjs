
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

function resolveReferences(obj, root) {
  const regex = /\{([^}]+)\}/g;

  function resolve(value) {
    if (typeof value !== 'string') return value;

    return value.replace(regex, (match, path) => {
      const parts = path.split('.');
      let current = root;
      for (const part of parts) {
        if (current && current[part]) {
          current = current[part];
        } else {
          console.warn(`Reference not found: ${path}`);
          return match;
        }
      }

      // If the resolved target is a token object, return its value
      // Otherwise assume it's the value itself (if already resolved or raw)
      if (current && current.$value) {
        let resolved = current.$value;
        // Recursively resolve if the found value is also a reference
        if (typeof resolved === 'string' && resolved.includes('{')) {
             resolved = resolve(resolved);
        }
        return resolved;
      }

      return current;
    });
  }

  function traverse(node) {
    for (const key in node) {
      if (typeof node[key] === 'object' && node[key] !== null) {
        traverse(node[key]);
      } else if (key === '$value' && typeof node[key] === 'string') {
        node[key] = resolve(node[key]);
      }
    }
  }

  traverse(obj);
  return obj;
}

function extractValues(node) {
  if (node.$value !== undefined) {
    return node.$value;
  }

  const output = {};
  for (const key in node) {
    if (key !== '$type' && key !== '$description') {
      output[key] = extractValues(node[key]);
    }
  }
  return output;
}

function generate() {
  const files = getAllFiles(TOKENS_DIR);
  let tokens = {};

  files.forEach(file => {
    const content = JSON.parse(fs.readFileSync(file, 'utf8'));
    tokens = deepMerge(tokens, content);
  });

  // Resolve references
  tokens = resolveReferences(tokens, tokens);

  // Extract plain values structure
  const cleanTokens = extractValues(tokens);

  // Map to Tailwind Config
  const tailwindConfig = {
    darkMode: 'class',
    theme: {
      extend: {
        colors: cleanTokens.color || {},
        spacing: cleanTokens.spacing || {},
        borderRadius: cleanTokens.radius || {},
        fontFamily: cleanTokens.fontFamily || {},
        animation: cleanTokens.animations || {},
        keyframes: cleanTokens.keyframes || {},
        backdropBlur: cleanTokens.effects ? cleanTokens.effects.blur : {},
        blur: cleanTokens.effects ? cleanTokens.effects.blur : {},
        // Map other tokens if necessary
      }
    }
  };

  // Custom mapping for layout pattern if needed, but Tailwind doesn't have a 'layout' theme key by default.
  // We can add it to 'extend' so it's accessible via theme('layout.max-width')
  if (cleanTokens.layout) {
      tailwindConfig.theme.extend.layout = cleanTokens.layout;
  }
  if (cleanTokens.card) {
      tailwindConfig.theme.extend.card = cleanTokens.card;
  }
  if (cleanTokens.button) {
      tailwindConfig.theme.extend.button = cleanTokens.button;
  }

  const outputContent = `window.tailwind = {
    config: ${JSON.stringify(tailwindConfig, null, 4)}
};`;

  fs.writeFileSync(OUTPUT_FILE, outputContent);
  console.log(`Theme generated at ${OUTPUT_FILE}`);
}

generate();
