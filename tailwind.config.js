/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'strip-red': '#DC2626',
        'strip-gold': '#F59E0B',
        'strip-pink': '#EC4899',
        'strip-purple': '#8B5CF6',
        'strip-dark': '#0F0F0F',
        'strip-dark-alt': '#1A1A1A',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 