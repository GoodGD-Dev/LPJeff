/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mosvita': ['Mosvita', 'sans-serif'],
        'mosvita-expanded': ['Mosvita Expanded', 'sans-serif'],
      },
      fontWeight: {
        'light': 300,
        'normal': 400,
        'semibold': 600,
        'bold': 700,
        'extrabold': 800,
        'black': 900,
      }
    }
  },
  plugins: [],
}
