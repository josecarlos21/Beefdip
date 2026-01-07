
import * as tokens from '../src/styles/tokens';

/**
 * Deterministic Token Resolver
 *
 * This utility simulates the resolution of tokens, although Style Dictionary
 * handles the static generation. In a dynamic environment (like runtime theming),
 * this resolver would handle the precedence logic described in Level 4 (Context).
 */

export const resolveToken = (path: string, theme: 'light' | 'dark' = 'light') => {
    // This is a simplified representation. In a real scenario, we might merge objects.
    // For now, it returns the value from the generated tokens.js

    // Note: The generated tokens.js from Style Dictionary usually has a flat structure or nested structure
    // depending on configuration.

    return getNestedValue(tokens, path);
};

const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((prev, curr) => prev ? prev[curr] : null, obj);
}
