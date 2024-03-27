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
        primary: 'var(--primary-color)',
        lightPrimary: 'var(--lightPrimary-color)',
        secondary: 'var(--secondary-color)',
        red: 'var(--red-color)',
        yellow: 'var(--yellow-color)',
        orange: 'var(--orange-color)',
        green: 'var(--green-color)',
        blue: 'var(--blue-color)',
        purple: 'var(--purple-color)',
        gray: 'var(--gray-color)',
      },
      boxShadow: {
        custom: 'rgba(17, 17, 26, 0.1) 0px 0px 16px'
      }
    },
  },
  plugins: [],
}

