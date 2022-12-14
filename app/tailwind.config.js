/** @type {import('tailwindcss').Config} */
const colors = require('./assets/colors.js');

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      zenMaru: ['Zen Maru Gothic'],
      zenKakuNew: ['Zen Kaku Gothic New'],
    },
    extend: {
      colors,
      width: {
        '1/4': '25%',
        half: '50%',
        '3/4': '75%',
        full: '100%',
        350: '350px',
      },
    },
  },
  plugins: [],
};
