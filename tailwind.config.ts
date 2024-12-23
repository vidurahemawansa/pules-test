import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.scss",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          orange: "#FF9800",
        },
        secondary: {
          "custom-grey-100": "#AD9D87",
          "custom-grey-200": "#343434",
          "custom-grey-300": "#D0D0D0",
          "custom-grey-400": "#6E6E6E",
          "custom-grey-500": "#6E5B50",
          "custom-grey-600": "#605954",
          "custom-white-100": "#FFFFFF99",
          "custom-white-200": "#CACACA",
          "custom-orange-100": "#FF98007A",
          "custom-orange-200": "#FFE8C6",
          "custom-orange-300": "#FFCB7F",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
