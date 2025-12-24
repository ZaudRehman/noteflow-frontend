export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Noteflow';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
export const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL!;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  DASHBOARD: '/dashboard',
  NOTES: '/dashboard/notes',
  NOTE_DETAIL: (id: string) => `/dashboard/notes/${id}`,
  FAVORITES: '/dashboard/notes/favorites',
  ARCHIVED: '/dashboard/notes/archived',
  TAGS: '/dashboard/tags',
  TAG_DETAIL: (id: string) => `/dashboard/tags/${id}`,
  SEARCH: '/dashboard/search',
  PROFILE: '/dashboard/profile',
  SETTINGS: '/dashboard/settings',
  HISTORY: (id: string) => `/dashboard/notes/${id}/history`,
  TRASH: '/dashboard/trash',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  DISPLAY_NAME_MIN_LENGTH: 1,
  DISPLAY_NAME_MAX_LENGTH: 100,
  TITLE_MIN_LENGTH: 1,
  TITLE_MAX_LENGTH: 255,
  TAG_NAME_MIN_LENGTH: 1,
  TAG_NAME_MAX_LENGTH: 50,
} as const;
