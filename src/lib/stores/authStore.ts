import { create } from 'zustand';
import Cookies from 'js-cookie';
import type { User } from '@/lib/types/models';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,

  setAuth: (user, accessToken, refreshToken) => {
    console.log('🔒 Setting auth:', { hasUser: !!user, hasToken: !!accessToken });

    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      // ✅ CRITICAL: Also save to cookies (for proxy middleware)
      Cookies.set('access_token', accessToken, {
        expires: 7, // 7 days
        sameSite: 'lax',
        path: '/',
      });

      Cookies.set('refresh_token', refreshToken, {
        expires: 30, // 30 days
        sameSite: 'lax',
        path: '/',
      });

      console.log('✅ Tokens saved to cookies:', {
        access: Cookies.get('access_token')?.substring(0, 20) + '...',
        refresh: Cookies.get('refresh_token')?.substring(0, 20) + '...',
      });
    }

    set({ user, accessToken, refreshToken, isAuthenticated: true });
  },

  clearAuth: () => {
    console.log('🔓 Clearing auth...');

    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');

      // ✅ CRITICAL: Also clear cookies
      Cookies.remove('access_token', { path: '/' });
      Cookies.remove('refresh_token', { path: '/' });

      console.log('✅ Cookies cleared');
    }

    set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
  },

  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),
}));

// Hydrate from localStorage/cookies on app load
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('access_token') || Cookies.get('access_token');
  const refresh = localStorage.getItem('refresh_token') || Cookies.get('refresh_token');
  const userStr = localStorage.getItem('user');

  if (token && refresh && userStr) {
    try {
      const user = JSON.parse(userStr);
      
      // Ensure cookies are set if they're missing
      if (!Cookies.get('access_token')) {
        Cookies.set('access_token', token, { expires: 7, sameSite: 'lax', path: '/' });
      }
      if (!Cookies.get('refresh_token')) {
        Cookies.set('refresh_token', refresh, { expires: 30, sameSite: 'lax', path: '/' });
      }

      useAuthStore.setState({
        user,
        accessToken: token,
        refreshToken: refresh,
        isAuthenticated: true,
      });

      console.log('🔄 Auth hydrated from storage');
    } catch (error) {
      console.error('Failed to parse user from localStorage:', error);
    }
  }
}
