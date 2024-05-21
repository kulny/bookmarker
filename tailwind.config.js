/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    extend: {
      colors: {
        'blue1': '#0b2447',
        'blue2': '#a5d7e8',
        'blue3': '#576cbc',
        'modalBg': 'rgba(0, 0, 0, 0.7)'
      }
    },
  },
  plugins: [],
}

