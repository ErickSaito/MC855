/** @type {import('tailwindcss').Config} */
const colors = require('./src/assets/colors.js');

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};
