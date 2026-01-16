window.tailwindConfig = {
    "darkMode": "class",
    "theme": {
        "extend": {
            "colors": {
                "primary": "#fb923c",
                "accent": "#f43f5e",
                "background": {
                    "default": "#0a0f1e",
                    "surface": "#161e31"
                },
                "glass": {
                    "default": "rgba(10, 15, 30, 0.75)",
                    "light": "rgba(255, 255, 255, 0.03)"
                },
                "border": {
                    "subtle": "rgba(255, 255, 255, 0.1)"
                },
                "text": {
                    "default": "#f1f5f9",
                    "muted": "#e2e8f0",
                    "inverse": "#0f172a"
                },
                "primitive": {
                    "orange": {
                        "400": "#fb923c",
                        "500": "#f97316"
                    },
                    "rose": {
                        "500": "#f43f5e"
                    },
                    "slate": {
                        "50": "#f8fafc",
                        "100": "#f1f5f9",
                        "200": "#e2e8f0",
                        "800": "#1e293b",
                        "900": "#0f172a",
                        "950": "#020617"
                    },
                    "brand": {
                        "dark": "#0a0f1e",
                        "surface": "#161e31",
                        "glass": "rgba(10, 15, 30, 0.75)",
                        "glass_light": "rgba(255, 255, 255, 0.03)"
                    }
                }
            },
            "fontFamily": {
                "display": "'Plus Jakarta Sans', sans-serif",
                "body": "'Inter', sans-serif"
            },
            "fontSize": {
                "xs": "0.75rem",
                "sm": "0.875rem",
                "base": "1rem",
                "lg": "1.125rem",
                "xl": "1.25rem",
                "2xl": "1.5rem",
                "3xl": "1.875rem"
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
                "context": {
                    "compact": {
                        "4": "0.75rem"
                    }
                }
            },
            "borderRadius": {
                "sm": "0.125rem",
                "md": "0.375rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "2xl": "1rem",
                "full": "9999px"
            },
            "animation": {
                "visualPulse": "vpulse 3s ease-in-out infinite",
                "reveal": "reveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                "float": "float 4s ease-in-out infinite",
                "connectorFlow": "flow 3s linear infinite"
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
                "std": "28px",
                "panel": "32px"
            },
            "blur": {
                "std": "28px",
                "panel": "32px"
            }
        }
    }
};