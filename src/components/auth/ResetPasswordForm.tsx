'use client';

import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@/lib/utils/validation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/hooks/useAuth';

type ResetFormValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const { resetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token },
  });

  const onSubmit = async (values: ResetFormValues) => {
    try {
      await resetPassword(values.token, values.new_password);
    } catch (error) {
      // Error handled by useAuth hook (toast)
    }
  };

  if (!token) {
    return (
      <div className="text-center text-sm text-red-400">
        Invalid or missing reset token. Please request a new password reset
        link.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <input type="hidden" {...register('token')} />

      <div>
        <label
          htmlFor="new_password"
          className="block text-sm font-sans-medium text-gray-300 mb-2"
        >
          New password
        </label>
        <Input
          id="new_password"
          type="password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          {...register('new_password')}
          error={errors.new_password?.message}
        />
        <p className="mt-1 text-xs text-gray-500">
          Must be at least 8 characters long
        </p>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Resetting password...' : 'Reset password'}
      </Button>
    </form>
  );
}
