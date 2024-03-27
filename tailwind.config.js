/** @type {import('tailwindcss').Config} */
import colors from './src/assets/colors/colors';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'montserrat': ['Montserrat', 'sans-serif']
    },
    extend: {
      colors: {
        red: colors.red,
        yellow: colors.yellow,
        orange: colors.orange,
        green: colors.green,
        blue: colors.blue,
        purple: colors.purple,
        dark: colors.dark,
        black: colors.black,
        white: colors.white,
        ice: colors.ice,
        gray: colors.gray,
        light: colors.light,
      },
      boxShadow: {
        custom: 'rgba(17, 17, 26, 0.1) 0px 0px 16px'
      }
    },
  },
  plugins: [],
}

