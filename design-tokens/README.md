# Fractal Design Token System

This directory contains the single source of truth for design decisions, organized by the Fractal Architecture levels:

- **0-atomic**: Primitive values (colors, spacing, fonts). Context-agnostic.
- **1-semantic**: Global functional tokens (primary color, background color).
- **2-component**: Specific component tokens (button background, card padding).
- **3-pattern**: Composite patterns (card layouts, form groups).
- **4-context**: Contextual overrides (themes, density, branding).

## Usage
These tokens are transformed using `style-dictionary` into usable assets for various platforms (CSS, iOS, Android).

## Building
Run `npm run build:tokens` (after configuration) to generate the output.
