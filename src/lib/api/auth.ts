import { api } from './client';
import type {
  AuthResponse,
  RefreshTokenResponse,
  RegisterRequest,
  LoginRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '@/lib/types/api';
import type { User } from '@/lib/types/models';

export const authAPI = {
  // POST /api/v1/auth/register
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  // POST /api/v1/auth/login
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  // POST /api/v1/auth/refresh
  refresh: async (refresh_token: string): Promise<RefreshTokenResponse> => {
    const response = await api.post<RefreshTokenResponse>('/auth/refresh', {
      refresh_token,
    });
    return response.data;
  },

  // GET /api/v1/auth/me
  me: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  // POST /api/v1/auth/logout
  logout: async (refresh_token: string): Promise<void> => {
    await api.post('/auth/logout', { refresh_token });
  },

  // POST /api/v1/auth/forgot-password
  forgotPassword: async (data: ForgotPasswordRequest): Promise<void> => {
    await api.post('/auth/forgot-password', data);
  },

  // POST /api/v1/auth/reset-password
  resetPassword: async (data: ResetPasswordRequest): Promise<void> => {
    await api.post('/auth/reset-password', data);
  },
};
