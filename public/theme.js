
// Generated Theme from Design Tokens
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: 'class',
  theme: {
  "extend": {
    "colors": {
      "primary": {
        "main": "#fb923c",
        "hover": "#f97316",
        "DEFAULT": "#fb923c"
      },
      "accent": {
        "main": "#f43f5e",
        "DEFAULT": "#f43f5e"
      },
      "background": {
        "app": "#0a0f1e",
        "surface": "#161e31",
        "dark": "#0a0f1e"
      },
      "text": {
        "primary": "#f1f5f9",
        "secondary": "#e2e8f0"
      }
    },
    "fontFamily": {
      "sans": [
        "Plus Jakarta Sans",
        "sans-serif"
      ],
      "display": [
        "Inter",
        "sans-serif"
      ]
    },
    "borderRadius": {
      "button": "1.8rem",
      "card": "2.2rem",
      "pill": "9999px"
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
    }
  }
}
};
