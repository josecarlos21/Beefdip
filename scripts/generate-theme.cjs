const fs = require('fs');
const path = require('path');

// Helper to deeply merge objects
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

// Recursively resolve aliases like "{color.base.orange.400}"
function resolveValue(value, allTokens) {
  if (typeof value !== 'string') return value;
  const match = value.match(/^{(.+)}$/);
  if (match) {
    const path = match[1].split('.');
    let current = allTokens;
    for (const part of path) {
        if (current && current[part]) {
            current = current[part];
        } else {
            console.warn(`Token reference not found: ${match[1]}`);
            return value;
        }
    }
    // If the resolved token is an object with a value key, return that value
    if (current && typeof current === 'object' && 'value' in current) {
        return resolveValue(current.value, allTokens);
    }
    return current;
  }
  return value;
}

function resolveTokens(tokens, rootTokens) {
  const resolved = {};
  for (const key in tokens) {
    if (key === 'value' && typeof tokens[key] === 'string') {
        return resolveValue(tokens[key], rootTokens);
    } else if (typeof tokens[key] === 'object') {
        resolved[key] = resolveTokens(tokens[key], rootTokens);
    } else {
        resolved[key] = tokens[key];
    }
  }

  // Flatten logic:
  // If we are at a leaf node (has 'value' and 'type'), return value.
  if (resolved.value !== undefined && resolved.type) {
      return resolved.value;
  }
  // If we have just a value (because type was optional or lost), return value
  if (resolved.value !== undefined && Object.keys(resolved).length === 1) {
      return resolved.value;
  }

  return resolved;
}

// Load all tokens
const tokensDir = path.join(__dirname, '../tokens');
const atomic = JSON.parse(fs.readFileSync(path.join(tokensDir, '0-atomic/base.json'), 'utf8'));
const semantic = JSON.parse(fs.readFileSync(path.join(tokensDir, '1-semantic/theme.json'), 'utf8'));

// Merge raw structure
const allTokens = deepMerge({}, atomic);
deepMerge(allTokens, semantic);

// Resolve aliases
const resolvedTokens = resolveTokens(allTokens, allTokens);

// Map to Tailwind Theme Structure
// We need to ensure that 'text' color tokens are available under 'colors' or a specific extension.
// Tailwind doesn't have a separate 'textColor' top-level key in extend, it uses 'colors'.
// So `text-text-primary` implies we need a color named `text-primary` or nested `text: { primary: ... }`.

const tailwindConfig = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: resolvedTokens.color.primary,
                accent: resolvedTokens.color.accent,
                background: resolvedTokens.color.background,
                text: resolvedTokens.color.text, // Added this line to expose text colors
                // Expose base colors as well if needed, but keeping it semantic is better
                slate: resolvedTokens.color.base?.slate,
                orange: resolvedTokens.color.base?.orange,
                rose: resolvedTokens.color.base?.rose,
            },
            fontFamily: {
                sans: [resolvedTokens.font.family.sans, 'ui-sans-serif', 'system-ui'],
                body: [resolvedTokens.font.family.body, 'ui-sans-serif', 'system-ui'],
            },
            animation: resolvedTokens.animation,
            keyframes: {
                vpulse: { '0%, 100%': { opacity: '0.4', transform: 'scale(1)' }, '50%': { opacity: '0.8', transform: 'scale(1.05)' } },
                reveal: { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
                float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
                flow: { '0%': { strokeDashoffset: '40' }, '100%': { strokeDashoffset: '0' } }
            }
        }
    }
};

const output = `window.tailwind = window.tailwind || {};
window.tailwind.config = ${JSON.stringify(tailwindConfig, null, 4)};`;

// Ensure public directory exists
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)){
    fs.mkdirSync(publicDir);
}

fs.writeFileSync(path.join(publicDir, 'theme.js'), output);
console.log('Theme generated at public/theme.js');
