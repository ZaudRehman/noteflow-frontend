'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useNotes } from '@/lib/hooks/useNotes';
import { useWebSocket } from '@/lib/hooks/useWebSocket';
import { ROUTES } from '@/lib/utils/constants';
import { Button } from '@/components/ui/Button';
import { NoteEditor } from '@/components/notes/NoteEditor';
import { NotePreview } from '@/components/notes/NotePreview';
import { NoteToolbar } from '@/components/notes/NoteToolbar';
import { ActiveUsers } from '@/components/notes/ActiveUsers';
import { TagSelector } from '@/components/tags/TagSelector';
import { LoadingState } from '@/components/shared/LoadingState';
import { DeleteNoteDialog } from '@/components/notes/DeleteNoteDialog';
import { useTags } from '@/lib/hooks/useTags';

export default function NoteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const noteId = params.id as string;

  const { note, isLoading, fetchNote, updateNote, toggleFavorite, toggleArchive, deleteNote, addTag, removeTag } = useNotes();
  const { tags, fetchTags, createTag } = useTags();
  const { activeUsers, sendContentUpdate } = useWebSocket(noteId);

  const [showPreview, setShowPreview] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    fetchNote(noteId);
    fetchTags();
  }, [noteId, fetchTags, fetchNote]);

  useEffect(() => {
    if (note?.tags && tags.length > 0) {
      // Robustly map note tags (which could be names or IDs) to available tag IDs
      const tagIds = tags
        .filter((t) => note.tags?.includes(t.name) || note.tags?.includes(t.id))
        .map((t) => t.id);

      // Only update if different to avoid cycles
      if (JSON.stringify(tagIds.sort()) !== JSON.stringify(selectedTags.sort())) {
        setSelectedTags(tagIds);
      }
    }
  }, [note, tags]);

  const handleSave = useCallback(async (title: string, content: string) => {
    if (!note) return;
    await updateNote(note.id, { title, content });
  }, [note, updateNote]);

  const handleDelete = async () => {
    if (!note) return;
    await deleteNote(note.id);
    router.push(ROUTES.NOTES);
  };

  const handleTagSelect = async (tagId: string) => {
    if (!note) return;
    setSelectedTags([...selectedTags, tagId]);
    await addTag(note.id, tagId);
  };

  const handleTagDeselect = async (tagId: string) => {
    if (!note) return;
    setSelectedTags(selectedTags.filter((id) => id !== tagId));
    await removeTag(note.id, tagId);
  };

  const handleCreateTag = async (name: string) => {
    await createTag(name);
    await fetchTags();
  };

  if (isLoading || !note) {
    return <LoadingState message="Loading note..." />;
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push(ROUTES.NOTES)}
        className="gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Notes
      </Button>

      {/* Active users */}
      {activeUsers.length > 0 && (
        <ActiveUsers users={activeUsers} className="mb-4" />
      )}

      {/* Toolbar */}
      <NoteToolbar
        isFavorited={note.is_favorited}
        isArchived={note.is_archived}
        onFavorite={() => toggleFavorite(note.id)}
        onArchive={() => toggleArchive(note.id)}
        onDelete={() => setIsDeleting(true)}
        showPreview={showPreview}
        onTogglePreview={() => setShowPreview(!showPreview)}
      />

      {/* Tags */}
      <div className="bg-dark-surface rounded-xl shadow-neu-sm p-4">
        <h3 className="text-sm font-sans-semibold text-gray-300 mb-3">Tags</h3>
        <TagSelector
          availableTags={tags}
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
          onTagDeselect={handleTagDeselect}
          onCreateTag={handleCreateTag}
        />
      </div>

      {/* Editor / Preview */}
      <div className="bg-dark-surface rounded-2xl shadow-neu-md p-6">
        {showPreview ? (
          <NotePreview content={note.content || ''} />
        ) : (
          <NoteEditor
            noteId={note.id}
            initialTitle={note.title}
            initialContent={note.content || ''}
            onSave={handleSave}
            autoSave
          />
        )}
      </div>

      {/* Delete dialog */}
      <DeleteNoteDialog
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={handleDelete}
        noteTitle={note.title}
      />
    </div>
  );
}
