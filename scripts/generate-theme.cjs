const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.resolve(__dirname, '../tokens');
const OUTPUT_FILE = path.resolve(__dirname, '../public/theme.js');

// Helper to recursively read directory
function readTokens(dir) {
  let results = {};
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      const res = readTokens(file);
      results = deepMerge(results, res);
    } else if (file.endsWith('.json')) {
      const content = JSON.parse(fs.readFileSync(file, 'utf8'));
      results = deepMerge(results, content);
    }
  });
  return results;
}

// Deep merge helper
function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

// Resolve references like {color.base.orange.500}
function resolveReferences(obj, root) {
  const str = JSON.stringify(obj);
  const regex = /\{([a-zA-Z0-9_.]+)\}/g;

  let resolvedStr = str;
  let match;

  // limit iterations to prevent infinite loops
  let iterations = 0;
  while ((match = regex.exec(resolvedStr)) !== null && iterations < 10) {
    const fullMatch = match[0];
    const path = match[1].split('.');

    let value = root;
    for (const p of path) {
      value = value ? value[p] : undefined;
    }

    if (value && value.$value) {
      // If the value is a token, use its $value
      resolvedStr = resolvedStr.replace(fullMatch, value.$value);
    } else if (value && typeof value === 'string') {
        // Direct string value (if somehow we reference a non-token leaf)
       resolvedStr = resolvedStr.replace(fullMatch, value);
    } else {
       // Could not resolve
       console.warn(`Could not resolve reference: ${fullMatch}`);
       // Break to avoid infinite loop if it's unresolvable
       break;
    }

    // Reset regex to find nested refs if any
    regex.lastIndex = 0;
    iterations++;
  }

  return JSON.parse(resolvedStr);
}

// Flatten for specific tailwind keys if needed, or just map
// Tailwind expects specific structure.
// We need to map our DTCG structure to Tailwind's.

function mapToTailwind(tokens) {
  const theme = {
    extend: {
      colors: {},
      fontFamily: {},
      borderRadius: {},
      animation: {},
      keyframes: {}
    }
  };

  // Helper to extract values recursively
  function extractValues(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    if (obj.$value) return obj.$value;
    const res = {};
    for (const key in obj) {
      if (key !== '$type' && key !== '$description') {
        res[key] = extractValues(obj[key]);
      }
    }
    return res;
  }

  // Colors
  if (tokens.color) {
    // We want to expose semantic colors primarily, but maybe base too?
    // Let's flatten everything for now or just map semantic.
    // existing tailwind config had: primary, accent, background
    // tokens.color.primary -> theme.extend.colors.primary

    const colors = extractValues(tokens.color);
    theme.extend.colors = colors;
  }

  // Font Family
  if (tokens.font && tokens.font.family) { // Adjust based on structure
     // tokens.font.family.display -> theme.extend.fontFamily.display (if mapped)
     // current structure in typography.json is font.family.* in atomic
     // semantic is font.display

     // Let's merge atomic and semantic fonts
     const fonts = extractValues(tokens.font);
     // Flatten if needed. Tailwind expects: 'display': ['Plus Jakarta Sans', ...]
     // But we have just strings.
     theme.extend.fontFamily = fonts;
  }

  // Radius
  if (tokens.radius) {
    theme.extend.borderRadius = extractValues(tokens.radius);
  }

  // Spacing
  if (tokens.spacing) {
    theme.extend.spacing = extractValues(tokens.spacing);
  }

  // Animation
  if (tokens.animation) {
      theme.extend.animation = extractValues(tokens.animation);
  }

  // Keyframes
  if (tokens.keyframes) {
      // Keyframes in JSON might be objects, extractValues handles it
      theme.extend.keyframes = extractValues(tokens.keyframes);
  }

  // Effects (Blur)
  if (tokens.effect && tokens.effect.blur) {
    const blurs = extractValues(tokens.effect.blur);
    theme.extend.blur = blurs;
    theme.extend.backdropBlur = blurs;
  }

  return theme;
}

// Main execution
try {
  console.log('Building theme...');
  const rawTokens = readTokens(TOKENS_DIR);
  const resolvedTokens = resolveReferences(rawTokens, rawTokens);
  const tailwindTheme = mapToTailwind(resolvedTokens);

  const outputContent = `
// Generated Theme
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: 'class',
  theme: ${JSON.stringify(tailwindTheme, null, 2)}
};
`;

  fs.writeFileSync(OUTPUT_FILE, outputContent);
  console.log(`Theme written to ${OUTPUT_FILE}`);
} catch (error) {
  console.error('Error generating theme:', error);
  process.exit(1);
}
