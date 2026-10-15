/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        campus: { DEFAULT: '#116B5A', dark: '#0B4A3F', light: '#E3F1ED' },
        orange: { DEFAULT: '#FF9F43', light: '#FFF1E0' },
        purple: { DEFAULT: '#7664D8', light: '#EEEBFB' },
        blue: { DEFAULT: '#2588E8', light: '#E3F0FD' },
        surface: '#F6F8F5',
      },
      fontFamily: {
        heading: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['"Work Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: { card: '16px' },
      boxShadow: { card: '0 2px 12px rgba(17, 107, 90, 0.08)' },
    },
  },
  plugins: [],
}
