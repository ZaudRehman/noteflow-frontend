'use client';

import { useEffect, useState } from 'react';
import type { Note } from '@/lib/types/models';
import { useNotes } from '@/lib/hooks/useNotes';
import { NoteGrid } from '@/components/notes/NoteGrid';
import { NoteList } from '@/components/notes/NoteList';
import { NoteFilters } from '@/components/notes/NoteFilters';
import { LoadingState } from '@/components/shared/LoadingState';
import { CreateNoteButton } from '@/components/notes/CreateNoteButton';
import { DeleteNoteDialog } from '@/components/notes/DeleteNoteDialog';

export default function NotesPage() {
  const {
    notes,
    isLoading,
    fetchNotes,
    toggleFavorite,
    toggleArchive,
    deleteNote,
  } = useNotes();

  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'created' | 'updated' | 'title'>('updated');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [deletingNote, setDeletingNote] = useState<Note | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    let filtered = notes.filter((note) => !note.is_archived);

    // Sort notes
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'created':
          comparison =
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        case 'updated':
          comparison =
            new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredNotes(filtered);
  }, [notes, sortBy, sortOrder]);

  const handleSortChange = (
    newSortBy: 'created' | 'updated' | 'title',
    newSortOrder: 'asc' | 'desc'
  ) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleDelete = async () => {
    if (!deletingNote) return;
    await deleteNote(deletingNote.id);
    setDeletingNote(null);
  };

  if (isLoading) {
    return <LoadingState message="Loading your notes..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display-bold text-gray-100">All Notes</h1>
          <p className="text-gray-400 mt-1">
            {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
          </p>
        </div>

        <CreateNoteButton variant="button" />
      </div>

      {/* Filters */}
      <NoteFilters
        view={view}
        onViewChange={setView}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />

      {/* Notes display */}
      {view === 'grid' ? (
        <NoteGrid
          notes={filteredNotes}
          onFavorite={toggleFavorite}
          onArchive={toggleArchive}
          onDelete={(id) => {
            const note = notes.find((n) => n.id === id);
            if (note) setDeletingNote(note);
          }}
          emptyAction={<CreateNoteButton variant="button" />}
        />
      ) : (
        <NoteList
          notes={filteredNotes}
          onFavorite={toggleFavorite}
          onArchive={toggleArchive}
          onDelete={(id) => {
            const note = notes.find((n) => n.id === id);
            if (note) setDeletingNote(note);
          }}
          emptyAction={<CreateNoteButton variant="button" />}
        />
      )}

      {/* Delete confirmation */}
      {deletingNote && (
        <DeleteNoteDialog
          isOpen={!!deletingNote}
          onClose={() => setDeletingNote(null)}
          onConfirm={handleDelete}
          noteTitle={deletingNote.title}
        />
      )}

      {/* Floating action button */}
      <CreateNoteButton />
    </div>
  );
}
