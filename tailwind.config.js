/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      minHeight: {
        '80vh': '80vh',
      },
    },
  },
  plugins: [require('daisyui'),],
  darkMode: "class",
}

