import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Manrope"', "system-ui", "sans-serif"],
      },
      colors: {
        navy: {
          950: "#070914",
          900: "#10112D",
          800: "#1A1C3A",
          700: "#25284A",
        },
        purple: {
          50: "#F8F7FF",
          100: "#F0EEFD",
          200: "#DDD2FF",
          300: "#C3AEFF",
          400: "#A383FF",
          500: "#8B5CF6",
          600: "#6738F5",
          700: "#5A2AD9",
          800: "#4820AE",
          900: "#361A80",
        },
        gold: {
          400: "#FFC94A",
          500: "#FFB51B",
        },
        surface: "#F8F7FF",
        white: "#FFFFFF",
        ink: "#141A3A",
        slate: {
          500: "#59627A",
          600: "#4A526A",
          700: "#3A4058",
        },
        border: {
          DEFAULT: "#E7E7F2",
          light: "#F0EFF5",
        },
      },
      boxShadow: {
        soft: "0 18px 50px -28px rgba(24, 20, 70, 0.25)",
        lift: "0 26px 70px -36px rgba(59, 31, 150, 0.35)",
        glow: "0 18px 60px -20px rgba(103, 56, 245, 0.4)",
        card: "0 4px 20px -4px rgba(20, 20, 40, 0.08)",
        "card-hover": "0 12px 40px -12px rgba(20, 20, 40, 0.15)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      maxWidth: {
        content: "1440px",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(180deg, #F8F7FF 0%, #FFFFFF 100%)",
        "lavender-radial": "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(103, 56, 245, 0.08) 0%, transparent 70%)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        fadeIn: "fadeIn 0.6s ease-out both",
        fadeInUp: "fadeInUp 0.4s ease-out both",
      },
    },
  },
  plugins: [],
} satisfies Config;