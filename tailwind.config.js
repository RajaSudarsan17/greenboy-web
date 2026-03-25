/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#070A10',
        card: '#0B1020',
        'text-primary': '#E8EEFF',
        'text-secondary': 'rgba(232, 238, 255, 0.72)',
        accent: '#67E8F9',
      },
      fontFamily: {
        headline: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(103, 232, 249, 0.18)',
      },
    },
  },
  plugins: [],
};

