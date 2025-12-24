import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        dark: {
          bg: '#1a1a1f',
          surface: '#25252d',
          elevated: '#2f2f38',
          border: '#3a3a44',
        },
        // Pastel colors
        pastel: {
          lavender: '#b8a4d4',
          mint: '#a4d4c4',
          peach: '#d4b8a4',
          sky: '#a4c4d4',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        'sans-medium': ['var(--font-geist-medium)', 'sans-serif'],
        'sans-semibold': ['var(--font-geist-semibold)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        display: ['var(--font-google-sans)', 'sans-serif'],
        'display-bold': ['var(--font-google-sans-bold)', 'sans-serif'],
        alt: ['var(--font-line-seed)', 'sans-serif'],
      },
      boxShadow: {
        'neu-sm': '4px 4px 8px rgba(0,0,0,0.3), -4px -4px 8px rgba(255,255,255,0.05)',
        'neu-md': '8px 8px 16px rgba(0,0,0,0.4), -8px -8px 16px rgba(255,255,255,0.06)',
        'neu-lg': '12px 12px 24px rgba(0,0,0,0.5), -12px -12px 24px rgba(255,255,255,0.07)',
        'neu-inset': 'inset 4px 4px 8px rgba(0,0,0,0.3), inset -4px -4px 8px rgba(255,255,255,0.05)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
