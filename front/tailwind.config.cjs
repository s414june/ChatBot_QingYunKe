/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'ring-white': '0 0 3px rgba(255, 255, 255, 0.5)',
        'ring-dark': '0 0 3px rgba(100,116,139,0.5)',
      },
      maxWidth: {
        '3/4': '75%'
      },
      backgroundImage: {
        'robot-head': "url('./assets/robotHead.png')",
      },
      backgroundSize: {
        '8': '2rem',
      },
      scale: {
        '1': '1',
      }
    },
  },
  plugins: [],
}