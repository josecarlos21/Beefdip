
// Generated Theme
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: 'class',
  theme: {
  "extend": {
    "colors": {
      "primary": "#fb923c",
      "accent": "#f43f5e",
      "background": {
        "dark": "#0a0f1e",
        "surface": "#161e31"
      },
      "base": {
        "orange": {
          "400": "#fb923c",
          "500": "#f97316"
        },
        "rose": {
          "500": "#f43f5e"
        },
        "slate": {
          "100": "#f1f5f9",
          "900": "#0f172a"
        },
        "brand": {
          "dark": "#0a0f1e",
          "surface": "#161e31"
        },
        "white": "#ffffff",
        "black": "#000000"
      }
    },
    "fontFamily": {
      "display": "Plus Jakarta Sans, sans-serif",
      "body": "Inter, sans-serif",
      "family": {
        "display": "Plus Jakarta Sans, sans-serif",
        "body": "Inter, sans-serif",
        "mono": "monospace"
      }
    },
    "borderRadius": {
      "sm": "0.125rem",
      "md": "0.375rem",
      "lg": "0.5rem",
      "xl": "0.75rem",
      "2xl": "1rem",
      "3xl": "1.5rem",
      "full": "9999px"
    },
    "animation": {
      "visual-pulse": "vpulse 3s ease-in-out infinite",
      "reveal": "reveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      "float": "float 4s ease-in-out infinite",
      "connector-flow": "flow 3s linear infinite"
    },
    "keyframes": {
      "vpulse": {
        "0%, 100%": {
          "opacity": "0.4",
          "transform": "scale(1)"
        },
        "50%": {
          "opacity": "0.8",
          "transform": "scale(1.05)"
        }
      },
      "reveal": {
        "0%": {
          "opacity": "0",
          "transform": "translateY(24px)"
        },
        "100%": {
          "opacity": "1",
          "transform": "translateY(0)"
        }
      },
      "float": {
        "0%, 100%": {
          "transform": "translateY(0)"
        },
        "50%": {
          "transform": "translateY(-10px)"
        }
      },
      "flow": {
        "0%": {
          "strokeDashoffset": "40"
        },
        "100%": {
          "strokeDashoffset": "0"
        }
      }
    },
    "spacing": {
      "0": "0px",
      "1": "0.25rem",
      "2": "0.5rem",
      "4": "1rem",
      "8": "2rem",
      "16": "4rem"
    },
    "blur": {
      "std": "28px",
      "panel": "32px",
      "sm": "4px"
    },
    "backdropBlur": {
      "std": "28px",
      "panel": "32px",
      "sm": "4px"
    }
  }
}
};
