'use client';

import { useEffect, useState } from 'react';
import type { Note } from '@/lib/types/models';
import { useNotes } from '@/lib/hooks/useNotes';
import { NoteGrid } from '@/components/notes/NoteGrid';
import { LoadingState } from '@/components/shared/LoadingState';

export default function ArchivedPage() {
  const { notes, isLoading, fetchNotes, toggleFavorite, toggleArchive, deleteNote } = useNotes();
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  useEffect(() => {
    setArchivedNotes(notes.filter((note) => note.is_archived));
  }, [notes]);

  if (isLoading) {
    return <LoadingState message="Loading archived notes..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display-bold text-gray-100">Archived Notes</h1>
        <p className="text-gray-400 mt-1">
          {archivedNotes.length} {archivedNotes.length === 1 ? 'note' : 'notes'}
        </p>
      </div>

      {/* Notes grid */}
      <NoteGrid
        notes={archivedNotes}
        onFavorite={toggleFavorite}
        onArchive={toggleArchive}
        onDelete={deleteNote}
        emptyTitle="No archived notes"
        emptyDescription="Archive notes to declutter your workspace without deleting them."
      />
    </div>
  );
}
