'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createTagSchema } from '@/lib/utils/validation';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

type EditTagFormValues = z.infer<typeof createTagSchema>;

interface EditTagDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string) => Promise<void>;
  initialName: string;
}

export function EditTagDialog({
  isOpen,
  onClose,
  onConfirm,
  initialName,
}: EditTagDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTagFormValues>({
    resolver: zodResolver(createTagSchema),
    defaultValues: { name: initialName },
  });

  const onSubmit = async (values: EditTagFormValues) => {
    setIsSubmitting(true);
    try {
      await onConfirm(values.name);
      onClose();
    } catch (error) {
      console.error('Failed to update tag:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Tag">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-sans-medium text-gray-300 mb-2">
            Tag name
          </label>
          <Input
            placeholder="e.g., Work, Personal, Ideas"
            autoFocus
            {...register('name')}
            error={errors.name?.message}
          />
        </div>

        <div className="flex items-center justify-end space-x-3 pt-4">
          <Button variant="ghost" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
