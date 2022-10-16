/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "accent-color": "rgb(var(--accent-color) / <alpha-value>)",
        "accent-color-light": "rgb(var(--accent-color-light) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
