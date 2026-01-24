
/**
 * Generated Theme file. Do not edit directly.
 * Generated from /tokens
 */
console.log("Loading theme configuration...");
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
                    "500": "#fb923c"
                },
                "rose": {
                    "500": "#f43f5e"
                },
                "slate": {
                    "100": "#f1f5f9",
                    "900": "#161e31",
                    "950": "#0a0f1e"
                },
                "white": "#ffffff",
                "transparent": "transparent"
            }
        },
        "fontFamily": {
            "display": [
                "Plus Jakarta Sans",
                "sans-serif"
            ],
            "body": [
                "Inter",
                "sans-serif"
            ]
        },
        "spacing": {
            "section": "4rem"
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
        "blur": {
            "std": "28px"
        },
        "backdropBlur": {
            "std": "28px"
        }
    }
}
};
console.log("Theme configuration loaded.", window.tailwind.config);
