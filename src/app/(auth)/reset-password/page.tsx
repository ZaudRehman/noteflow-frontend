import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { LoadingState } from '@/components/shared/LoadingState';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Set a new password for your Noteflow account',
};

export default function ResetPasswordPage() {
  return (
    <div className="bg-dark-surface rounded-2xl shadow-neu-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display-bold text-gray-100 mb-2">
          Set new password
        </h1>
        <p className="text-gray-400">
          Choose a strong password for your account
        </p>
      </div>

      <Suspense fallback={<LoadingState />}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
