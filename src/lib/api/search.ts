import { api } from './client';
import type { SearchResponse } from '@/lib/types/api';

export const searchAPI = {
  // GET /api/v1/search?q=query
  search: async (
    query: string,
    params?: { page?: number; limit?: number }
  ): Promise<SearchResponse> => {
    const response = await api.get<SearchResponse>('/search', {
      params: { q: query, ...params },
    });
    return response.data;
  },
};
