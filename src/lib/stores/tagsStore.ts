import { create } from 'zustand';
import type { Tag } from '@/lib/types/models';

interface TagsState {
  tags: Tag[];
  selectedTags: string[];
  setTags: (tags: Tag[]) => void;
  addTag: (tag: Tag) => void;
  updateTag: (id: string, updates: Partial<Tag>) => void;
  deleteTag: (id: string) => void;
  toggleTagSelection: (tagId: string) => void;
  clearSelection: () => void;
}

export const useTagsStore = create<TagsState>((set) => ({
  tags: [],
  selectedTags: [],

  setTags: (tags) => set({ tags }),

  addTag: (tag) =>
    set((state) => ({
      tags: [...state.tags, tag],
    })),

  updateTag: (id, updates) =>
    set((state) => ({
      tags: state.tags.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),

  deleteTag: (id) =>
    set((state) => ({
      tags: state.tags.filter((t) => t.id !== id),
      selectedTags: state.selectedTags.filter((tId) => tId !== id),
    })),

  toggleTagSelection: (tagId) =>
    set((state) => ({
      selectedTags: state.selectedTags.includes(tagId)
        ? state.selectedTags.filter((id) => id !== tagId)
        : [...state.selectedTags, tagId],
    })),

  clearSelection: () => set({ selectedTags: [] }),
}));
