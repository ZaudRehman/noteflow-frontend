'use client';

import { ConfirmDialog } from '@/components/shared/ConfirmDialog';

interface DeleteNoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  noteTitle?: string;
}

export function DeleteNoteDialog({
  isOpen,
  onClose,
  onConfirm,
  noteTitle = 'this note',
}: DeleteNoteDialogProps) {
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Note"
      message={`Are you sure you want to delete "${noteTitle}"? This action cannot be undone.`}
      confirmText="Delete"
      cancelText="Cancel"
      variant="danger"
    />
  );
}
