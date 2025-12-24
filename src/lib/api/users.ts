import { api } from './client';
import type {
  UpdateProfileRequest,
  UpdatePreferencesRequest,
} from '@/lib/types/api';
import type { UserProfile } from '@/lib/types/models';

export const usersAPI = {
  // GET /api/v1/users/profile
  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get<UserProfile>('/users/profile');
    return response.data;
  },

  // PUT /api/v1/users/profile
  updateProfile: async (data: UpdateProfileRequest): Promise<UserProfile> => {
    const response = await api.put<UserProfile>('/users/profile', data);
    return response.data;
  },

  // PUT /api/v1/users/preferences
  updatePreferences: async (data: UpdatePreferencesRequest): Promise<UserProfile> => {
    const response = await api.put<UserProfile>('/users/preferences', data);
    return response.data;
  },
};
