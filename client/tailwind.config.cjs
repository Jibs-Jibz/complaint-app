/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'oou-blue': "#020066",
        'oou-purple': "#130FC2"
      },
      backgroundImage: {
        'oou-bg': "url('./assets/oou-bg.png')"
      }
    },
  },
  plugins: [],
}