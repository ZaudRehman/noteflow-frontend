import axios, { AxiosError } from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

if (!API_BASE) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
}

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor - attach JWT
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle 401 and auto-refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (typeof window !== 'undefined') {
        const refreshToken = localStorage.getItem('refresh_token');
        
        if (refreshToken) {
          try {
            const { data } = await axios.post(`${API_BASE}/auth/refresh`, {
              refresh_token: refreshToken,
            });

            localStorage.setItem('access_token', data.access_token);
            originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

            return api(originalRequest);
          } catch (refreshError) {
            // Refresh failed, clear storage and redirect
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        } else {
          // No refresh token, redirect to login
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
