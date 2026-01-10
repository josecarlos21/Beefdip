
window.tailwindConfig = {
    darkMode: 'class',
    theme: {
    "extend": {
        "colors": {
            "color": {
                "base": {
                    "white": "#ffffff",
                    "black": "#000000",
                    "transparent": "transparent"
                },
                "brand": {
                    "primary": "#fb923c",
                    "secondary": "#f43f5e"
                },
                "neutral": {
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
                "navy": {
                    "800": "#1e293b",
                    "900": "#161e31",
                    "950": "#0a0f1e"
                }
            },
            "theme": {
                "background": {
                    "base": "#0a0f1e",
                    "surface": "#161e31",
                    "overlay": "#0f172a"
                },
                "text": {
                    "primary": "#f8fafc",
                    "secondary": "#94a3b8",
                    "muted": "#475569",
                    "on-brand": "#ffffff"
                },
                "border": {
                    "default": "#1e293b",
                    "subtle": "#0f172a",
                    "active": "#fb923c"
                },
                "action": {
                    "primary": {
                        "default": "#fb923c",
                        "hover": "#f43f5e"
                    },
                    "secondary": {
                        "default": "#1e293b",
                        "hover": "#161e31"
                    }
                },
                "status": {
                    "success": "#34d399",
                    "warning": "#fbbf24",
                    "error": "#ef4444",
                    "info": "#38bdf8"
                }
            },
            "component": {
                "card": {
                    "background": "#161e31",
                    "border": "#1e293b"
                },
                "glass": {
                    "background": "rgba(22, 30, 49, 0.7)",
                    "border": "rgba(255, 255, 255, 0.1)"
                }
            },
            "primary": "#fb923c",
            "accent": "#f43f5e",
            "background": {
                "dark": "#0a0f1e",
                "surface": "#161e31"
            }
        },
        "spacing": {
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
                "32": "8rem"
            },
            "component": {
                "card": {
                    "padding": "1.5rem"
                },
                "button": {
                    "padding-x": "1.5rem",
                    "padding-y": "0.75rem"
                }
            }
        },
        "borderRadius": {
            "radius": {
                "sm": "0.125rem",
                "md": "0.375rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "2xl": "1rem",
                "full": "9999px"
            },
            "component": {
                "card": {
                    "radius": "0.75rem"
                },
                "button": {
                    "radius": "9999px"
                }
            }
        },
        "fontSize": {
            "font": {
                "size": {
                    "xs": "0.75rem",
                    "sm": "0.875rem",
                    "base": "1rem",
                    "lg": "1.125rem",
                    "xl": "1.25rem",
                    "2xl": "1.5rem",
                    "3xl": "1.875rem",
                    "4xl": "2.25rem"
                }
            }
        },
        "fontFamily": {
            "font": {
                "family": {
                    "sans": "\"Plus Jakarta Sans\", sans-serif",
                    "body": "Inter, sans-serif"
                }
            }
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
