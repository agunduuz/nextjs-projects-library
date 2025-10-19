/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F5FEF0',
          100: '#E8FCDB',
          200: '#D4FAB8',
          300: '#C3FA98',
          400: '#B0F876',
          500: '#9AF554',
          600: '#7FE02E',
          700: '#5FC210',
          800: '#4A9B0A',
          900: '#3A7908',
        },
        secondary: {
          50: '#E8F2F2',
          100: '#D1E5E5',
          200: '#A3CBCC',
          300: '#75B1B2',
          400: '#479799',
          500: '#2D494A',
          600: '#24393A',
          700: '#1B2B2C',
          800: '#121D1D',
          900: '#0A1111',
        },
        accent: {
          50: '#EEFDF9',
          100: '#D4FBF0',
          200: '#AAF7E2',
          300: '#7FF3D3',
          400: '#54EFC5',
          500: '#3CDDB4',
          600: '#29C49D',
          700: '#1FA47F',
          800: '#188466',
          900: '#126B53',
        },
      },
      fontFamily: {
        sans: ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
