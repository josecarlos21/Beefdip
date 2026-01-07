
// Simple Token Resolver to demonstrate the concept
// In a real build system, this would be handled by Style Dictionary

import atomic from '../tokens/0-atomic.json';
import semantic from '../tokens/1-semantic.json';
import component from '../tokens/2-component.json';

// Helper to flatten object keys (for finding references)
function flatten(obj: any, prefix = '', res: any = {}) {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null && !obj[key].$value) {
      flatten(obj[key], prefix + key + '.', res);
    } else {
      res[prefix + key] = obj[key];
    }
  }
  return res;
}

// Simple reference resolver
function resolveValue(value: string, allTokens: any): string {
  if (typeof value !== 'string') return value;
  const match = value.match(/\{([^}]+)\}/);
  if (match) {
    const refPath = match[1];
    // Find the token by path
    const token = refPath.split('.').reduce((o, i) => o?.[i], allTokens);
    if (token && token.$value) {
        return resolveValue(token.$value, allTokens);
    }
    return value; // Fallback or unresolved
  }
  return value;
}

// Recursively resolve tokens
function resolveTokens(obj: any, allTokens: any): any {
  const result: any = {};
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (obj[key].$value) {
            result[key] = resolveValue(obj[key].$value, allTokens);
        } else {
            result[key] = resolveTokens(obj[key], allTokens);
        }
    }
  }
  return result;
}

// Combine all tokens for context
const allRawTokens = { ...atomic, ...semantic, ...component };

// In a real app we might export this or use it to generate CSS
export const tokens = resolveTokens(allRawTokens, allRawTokens);

// Generate CSS Variables for runtime injection
export function generateCssVariables() {
    const vars: Record<string, string> = {};

    // Flatten and convert to --kebab-case
    function process(obj: any, prefix = '-') {
        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                vars[prefix + '-' + key] = obj[key];
            } else {
                process(obj[key], prefix + '-' + key);
            }
        }
    }
    process(tokens);
    return vars;
}
