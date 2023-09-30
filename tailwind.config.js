/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './auth/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    minWidth: {
      0: '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%',
    },
    minHeight: {
      0: '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%',
    },
    maxHeight: {
      0: '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%',
      120: '30rem',
      240: '60rem',
    },
    extend: {
      // colors: {
      //   primary: colors.teal,
      //   secondary: colors.orange,
      //   neutral: colors.gray,
      //   customGreen: '#66bb6a',
      // },
      animate: {
        blob: 'blob 12s infinite',
        gradientx: 'gradientx 15s ease infinite',
        gradienty: 'gradienty 15s ease infinite',
        gradientxy: 'gradientxy 15s ease infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -100px) scale(1.3)',
          },
          '66%': {
            transform: 'translate(70px, 10px) scale(0.8)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        gradienty: {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center',
          },
        },
        gradientx: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        gradientxy: {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        logoPrimary: '#ff8178',
        logoSecondary: '#8c6e78',
        logoTertiary: '#5d404b',
        primary: colors.teal,
        secondary: colors.purple,
        tertiary: colors.orange,
        neutral: colors.gray,
        primaryDark: colors.teal,
        secondaryDark: colors.purple,
        tertiaryDark: colors.orange,
        neutralDark: colors.gray,
      },
      height: {
        120: '30rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
