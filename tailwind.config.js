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
  daisyui: {
    base: false, // disables DaisyUI's base/root theme styles
  },
  darkMode: "class",
}
