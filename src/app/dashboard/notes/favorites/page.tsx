'use client';

import { useEffect, useState } from 'react';
import type { Note } from '@/lib/types/models';
import { useNotes } from '@/lib/hooks/useNotes';
import { NoteGrid } from '@/components/notes/NoteGrid';
import { LoadingState } from '@/components/shared/LoadingState';
import { CreateNoteButton } from '@/components/notes/CreateNoteButton';

export default function FavoritesPage() {
  const { notes, isLoading, fetchNotes, toggleFavorite, toggleArchive, deleteNote } = useNotes();
  const [favoriteNotes, setFavoriteNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  useEffect(() => {
    setFavoriteNotes(notes.filter((note) => note.is_favorited));
  }, [notes]);

  if (isLoading) {
    return <LoadingState message="Loading favorites..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display-bold text-gray-100">Favorites</h1>
        <p className="text-gray-400 mt-1">
          {favoriteNotes.length} {favoriteNotes.length === 1 ? 'note' : 'notes'}
        </p>
      </div>

      {/* Notes grid */}
      <NoteGrid
        notes={favoriteNotes}
        onFavorite={toggleFavorite}
        onArchive={toggleArchive}
        onDelete={deleteNote}
        emptyTitle="No favorites yet"
        emptyDescription="Star notes to add them to your favorites."
        emptyAction={<CreateNoteButton variant="button" />}
      />

      <CreateNoteButton />
    </div>
  );
}
