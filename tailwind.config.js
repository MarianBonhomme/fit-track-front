/** @type {import('tailwindcss').Config} */
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
        red: '#F46F97',
        yellow: '#F5BE40',
        orange: '#F58A61',
        green: '#37C8A6',
        blue: '#3BCBEA',
        purple: '#AA6AE6',
        dark: '#25252F',
        black: '#232438',
        white: '#F5F5F5',
        ice: '#E9ECF5',
      },
      boxShadow: {
        custom: 'rgba(17, 17, 26, 0.1) 0px 0px 16px'
      }
    },
  },
  plugins: [],
}

