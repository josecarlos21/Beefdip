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
                    }
                },
                "glass": {
                    "panel": {
                        "bg": "rgba(16, 24, 49, 0.85)",
                        "blur": "32px",
                        "border": "rgba(255, 255, 255, 0.08)"
                    },
                    "pure": {
                        "bg": "rgba(10, 15, 30, 0.75)",
                        "blur": "28px",
                        "border": "rgba(255, 255, 255, 0.1)"
                    },
                    "morphism": {
                        "bg": "rgba(239, 68, 68, 0.1)",
                        "blur": "20px",
                        "border": "rgba(239, 68, 68, 0.2)"
                    }
                }
            },
            "fontFamily": {
                "jakarta": "Plus Jakarta Sans",
                "inter": "Inter"
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
            "backdropBlur": {
                "glass-panel": "32px",
                "glass-pure": "28px",
                "glass-morphism": "20px"
            }
        }
    }
};
