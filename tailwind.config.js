/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: '#9E2384',
        blue: '#2B0D84',
        orange: '#D7964E',
        gold: '#8E5C0E',
        dark: '#25252F',
        black: '#181619'
      }
    },
  },
  plugins: [],
}

