window.tailwind = window.tailwind || {};
window.tailwind.config = {
    "darkMode": "class",
    "theme": {
        "extend": {
            "colors": {
                "primary": "#fb923c",
                "accent": "#f43f5e",
                "background": {
                    "default": "#0a0f1e",
                    "surface": "#161e31",
                    "card": "#101831"
                },
                "text": {
                    "primary": "#f8fafc",
                    "secondary": "#e2e8f0",
                    "muted": "rgba(255,255,255,0.4)"
                },
                "slate": {
                    "50": "#f8fafc",
                    "100": "#f1f5f9",
                    "200": "#e2e8f0",
                    "800": "#1e293b",
                    "900": "#0f172a",
                    "950": "#020617"
                },
                "orange": {
                    "400": "#fb923c",
                    "500": "#f97316"
                },
                "rose": {
                    "400": "#fb7185",
                    "500": "#f43f5e"
                }
            },
            "fontFamily": {
                "sans": [
                    "Plus Jakarta Sans, sans-serif",
                    "ui-sans-serif",
                    "system-ui"
                ],
                "body": [
                    "Inter, sans-serif",
                    "ui-sans-serif",
                    "system-ui"
                ]
            },
            "animation": {
                "visual-pulse": "vpulse 3s ease-in-out infinite",
                "reveal": "reveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                "float": "float 4s ease-in-out infinite"
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