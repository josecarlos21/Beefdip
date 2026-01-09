# Design Tokens

This project implements a **Fractal Design Token System conforming to DTCG v1**.

## Levels

- **Level 0 (Atomic):** `tokens/0-atomic/` - Raw values (hex codes, font names).
- **Level 1 (Semantic):** `tokens/1-semantic/` - Semantic meanings (primary color, background, shape radius).
- **Level 2 (Component):** `tokens/2-component/` - Component specific overrides (not fully populated yet).
- **Level 3 (Pattern):** `tokens/3-pattern/` - (Placeholder for future patterns).
- **Level 4 (Contextual):** `tokens/4-contextual/` - (Placeholder for themes/modes).

## Usage

To regenerate the theme:
```bash
node scripts/generate-theme.cjs
```
This updates `public/theme.js` which is loaded by `index.html`.
