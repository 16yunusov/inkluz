/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8ed',
          100: '#f9edcd',
          200: '#f2d89b',
          300: '#ebc063',
          400: '#e5a53d',
          500: '#df8924',
          600: '#c5691c',
          700: '#a34f1a',
          800: '#833f1b',
          900: '#6b3519',
        },
        secondary: '#06c167', // Uber Eats green
      },
    },
  },
  plugins: [],
}
