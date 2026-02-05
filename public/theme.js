
window.tailwind = window.tailwind || {};
window.tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
    "primary": "#fb923c",
    "accent": "#f43f5e",
    "background": {
        "dark": "#0a0f1e",
        "surface": "#161e31"
    },
    "base": {
        "orange": {
            "500": "#fb923c"
        },
        "rose": {
            "500": "#f43f5e"
        },
        "slate": {
            "100": "#f1f5f9",
            "800": "#161e31",
            "900": "#0a0f1e",
            "950": "#020617"
        },
        "white": {
            "DEFAULT": "#ffffff"
        }
    }
},
            animation: {
    "visual_pulse": "vpulse 3s ease-in-out infinite",
    "reveal": "reveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
    "float": "float 4s ease-in-out infinite",
    "connector_flow": "flow 3s linear infinite",
    "timing": {
        "fast": "0.1s",
        "normal": "0.6s",
        "slow": "1.2s",
        "pulse": "3s",
        "float": "4s"
    },
    "curve": {
        "ease_in_out": "ease-in-out",
        "ease_custom": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "linear": "linear"
    }
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
},
            blur: {
    "std": "28px",
    "md": "20px",
    "lg": "32px"
},
            backdropBlur: {
    "std": "28px",
    "md": "20px",
    "lg": "32px"
}
        }
    },
    plugins: [
        function({ addUtilities }) {
            addUtilities({
    ".glass-pure": {
        "background-color": "rgba(10, 15, 30, 0.65)",
        "backdrop-filter": "blur(28px)",
        "-webkit-backdrop-filter": "blur(28px)",
        "border": "1px solid rgba(255, 255, 255, 0.1)",
        "box-shadow": "0 8px 32px 0 rgba(0, 0, 0, 0.37)"
    },
    ".glass-panel": {
        "background-color": "rgba(16, 24, 49, 0.85)",
        "backdrop-filter": "blur(32px)",
        "-webkit-backdrop-filter": "blur(32px)",
        "border": "1px solid rgba(255, 255, 255, 0.12)",
        "border-top": "1px solid rgba(255, 255, 255, 0.12)",
        "box-shadow": "0 -4px 30px rgba(0, 0, 0, 0.5)"
    },
    ".glass-morphism": {
        "background-color": "rgba(239, 68, 68, 0.1)",
        "backdrop-filter": "blur(20px)",
        "-webkit-backdrop-filter": "blur(20px)",
        "border": "1px solid rgba(239, 68, 68, 0.2)",
        "box-shadow": "0 8px 32px 0 rgba(239, 68, 68, 0.1)"
    },
    ".img-scrim-deep": {
        "background": "linear-gradient(to bottom, transparent 0%, rgba(10,15,30,0.2) 40%, rgba(10,15,30,0.95) 90%, #0a0f1e 100%)"
    },
    ".img-scrim-top": {
        "background": "linear-gradient(to top, transparent 0%, rgba(10,15,30,0.7) 100%)"
    }
})
        }
    ]
};
