
// Generated from Design Tokens - Do not edit directly
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
  "orange": {
    "400": "#fb923c"
  },
  "rose": {
    "500": "#f43f5e",
    "500_10": "rgba(244, 63, 94, 0.1)",
    "500_20": "rgba(244, 63, 94, 0.2)"
  },
  "slate": {
    "100": "#f1f5f9",
    "800": "#1e293b",
    "900": "#0f172a"
  },
  "dark": {
    "800": "#161e31",
    "900": "#0a0f1e",
    "glass": "rgba(10, 15, 30, 0.75)",
    "glass_panel": "rgba(16, 24, 49, 0.85)"
  },
  "white": {
    "10": "rgba(255, 255, 255, 0.1)",
    "pure": "#ffffff",
    "03": "rgba(255, 255, 255, 0.03)",
    "08": "rgba(255, 255, 255, 0.08)"
  },
  "primary": "#fb923c",
  "accent": "#f43f5e",
  "background": {
    "default": "#0a0f1e",
    "dark": "#0a0f1e",
    "surface": "#161e31",
    "glass": {
      "pure": "rgba(10, 15, 30, 0.75)",
      "panel": "rgba(16, 24, 49, 0.85)",
      "light": "rgba(255, 255, 255, 0.03)"
    }
  },
  "text": {
    "primary": "#f1f5f9",
    "inverse": "#0a0f1e"
  },
  "border": {
    "subtle": "rgba(255, 255, 255, 0.1)",
    "highlight": "rgba(255, 255, 255, 0.08)"
  }
},
      fontFamily: {
  "display": "'Plus Jakarta Sans', sans-serif",
  "body": "'Inter', sans-serif",
  "mono": "monospace",
  "icons": "'Material Symbols Outlined'"
},
      borderRadius: {
  "sm": "0.125rem",
  "md": "0.375rem",
  "lg": "0.5rem",
  "xl": "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  "full": "9999px"
},
      spacing: {
  "0": "0px",
  "1": "0.25rem",
  "2": "0.5rem",
  "3": "0.75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "8": "2rem",
  "10": "2.5rem",
  "12": "3rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem"
},
      backdropBlur: {
  "std": "28px",
  "panel": "32px",
  "glass": "20px"
},
      blur: {
  "std": "28px",
  "panel": "32px",
  "glass": "20px"
},
      animation: {
  "visual-pulse": "vpulse 3s ease-in-out infinite",
  "reveal": "reveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
  "float": "float 4s ease-in-out infinite",
  "connector-flow": "flow 3s linear infinite"
},
      keyframes: {
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
