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
          50: '#fdf8f0',
          100: '#f9eddb',
          200: '#f2d7b6',
          300: '#e9bb87',
          400: '#df9956',
          500: '#d67d33',
          600: '#c86628',
          700: '#a64e23',
          800: '#854023',
          900: '#6c361f',
        },
        dark: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#1a1a1a',
          950: '#0d0d0d',
        },
        gold: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#d4a84b',
          500: '#c9952a',
          600: '#b8860b',
          700: '#8f6b0a',
          800: '#6d520e',
          900: '#5a4412',
        },
      },
      fontFamily: {
        display: ['CODE', 'sans-serif'],
        body: ['CODE', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
