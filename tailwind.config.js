/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        nav: '1400px',
      },
      colors: {
        bg: '#050816',
        primary: '#22d3ee',
        secondary: '#a855f7',
        muted: '#94a3b8',
        line: '#1e293b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
}
