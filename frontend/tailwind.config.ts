import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef5ff",
          100: "#dbeafe",
          500: "#4f7cff",
          600: "#3f67e8",
          700: "#3455c6",
        },
      },
      boxShadow: {
        soft: "0 10px 35px rgba(15, 23, 42, 0.07)",
      },
    },
  },
  plugins: [],
};

export default config;
