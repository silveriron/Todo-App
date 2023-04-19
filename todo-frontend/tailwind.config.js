/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "todo-color": "#f1f0f0",
      "todo-color-dark": "#91918E",
      "doing-color": "#D6E4EE",
      "doing-color-dark": "#6995B9",
      "done-color": "#DEECDC",
      "done-color-dark": "#769A7F",
      "bg-white": "#FAFAFA",
      gray: "#E0E0E0",
      "red-300": "#DA615C",
      "red-200": "#F2C8C5",
      "red-100": "#FCF5F2",
    },
  },
  plugins: [],
};
