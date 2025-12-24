export const theme = {
  colors: {
    dark: {
      bg: '#1a1a1f',
      surface: '#25252d',
      elevated: '#2f2f38',
      border: '#3a3a44',
    },
    pastel: {
      lavender: '#b8a4d4',
      mint: '#a4d4c4',
      peach: '#d4b8a4',
      sky: '#a4c4d4',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
  fonts: {
    sans: 'var(--font-geist-sans)',
    sansMedium: 'var(--font-geist-medium)',
    sansSemibold: 'var(--font-geist-semibold)',
    mono: 'var(--font-geist-mono)',
    display: 'var(--font-google-sans)',
    displayBold: 'var(--font-google-sans-bold)',
    alt: 'var(--font-line-seed)',
  },
  shadows: {
    neuSm: '4px 4px 8px rgba(0,0,0,0.3), -4px -4px 8px rgba(255,255,255,0.05)',
    neuMd: '8px 8px 16px rgba(0,0,0,0.4), -8px -8px 16px rgba(255,255,255,0.06)',
    neuLg: '12px 12px 24px rgba(0,0,0,0.5), -12px -12px 24px rgba(255,255,255,0.07)',
    neuInset: 'inset 4px 4px 8px rgba(0,0,0,0.3), inset -4px -4px 8px rgba(255,255,255,0.05)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

export type Theme = typeof theme;
