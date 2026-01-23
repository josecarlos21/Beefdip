window.tailwind = {
    config: {
    "darkMode": "class",
    "theme": {
        "extend": {
            "colors": {
                "brand": {
                    "primary": "#fb923c",
                    "accent": "#f43f5e"
                },
                "bg": {
                    "canvas": "#0a0f1e",
                    "surface": "#161e31"
                },
                "text": {
                    "primary": "#f1f5f9",
                    "inverse": "#ffffff"
                },
                "base": {
                    "orange": {
                        "400": "#fb923c"
                    },
                    "rose": {
                        "500": "#f43f5e"
                    },
                    "blue": {
                        "900": "#161e31",
                        "950": "#0a0f1e"
                    },
                    "slate": {
                        "100": "#f1f5f9"
                    },
                    "white": "#ffffff",
                    "transparent": "transparent"
                }
            },
            "spacing": {
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
                "24": "6rem",
                "0_5": "0.125rem"
            },
            "borderRadius": {
                "none": "0px",
                "sm": "0.125rem",
                "md": "0.375rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "2xl": "1rem",
                "3xl": "1.5rem",
                "full": "9999px"
            },
            "fontFamily": {
                "display": "'Plus Jakarta Sans', sans-serif",
                "body": "'Inter', sans-serif"
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
                "std": "28px"
            },
            "blur": {
                "std": "28px"
            },
            "layout": {
                "max-width": "28rem",
                "container-padding": "1rem"
            },
            "card": {
                "bg": "#161e31",
                "radius": "1rem",
                "padding": "1.5rem"
            },
            "button": {
                "primary": {
                    "bg": "#fb923c",
                    "text": "#ffffff",
                    "radius": "0.5rem"
                }
            }
        }
    }
}
};