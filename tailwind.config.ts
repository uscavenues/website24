import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        avenues: {
          pink: "#eb4c60",
          navy: "#345075",
          cream: "#fffcf9",
          dark: "#08080f",
          card: "#0f0f1a",
          border: "rgba(255,255,255,0.07)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "slide-in": "slideIn 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both",
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        slideIn: {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
