import { useState, useCallback } from 'react';
import { notesAPI } from '@/lib/api/notes';
import { useNotesStore } from '@/lib/stores/notesStore';
import { useUIStore } from '@/lib/stores/uiStore';
import type { Note } from '@/lib/types/models';

export function useNotes() {
  const { notes, setNotes, addNote, updateNote, deleteNote, filter } = useNotesStore();
  const { addToast } = useUIStore();
  const [isLoading, setIsLoading] = useState(false);
  const [note, setNote] = useState<Note | null>(null);

  const fetchNotes = useCallback(async (params?: { page?: number; limit?: number; filter?: 'all' | 'favorites' | 'archived'; tag_id?: string }) => {
    setIsLoading(true);
    try {
      const data = await notesAPI.list(params);
      setNotes(data.notes);
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to fetch notes', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [setNotes, addToast]);

  const fetchNote = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const data = await notesAPI.get(id);
      setNote(data);
      return data;
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to fetch note', 'error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [addToast]);

  const createNote = useCallback(async (title: string, content?: string) => {
    try {
      const note = await notesAPI.create({ title, content });
      addNote(note);
      addToast('Note created', 'success');
      return note;
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to create note', 'error');
      throw error;
    }
  }, [addNote, addToast]);

  const updateNoteData = useCallback(async (id: string, updates: { title?: string; content?: string }) => {
    try {
      const note = await notesAPI.update(id, updates);
      updateNote(id, note);
      return note;
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to update note', 'error');
      throw error;
    }
  }, [updateNote, addToast]);

  const deleteNoteData = useCallback(async (id: string) => {
    try {
      await notesAPI.delete(id);
      deleteNote(id);
      addToast('Note deleted', 'success');
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to delete note', 'error');
      throw error;
    }
  }, [deleteNote, addToast]);

  const toggleFavorite = useCallback(async (id: string) => {
    try {
      const note = await notesAPI.toggleFavorite(id);
      updateNote(id, note);
      addToast(note.is_favorited ? 'Added to favorites' : 'Removed from favorites', 'success');
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to toggle favorite', 'error');
      throw error;
    }
  }, [updateNote, addToast]);

  const toggleArchive = useCallback(async (id: string) => {
    try {
      const note = await notesAPI.toggleArchive(id);
      updateNote(id, note);
      addToast(note.is_archived ? 'Note archived' : 'Note unarchived', 'success');
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to toggle archive', 'error');
      throw error;
    }
  }, [updateNote, addToast]);

  return {
    notes,
    note,
    isLoading,
    fetchNotes,
    fetchNote,
    createNote,
    updateNote: updateNoteData,
    deleteNote: deleteNoteData,
    toggleFavorite,
    toggleArchive,
    addTag: useCallback(async (noteId: string, tagId: string) => {
      try {
        const updatedNote = await notesAPI.addTag(noteId, tagId);
        // Update both list and current note if it matches
        updateNote(noteId, updatedNote);
        if (note?.id === noteId) {
          setNote(updatedNote);
        }
        addToast('Tag added', 'success');
      } catch (error: any) {
        addToast(error.response?.data?.message || 'Failed to add tag', 'error');
        throw error;
      }
    }, [updateNote, note, addToast]),

    removeTag: useCallback(async (noteId: string, tagId: string) => {
      try {
        const updatedNote = await notesAPI.removeTag(noteId, tagId);
        // Update both list and current note if it matches
        updateNote(noteId, updatedNote);
        if (note?.id === noteId) {
          setNote(updatedNote);
        }
        addToast('Tag removed', 'success');
      } catch (error: any) {
        addToast(error.response?.data?.message || 'Failed to remove tag', 'error');
        throw error;
      }
    }, [updateNote, note, addToast]),
  };
}
