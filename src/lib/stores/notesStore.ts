import { create } from 'zustand';
import type { Note } from '@/lib/types/models';

interface NotesState {
  notes: Note[];
  activeNote: Note | null;
  filter: 'all' | 'favorites' | 'archived';
  setNotes: (notes: Note[]) => void;
  addNote: (note: Note) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  setActiveNote: (note: Note | null) => void;
  setFilter: (filter: 'all' | 'favorites' | 'archived') => void;
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  activeNote: null,
  filter: 'all',

  setNotes: (notes) => set({ notes }),

  addNote: (note) =>
    set((state) => ({
      notes: [note, ...state.notes],
    })),

  updateNote: (id, updates) =>
    set((state) => ({
      notes: state.notes.map((n) => (n.id === id ? { ...n, ...updates } : n)),
      activeNote: state.activeNote?.id === id ? { ...state.activeNote, ...updates } : state.activeNote,
    })),

  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
      activeNote: state.activeNote?.id === id ? null : state.activeNote,
    })),

  setActiveNote: (note) => set({ activeNote: note }),

  setFilter: (filter) => set({ filter }),
}));
