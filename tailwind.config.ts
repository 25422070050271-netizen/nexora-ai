import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      boxShadow: { glow: "0 20px 80px rgba(79, 70, 229, 0.28)" },
    },
  },
  plugins: [],
};

export default config;
