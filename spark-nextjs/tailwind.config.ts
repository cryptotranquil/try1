import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        cta: "var(--cta)",
        "cta-ink": "var(--cta-ink)",
        sec: "var(--sec)",
        clean: "var(--clean)",
        supply: "var(--supply)",
      },
      fontFamily: {
        display: ['"Archivo"', '"Arial Narrow"', '"Helvetica Neue"', "Arial", "sans-serif"],
        body: ['"Public Sans"', '"Segoe UI"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
