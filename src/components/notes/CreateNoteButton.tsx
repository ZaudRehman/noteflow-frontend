'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useNotes } from '@/lib/hooks/useNotes';
import { ROUTES } from '@/lib/utils/constants';
import { cn } from '@/lib/utils/cn';

interface CreateNoteButtonProps {
  variant?: 'fab' | 'button';
  className?: string;
}

export function CreateNoteButton({
  variant = 'fab',
  className,
}: CreateNoteButtonProps) {
  const router = useRouter();
  const { createNote } = useNotes();

  const handleCreate = async () => {
    try {
      const note = await createNote('Untitled Note', '');
      router.push(ROUTES.NOTE_DETAIL(note.id));
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  if (variant === 'fab') {
    return (
      <button
        onClick={handleCreate}
        className={cn(
          'fixed bottom-20 right-6 lg:bottom-6 w-14 h-14 bg-pastel-lavender rounded-full shadow-neu-lg hover:shadow-neu-md active:shadow-neu-inset transition-all duration-200 flex items-center justify-center text-dark-bg z-30',
          className
        )}
        aria-label="Create new note"
      >
        <Plus className="w-6 h-6" />
      </button>
    );
  }

  return (
    <Button onClick={handleCreate} className={cn('gap-2', className)}>
      <Plus className="w-4 h-4" />
      <span>New Note</span>
    </Button>
  );
}
