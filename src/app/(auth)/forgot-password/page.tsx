import type { Metadata } from 'next';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your Noteflow password',
};

export default function ForgotPasswordPage() {
  return (
    <div className="bg-dark-surface rounded-2xl shadow-neu-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display-bold text-gray-100 mb-2">
          Reset your password
        </h1>
        <p className="text-gray-400">
          We&apos;ll send you a link to reset your password
        </p>
      </div>

      <ForgotPasswordForm />
    </div>
  );
}
