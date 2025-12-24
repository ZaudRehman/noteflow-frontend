'use client';

import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

interface DeleteTagDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  tagName: string;
  noteCount: number;
}

export function DeleteTagDialog({
  isOpen,
  onClose,
  onConfirm,
  tagName,
  noteCount,
}: DeleteTagDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Tag">
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-300">
              Are you sure you want to delete the tag{' '}
              <span className="font-sans-semibold text-pastel-lavender">
                &quot;{tagName}&quot;
              </span>
              ?
            </p>
            {noteCount > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                This tag is currently used by {noteCount}{' '}
                {noteCount === 1 ? 'note' : 'notes'}. The tag will be removed
                from all notes.
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete Tag
          </Button>
        </div>
      </div>
    </Modal>
  );
}
