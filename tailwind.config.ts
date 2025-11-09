import { type Config } from 'tailwindcss'
import typographyStyles from './typography'
import typographyPlugin from '@tailwindcss/typography'
import headlessuiPlugin from '@headlessui/tailwindcss'
import formPlugin from '@tailwindcss/forms'

export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{js,mjs,jsx,ts,tsx,mdx}'
  ],
  darkMode: 'class',
  theme: {
    fontSize: {
      '2xs': ['0.75rem', { lineHeight: '1.25rem' }],
      xs: ['0.8125rem', { lineHeight: '1.5rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.75rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      }
    },
    typography: typographyStyles,
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        satoshi: ['var(--font-secondary)', 'sans-serif'],
        display: ['var(--font-secondary)', 'sans-serif'],
      },
      colors: {
        'editor': '#1e1e1e',
        'emmaPrimary': '#3C4196',
        'emmaPrimaryHover': '#693F73',
        'emmaPrimaryDark': 'rgb(201, 106, 0)',
        'emmaPrimaryDarkHover': '#FFA235',
      },
      boxShadow: {
        glow: '0 0 4px rgb(0 0 0 / 0.1)',
      },
      maxWidth: {
        lg: '33rem',
        '2xl': '40rem',
        '3xl': '50rem',
        '5xl': '66rem',
      },
      opacity: {
        1: '0.01',
        2.5: '0.025',
        7.5: '0.075',
        15: '0.15',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "scroll": "scroll 30s linear infinite",
      },
    },
  },
  plugins: [
    typographyPlugin, 
    headlessuiPlugin, 
    formPlugin,
    // tailwindcssAnimatePlugin
  ],
} satisfies Config
