'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createTagSchema } from '@/lib/utils/validation';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

type CreateTagFormValues = z.infer<typeof createTagSchema>;

interface CreateTagDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string) => Promise<void>;
}

export function CreateTagDialog({
  isOpen,
  onClose,
  onConfirm,
}: CreateTagDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTagFormValues>({
    resolver: zodResolver(createTagSchema),
  });

  const onSubmit = async (values: CreateTagFormValues) => {
    setIsSubmitting(true);
    try {
      await onConfirm(values.name);
      reset();
      onClose();
    } catch (error) {
      console.error('Failed to create tag:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create Tag">
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
          <Button variant="ghost" onClick={handleClose} type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Tag'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
