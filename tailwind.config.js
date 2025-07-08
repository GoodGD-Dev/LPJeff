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
      },
      animation: {
        autoRun3d: "autoRun3d 20s linear infinite",
        animateBrightness: "animateBrightness 20s linear infinite",
      },
      keyframes: {
        autoRun3d: {
          from: { transform: "perspective(800px) rotateY(-360deg)" },
          to: { transform: "perspective(800px) rotateY(0deg)" },
        },
        animateBrightness: {
          "10%": { filter: "brightness(1)" },
          "50%": { filter: "brightness(0.1)" },
          "90%": { filter: "brightness(1)" },
        },
      },
    }
  },
  plugins: [],
}
