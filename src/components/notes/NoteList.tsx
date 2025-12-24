import type { Note } from '@/lib/types/models';
import { NoteCard } from './NoteCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { FileText } from 'lucide-react';

interface NoteListProps {
  notes: Note[];
  onFavorite?: (id: string) => void;
  onArchive?: (id: string) => void;
  onDelete?: (id: string) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: React.ReactNode;
}

export function NoteList({
  notes,
  onFavorite,
  onArchive,
  onDelete,
  emptyTitle = 'No notes yet',
  emptyDescription = 'Create your first note to get started.',
  emptyAction,
}: NoteListProps) {
  if (notes.length === 0) {
    return (
      <EmptyState
        icon={<FileText className="w-8 h-8 text-gray-500" />}
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
      />
    );
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onFavorite={onFavorite}
          onArchive={onArchive}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
