
console.log("Loading theme configuration...");
window.tailwind = window.tailwind || {};
window.tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
    "colors": {
        "primary": "#fb923c",
        "accent": "#f43f5e",
        "background": {
            "dark": "#0a0f1e",
            "surface": "#161e31"
        },
        "base": {
            "slate": {
                "50": "#f8fafc",
                "100": "#f1f5f9",
                "200": "#e2e8f0",
                "300": "#cbd5e1",
                "400": "#94a3b8",
                "500": "#64748b",
                "600": "#475569",
                "700": "#334155",
                "800": "#1e293b",
                "900": "#0f172a",
                "950": "#020617"
            },
            "orange": {
                "400": "#fb923c",
                "500": "#f97316",
                "600": "#ea580c"
            },
            "rose": {
                "400": "#fb7185",
                "500": "#f43f5e",
                "600": "#e11d48"
            },
            "brand": {
                "dark": "#0a0f1e",
                "surface": "#161e31"
            }
        }
    },
    "fontFamily": {
        "display": "\"Plus Jakarta Sans\", sans-serif",
        "body": "\"Inter\", sans-serif",
        "sans": "\"Inter\", sans-serif",
        "jakarta": "\"Plus Jakarta Sans\", sans-serif",
        "inter": "\"Inter\", sans-serif"
    },
    "spacing": {
        "0": "0px",
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "0.75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "7": "1.75rem",
        "8": "2rem",
        "9": "2.25rem",
        "10": "2.5rem",
        "11": "2.75rem",
        "12": "3rem",
        "14": "3.5rem",
        "16": "4rem",
        "20": "5rem",
        "24": "6rem",
        "28": "7rem",
        "32": "8rem",
        "36": "9rem",
        "40": "10rem",
        "44": "11rem",
        "48": "12rem",
        "52": "13rem",
        "56": "14rem",
        "60": "15rem",
        "64": "16rem",
        "72": "18rem",
        "80": "20rem",
        "96": "24rem",
        "px": "1px",
        "0-5": "0.125rem",
        "1-5": "0.375rem",
        "2-5": "0.625rem",
        "3-5": "0.875rem"
    },
    "borderRadius": {
        "none": "0px",
        "sm": "0.125rem",
        "DEFAULT": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "full": "9999px"
    },
    "blur": {
        "none": "0",
        "sm": "4px",
        "md": "12px",
        "lg": "20px",
        "xl": "28px",
        "2xl": "32px",
        "3xl": "64px"
    },
    "backdropBlur": {
        "none": "0",
        "sm": "4px",
        "md": "12px",
        "lg": "20px",
        "xl": "28px",
        "2xl": "32px",
        "3xl": "64px"
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
    "animation": {
        "visual-pulse": "vpulse 3s ease-in-out infinite",
        "reveal": "reveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "float": "float 4s ease-in-out infinite",
        "connector-flow": "flow 3s linear infinite"
    }
}
    }
};
