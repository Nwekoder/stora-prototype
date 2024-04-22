/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.jsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: "'Noto Sans', sans-serif"
      }
    },
    fontWeight: {
      light: 300,
      normal: 500,
      bold: 700
    }
  },
  plugins: [],
}

