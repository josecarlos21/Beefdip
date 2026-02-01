# Fractal Design Token System

This project implements a Fractal Design Token System conforming to DTCG v1 standards.

## Architecture

Tokens are organized in `tokens/` directory by hierarchy:

*   **Level 0 (Atomic)**: `tokens/0-atomic/` - Raw values (colors, fonts, animations, effects).
*   **Level 1 (Semantic)**: `tokens/1-semantic/` - Functional aliases (primary, background, etc.).
*   **Level 2 (Component)**: `tokens/2-component/` - Component-specific decisions.
*   **Level 3 (Pattern)**: `tokens/3-pattern/` - Pattern-level tokens (future use).
*   **Level 4 (Contextual)**: `tokens/4-contextual/` - Theme/mode overrides (future use).

## Usage

1.  Define tokens in JSON files using `$value` and `$type`.
2.  Use references like `{color.base.orange.500}`.
3.  Run `npm run generate-theme` to build the `public/theme.js` file.
4.  The theme is loaded via `index.html` into `window.tailwind.config`.

## Component Tokens in Tailwind

Component tokens under the `color` key (e.g., `color.component.bottom-nav.background`) are mapped to Tailwind colors.
Usage: `bg-component-bottom-nav-background`.

## Governance

*   Always prefer using tokens over hardcoded values.
*   New components should have their own token file in `tokens/2-component/`.
