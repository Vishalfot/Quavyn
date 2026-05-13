/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["'DM Sans'", "sans-serif"], mono: ["'DM Mono'", "monospace"] },
      colors: {
        ink: { DEFAULT: "#0f0c1a", 800: "#1a1528", 700: "#251e38", 600: "#342c4e", 500: "#4a4068" },
        violet: { DEFAULT: "#7c3aed", 900: "#3b0764", 800: "#4c0a80", 700: "#6d28d9", 600: "#7c3aed", 500: "#8b5cf6", 400: "#a78bfa", 200: "#ddd6fe", 100: "#ede9fe", 50: "#f5f3ff" },
        signal: { critical: "#ef4444", priority: "#f97316", info: "#3b82f6", success: "#10b981" },
      },
      boxShadow: {
        "card": "0 1px 2px rgba(15,12,26,0.04), 0 4px 16px rgba(124,58,237,0.06)",
        "card-hover": "0 4px 24px rgba(124,58,237,0.14), 0 1px 3px rgba(15,12,26,0.06)",
        "drawer": "-8px 0 48px rgba(15,12,26,0.18)",
        "modal": "0 24px 80px rgba(15,12,26,0.28)",
        "violet": "0 4px 20px rgba(124,58,237,0.35)",
      },
      animation: {
        "slide-in-right": "slideInRight 0.35s cubic-bezier(0.32,0.72,0,1)",
        "slide-in-up": "slideInUp 0.3s cubic-bezier(0.32,0.72,0,1)",
        "fade-in": "fadeIn 0.25s ease-out",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "flow": "flow 2.5s linear infinite",
        "shimmer": "shimmer 1.8s linear infinite",
        "bounce-subtle": "bounceSub 1.5s ease-in-out infinite",
      },
      keyframes: {
        slideInRight: { from: { transform: "translateX(100%)", opacity: 0 }, to: { transform: "translateX(0)", opacity: 1 } },
        slideInUp: { from: { transform: "translateY(20px)", opacity: 0 }, to: { transform: "translateY(0)", opacity: 1 } },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        pulseSoft: { "0%,100%": { opacity: 0.6 }, "50%": { opacity: 1 } },
        flow: { "0%": { "stroke-dashoffset": "100" }, "100%": { "stroke-dashoffset": "0" } },
        shimmer: { "0%": { "background-position": "-400px 0" }, "100%": { "background-position": "400px 0" } },
        bounceSub: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-3px)" } },
      },
    },
  },
  plugins: [],
};
