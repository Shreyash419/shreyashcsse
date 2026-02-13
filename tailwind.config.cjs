/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['InterVariable', 'Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        neon: {
          cyan: '#00f5ff',
          purple: '#a855f7'
        }
      },
      boxShadow: {
        soft: '0 18px 45px rgba(15, 23, 42, 0.35)',
        glow: '0 0 40px rgba(0, 245, 255, 0.4)'
      },
      borderRadius: {
        '3xl': '1.5rem'
      }
    }
  },
  plugins: []
};

