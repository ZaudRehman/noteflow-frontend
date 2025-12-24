import { api } from './client';
import type {
  TagListResponse,
  CreateTagRequest,
  UpdateTagRequest,
} from '@/lib/types/api';
import type { Tag, Note } from '@/lib/types/models';

export const tagsAPI = {
  // GET /api/v1/tags
  list: async (): Promise<TagListResponse> => {
    const response = await api.get<TagListResponse>('/tags');
    return response.data;
  },

  // GET /api/v1/tags/:id
  get: async (id: string): Promise<Tag> => {
    const response = await api.get<Tag>(`/tags/${id}`);
    return response.data;
  },

  // POST /api/v1/tags
  create: async (data: CreateTagRequest): Promise<Tag> => {
    const response = await api.post<Tag>('/tags', data);
    return response.data;
  },

  // PUT /api/v1/tags/:id
  update: async (id: string, data: UpdateTagRequest): Promise<Tag> => {
    const response = await api.put<Tag>(`/tags/${id}`, data);
    return response.data;
  },

  // DELETE /api/v1/tags/:id
  delete: async (id: string): Promise<void> => {
    await api.delete(`/tags/${id}`);
  },

  // GET /api/v1/tags/:id/notes
  getNotes: async (id: string): Promise<{ notes: Note[] }> => {
    const response = await api.get<{ notes: Note[] }>(`/tags/${id}/notes`);
    return response.data;
  },

  // POST /api/v1/notes/:note_id/tags
  addToNote: async (note_id: string, tag_id: string): Promise<void> => {
    await api.post(`/notes/${note_id}/tags`, { tag_id });
  },

  // DELETE /api/v1/notes/:note_id/tags/:tag_id
  removeFromNote: async (note_id: string, tag_id: string): Promise<void> => {
    await api.delete(`/notes/${note_id}/tags/${tag_id}`);
  },
};
