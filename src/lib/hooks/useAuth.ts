import { useAuthStore } from '@/lib/stores/authStore';
import { authAPI } from '@/lib/api/auth';
import { usersAPI } from '@/lib/api/users';
import { useUIStore } from '@/lib/stores/uiStore';

export function useAuth() {
  const { user, isAuthenticated, setAuth, clearAuth, updateUser } = useAuthStore();
  const { addToast } = useUIStore();

  const login = async (email: string, password: string) => {
    try {
      const data = await authAPI.login({ email, password });
      setAuth(data.user, data.access_token, data.refresh_token);
      return data; // Return data instead of redirecting
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Login failed', 'error');
      throw error;
    }
  };

  const register = async (email: string, password: string, display_name: string) => {
    try {
      const data = await authAPI.register({ email, password, display_name });
      setAuth(data.user, data.access_token, data.refresh_token);
      return data; // Return data instead of redirecting
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Registration failed', 'error');
      throw error;
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        await authAPI.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuth();
      addToast('Logged out successfully', 'info');
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      await authAPI.forgotPassword({ email });
      addToast('Password reset email sent', 'success');
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to send reset email', 'error');
      throw error;
    }
  };

  const resetPassword = async (token: string, new_password: string) => {
    try {
      await authAPI.resetPassword({ token, new_password });
      addToast('Password reset successful', 'success');
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Password reset failed', 'error');
      throw error;
    }
  };

  const updateProfile = async (data: any) => {
    try {
      const updatedUser = await usersAPI.updateProfile(data);
      updateUser(updatedUser);
      addToast('Profile updated successfully', 'success');
      return updatedUser;
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to update profile', 'error');
      throw error;
    }
  };

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
  };
}
