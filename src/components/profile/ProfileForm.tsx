'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { updateProfileSchema } from '@/lib/utils/validation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { useAuthStore } from '@/lib/stores/authStore';

type ProfileFormValues = z.infer<typeof updateProfileSchema>;

interface ProfileFormProps {
  onSubmit: (values: ProfileFormValues) => Promise<void>;
}

export function ProfileForm({ onSubmit }: ProfileFormProps) {
  const { user } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      display_name: user?.display_name || '',
      avatar_url: user?.avatar_url || '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Avatar preview */}
      <div className="flex items-center space-x-4">
        <Avatar
          src={user?.avatar_url || undefined}
          name={user?.display_name || 'User'}
          size="lg"
        />
        <div>
          <h3 className="text-sm font-sans-medium text-gray-300">
            Profile Picture
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Upload a new avatar by entering an image URL
          </p>
        </div>
      </div>

      {/* Display name */}
      <div>
        <label className="block text-sm font-sans-medium text-gray-300 mb-2">
          Display name
        </label>
        <Input
          placeholder="Your name"
          {...register('display_name')}
          error={errors.display_name?.message}
        />
      </div>

      {/* Email (read-only) */}
      <div>
        <label className="block text-sm font-sans-medium text-gray-300 mb-2">
          Email address
        </label>
        <Input
          type="email"
          value={user?.email || ''}
          disabled
          className="bg-dark-elevated cursor-not-allowed"
        />
        <p className="text-xs text-gray-500 mt-1">
          Email cannot be changed at this time
        </p>
      </div>

      {/* Avatar URL */}
      <div>
        <label className="block text-sm font-sans-medium text-gray-300 mb-2">
          Avatar URL
        </label>
        <Input
          type="url"
          placeholder="https://example.com/avatar.jpg"
          {...register('avatar_url')}
          error={errors.avatar_url?.message}
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter a URL to an image you&apos;d like to use as your avatar
        </p>
      </div>

      {/* Submit button */}
      <div className="flex items-center justify-end space-x-3 pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}
