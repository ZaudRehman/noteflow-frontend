'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react';
import type { Note } from '@/lib/types/models';
import { useTags } from '@/lib/hooks/useTags';
import { useNotes } from '@/lib/hooks/useNotes';
import { ROUTES } from '@/lib/utils/constants';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { NoteGrid } from '@/components/notes/NoteGrid';
import { LoadingState } from '@/components/shared/LoadingState';
import { EditTagDialog } from '@/components/tags/EditTagDialog';
import { DeleteTagDialog } from '@/components/tags/DeleteTagDialog';

export default function TagDetailPage() {
  const params = useParams();
  const router = useRouter();
  const tagId = params.id as string;

  const { tag, tagNotes, isLoading: isLoadingTag, fetchTag, updateTag, deleteTag } = useTags();
  const { toggleFavorite, toggleArchive, deleteNote } = useNotes();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    fetchTag(tagId);
  }, [tagId]);

  const handleUpdateTag = async (name: string) => {
    await updateTag(tagId, { name });
    await fetchTag(tagId);
    setIsEditOpen(false);
  };

  const handleDeleteTag = async () => {
    await deleteTag(tagId);
    router.push(ROUTES.TAGS);
  };

  if (isLoadingTag || !tag) {
    return <LoadingState message="Loading tag..." />;
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push(ROUTES.TAGS)}
        className="gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Tags
      </Button>

      {/* Tag header */}
      <div className="bg-dark-surface rounded-2xl shadow-neu-md p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-display-bold text-gray-100 mb-2">
              {tag.name}
            </h1>
            <div className="flex items-center gap-2">
              <Badge variant="primary">
                {tag.note_count} {tag.note_count === 1 ? 'note' : 'notes'}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsEditOpen(true)}
              className="gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setIsDeleteOpen(true)}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          Created on {new Date(tag.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* Notes with this tag */}
      <div>
        <h2 className="text-xl font-sans-semibold text-gray-100 mb-4">
          Notes with this tag
        </h2>
        <NoteGrid
          notes={tagNotes}
          onFavorite={toggleFavorite}
          onArchive={toggleArchive}
          onDelete={deleteNote}
          emptyTitle="No notes with this tag"
          emptyDescription="Add this tag to notes to see them here."
        />
      </div>

      {/* Edit dialog */}
      <EditTagDialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onConfirm={handleUpdateTag}
        initialName={tag.name}
      />

      {/* Delete dialog */}
      <DeleteTagDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteTag}
        tagName={tag.name}
        noteCount={tag.note_count}
      />
    </div>
  );
}
