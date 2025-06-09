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
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        
        // رنگ‌های اصلی سیستم طراحی
        "classic-blue": "#1A3C69",  // آبی کلاسیک
        "cream": "#f4f1ec",        // کرم
        
        primary: {
          DEFAULT: "#1A3C69",      // آبی کلاسیک
          hover: "#15325A",
          light: "#E6EBF4",
        },
        secondary: {
          DEFAULT: "#f4f1ec",      // کرم
          hover: "#e9e4db",
          light: "#faf8f5",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          light: "var(--accent-light)",
        },
        success: {
          DEFAULT: "var(--success)",
          light: "var(--success-light)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          light: "var(--warning-light)",
        },
        danger: {
          DEFAULT: "var(--danger)",
          light: "var(--danger-light)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  safelist: [
    {
      pattern: /bg-(primary|secondary|accent|success|warning|danger|classic-blue|cream)(\/[0-9]+)?/,
    },
    {
      pattern: /border-(primary|secondary|accent|success|warning|danger|classic-blue|cream)(\/[0-9]+)?/,
    },
    {
      pattern: /text-(primary|secondary|accent|success|warning|danger|classic-blue|cream)(\/[0-9]+)?/,
    },
  ],
  plugins: [],
};
export default config;
