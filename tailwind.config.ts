import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#000000",
        carbon: "#0D0D0F",
        slateStudio: "#151519",
        alabaster: "#FFFFFF",
        pewter: "#B7B7BF",
        brandBlue: "#14ACF3",
        brandPurple: "#8145CA",
        brandPink: "#F3398D",
        brandOrange: "#FF7538",
        accent: {
          DEFAULT: "#14ACF3",
          hover: "#F3398D",
          purple: "#8145CA",
          pink: "#F3398D",
          orange: "#FF7538",
          muted: "rgba(129, 69, 202, 0.16)",
          border: "rgba(20, 172, 243, 0.42)",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        display: [
          "'Syne'",
          "'Plus Jakarta Sans'",
          "system-ui",
          "sans-serif",
        ],
        arabic: ["'IBM Plex Sans Arabic'", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        editorial: "-0.035em",
        wideUpper: "0.16em",
      },
      boxShadow: {
        focal:
          "0 30px 80px -20px rgba(0, 0, 0, 0.9), 0 0 48px -12px rgba(129, 69, 202, 0.35), 0 0 24px -8px rgba(20, 172, 243, 0.25)",
        folder:
          "0 24px 60px -15px rgba(0, 0, 0, 0.88), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)",
        brandGlow:
          "0 12px 36px -6px rgba(243, 57, 141, 0.32), 0 6px 20px -4px rgba(20, 172, 243, 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
