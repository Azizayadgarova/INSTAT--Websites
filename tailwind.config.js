/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Asosiy shrift uchun
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
      },
      // Bu yerga maxsus grunge tekstura effektini qo'shish qiyin, 
      // shuning uchun uni CSS orqali qilamiz.
    },
  },
  plugins: [],
}