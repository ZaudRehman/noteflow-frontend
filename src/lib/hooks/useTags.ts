import { useState, useCallback } from 'react';
import { tagsAPI } from '@/lib/api/tags';
import { useTagsStore } from '@/lib/stores/tagsStore';
import { useUIStore } from '@/lib/stores/uiStore';

import type { Tag, Note } from '@/lib/types/models';

export function useTags() {
  const { tags, setTags, addTag, updateTag, deleteTag } = useTagsStore();
  const { addToast } = useUIStore();
  const [isLoading, setIsLoading] = useState(false);
  const [tag, setTag] = useState<Tag | null>(null);
  const [tagNotes, setTagNotes] = useState<Note[]>([]);

  const fetchTags = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await tagsAPI.list();
      setTags(data.tags);
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to fetch tags', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [setTags, addToast]);

  const fetchTag = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const [tagData, notesData] = await Promise.all([
        tagsAPI.get(id),
        tagsAPI.getNotes(id)
      ]);
      setTag(tagData);
      setTagNotes(notesData.notes);
      return { tag: tagData, notes: notesData.notes };
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to fetch tag details', 'error');
      // If the tag fetch fails (e.g. 404), we should probably let the component know or redirect
    } finally {
      setIsLoading(false);
    }
  }, [addToast]);

  const createTag = useCallback(async (name: string) => {
    try {
      const tag = await tagsAPI.create({ name });
      addTag(tag);
      addToast('Tag created', 'success');
      return tag;
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to create tag', 'error');
      throw error;
    }
  }, [addTag, addToast]);

  const updateTagData = useCallback(async (id: string, data: { name: string }) => {
    try {
      const tag = await tagsAPI.update(id, data);
      updateTag(id, tag);
      addToast('Tag updated', 'success');
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to update tag', 'error');
      throw error;
    }
  }, [updateTag, addToast]);

  const deleteTagData = useCallback(async (id: string) => {
    try {
      await tagsAPI.delete(id);
      deleteTag(id);
      addToast('Tag deleted', 'success');
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to delete tag', 'error');
      throw error;
    }
  }, [deleteTag, addToast]);

  const addTagToNote = useCallback(async (noteId: string, tagId: string) => {
    try {
      await tagsAPI.addToNote(noteId, tagId);
      addToast('Tag added to note', 'success');
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to add tag', 'error');
      throw error;
    }
  }, [addToast]);

  const removeTagFromNote = useCallback(async (noteId: string, tagId: string) => {
    try {
      await tagsAPI.removeFromNote(noteId, tagId);
      addToast('Tag removed from note', 'success');
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to remove tag', 'error');
      throw error;
    }
  }, [addToast]);

  return {
    tags,
    tag,
    tagNotes,
    isLoading,
    fetchTags,
    fetchTag,
    createTag,
    updateTag: updateTagData,
    deleteTag: deleteTagData,
    addTagToNote,
    removeTagFromNote,
  };
}
