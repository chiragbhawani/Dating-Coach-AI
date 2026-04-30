import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14201f",
        sage: "#2f6f64",
        blush: "#d7617b",
        honey: "#f3b95f",
        mist: "#eef6f2"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(20, 32, 31, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
