const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.tsx', './components/**/*.tsx', './posts/**/*.mdx'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        md: '1.5rem',
      },
      screens: {
        DEFAULT: '100%',
        sm: '100%',
        md: '768px',
        lg: '1024px',
      },
    },
    extend: {
      colors: {
        // Neutral paper background and stone ink tones
        paper: {
          DEFAULT: '#fafaf8',
          dark: '#0f0f0e',
        },
        ink: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
        // Lime, matching the profile picture background
        accent: {
          DEFAULT: '#4d7c0f',
          light: '#bef264',
          bright: '#c8f52a',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        serif: ['var(--font-serif)', ...fontFamily.serif],
      },
      keyframes: {
        'fade-up': {
          from: { opacity: 0, transform: 'translateY(8px)' },
          to: { opacity: 1, transform: 'none' },
        },
      },
      animation: {
        'fade-up': 'fade-up .6s cubic-bezier(.2,.7,.2,1) both',
      },
    },
  },
  plugins: [],
};
