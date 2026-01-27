// Auto-generated from Design Tokens
window.tailwind = window.tailwind || {};
window.tailwind.config = {
    "darkMode": "class",
    "theme": {
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
                    "dark": {
                        "900": "#0a0f1e"
                    },
                    "surface": {
                        "800": "#161e31"
                    },
                    "white": {
                        "100": "#ffffff",
                        "alpha": {
                            "10": "rgba(255, 255, 255, 0.1)",
                            "03": "rgba(255, 255, 255, 0.03)",
                            "08": "rgba(255, 255, 255, 0.08)"
                        }
                    },
                    "black": {
                        "alpha": {
                            "75": "rgba(10, 15, 30, 0.75)",
                            "85": "rgba(16, 24, 49, 0.85)"
                        }
                    }
                }
            },
            "fontFamily": {
                "display": "'Plus Jakarta Sans', sans-serif",
                "body": "'Inter', sans-serif"
            },
            "blur": {
                "std": "28px",
                "panel": "32px",
                "morphism": "20px"
            },
            "backdropBlur": {
                "std": "28px",
                "panel": "32px",
                "morphism": "20px",
                "glass": "28px"
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
