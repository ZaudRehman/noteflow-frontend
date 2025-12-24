import { api } from './client';
import type { Revision } from '@/lib/types/models';

export const historyAPI = {
    // GET /api/v1/notes/:id/history
    getNoteHistory: async (noteId: string): Promise<Revision[]> => {
        const response = await api.get<Revision[]>(`/notes/${noteId}/history`);
        return response.data;
    },

    // GET /api/v1/notes/:id/history/:revisionId
    getRevision: async (noteId: string, revisionId: string): Promise<Revision> => {
        const response = await api.get<Revision>(`/notes/${noteId}/history/${revisionId}`);
        return response.data;
    },

    // POST /api/v1/notes/:id/history/:revisionId/restore
    restoreRevision: async (noteId: string, revisionId: string): Promise<void> => {
        await api.post(`/notes/${noteId}/history/${revisionId}/restore`);
    },
};
