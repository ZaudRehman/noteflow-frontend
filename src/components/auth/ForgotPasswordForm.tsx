'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '@/lib/utils/validation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/lib/utils/constants';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/hooks/useAuth';

type ForgotFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [emailSent, setEmailSent] = useState(false);
  const { forgotPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (values: ForgotFormValues) => {
    try {
      await forgotPassword(values.email);
      setEmailSent(true);
    } catch (error) {
      // Error handled by useAuth hook (toast)
    }
  };

  if (emailSent) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-pastel-mint/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-pastel-mint"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h3 className="text-xl font-sans-semibold text-gray-100">
          Check your email
        </h3>
        <p className="text-sm text-gray-400">
          We&apos;ve sent a password reset link to{' '}
          <span className="text-pastel-lavender font-sans-medium">
            {getValues('email')}
          </span>
        </p>

        <Button
          variant="ghost"
          onClick={() => setEmailSent(false)}
          className="mt-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to form
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        <p className="mt-2 text-xs text-gray-500">
          Enter the email address associated with your account and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send reset link'}
      </Button>

      <Link
        href={ROUTES.LOGIN}
        className="flex items-center justify-center text-sm text-pastel-lavender hover:text-pastel-mint transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to login
      </Link>
    </form>
  );
}
