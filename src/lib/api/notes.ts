import { api } from './client';
import type {
  NoteListResponse,
  CreateNoteRequest,
  UpdateNoteRequest,
} from '@/lib/types/api';
import type { Note } from '@/lib/types/models';

export const notesAPI = {
  // GET /api/v1/notes
  list: async (params?: {
    page?: number;
    limit?: number;
    filter?: 'favorites' | 'archived' | 'all';
    tag_id?: string;
  }): Promise<NoteListResponse> => {
    const response = await api.get<NoteListResponse>('/notes', { params });
    return response.data;
  },

  // POST /api/v1/notes
  create: async (data: CreateNoteRequest): Promise<Note> => {
    const response = await api.post<Note>('/notes', data);
    return response.data;
  },

  // GET /api/v1/notes/:id
  get: async (id: string): Promise<Note> => {
    const response = await api.get<Note>(`/notes/${id}`);
    return response.data;
  },

  // PUT /api/v1/notes/:id
  update: async (id: string, data: UpdateNoteRequest): Promise<Note> => {
    const response = await api.put<Note>(`/notes/${id}`, data);
    return response.data;
  },

  // DELETE /api/v1/notes/:id
  delete: async (id: string): Promise<void> => {
    await api.delete(`/notes/${id}`);
  },

  // POST /api/v1/notes/:id/favorite
  toggleFavorite: async (id: string): Promise<Note> => {
    const response = await api.post<Note>(`/notes/${id}/favorite`);
    return response.data;
  },

  // POST /api/v1/notes/:id/archive
  toggleArchive: async (id: string): Promise<Note> => {
    const response = await api.post<Note>(`/notes/${id}/archive`);
    return response.data;
  },

  // POST /api/v1/notes/:id/tags
  addTag: async (id: string, tagId: string): Promise<Note> => {
    const response = await api.post<Note>(`/notes/${id}/tags`, { tag_id: tagId });
    return response.data;
  },

  // DELETE /api/v1/notes/:id/tags/:tagId
  removeTag: async (id: string, tagId: string): Promise<Note> => {
    const response = await api.delete<Note>(`/notes/${id}/tags/${tagId}`);
    return response.data;
  },
};
