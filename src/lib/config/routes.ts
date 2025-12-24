export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  // Dashboard routes
  DASHBOARD: '/dashboard',
  
  // Notes routes
  NOTES: '/notes',
  NOTE_DETAIL: (id: string) => `/notes/${id}`,
  FAVORITES: '/notes/favorites',
  ARCHIVED: '/notes/archived',
  
  // Tags routes
  TAGS: '/tags',
  TAG_DETAIL: (id: string) => `/tags/${id}`,
  
  // Search
  SEARCH: '/search',
  
  // Profile
  PROFILE: '/profile',
} as const;

export type RoutePath = typeof ROUTES[keyof typeof ROUTES];
