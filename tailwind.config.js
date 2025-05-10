/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: "#0D0D0D",
        light: "#f4f4f4",
      },
    },
  },
  plugins: [],
};
