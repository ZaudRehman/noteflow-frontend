'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/lib/utils/validation';
import { z } from 'zod';
import Link from 'next/link';
import { ROUTES } from '@/lib/utils/constants';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/hooks/useAuth';

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await registerUser(values.email, values.password, values.display_name);
    } catch (error) {
      // Error handled by useAuth hook (toast)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="display_name"
          className="block text-sm font-sans-medium text-gray-300 mb-2"
        >
          Display name
        </label>
        <Input
          id="display_name"
          type="text"
          placeholder="John Doe"
          autoComplete="name"
          {...register('display_name')}
          error={errors.display_name?.message}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-sans-medium text-gray-300 mb-2"
        >
          Email address
        </label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          {...register('email')}
          error={errors.email?.message}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-sans-medium text-gray-300 mb-2"
        >
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          {...register('password')}
          error={errors.password?.message}
        />
        <p className="mt-1 text-xs text-gray-500">
          Must be at least 8 characters long
        </p>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Creating account...' : 'Create account'}
      </Button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link
          href={ROUTES.LOGIN}
          className="text-pastel-lavender hover:text-pastel-mint transition-colors font-sans-medium"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
