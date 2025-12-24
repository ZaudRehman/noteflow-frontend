import type { Metadata } from 'next';
import Link from 'next/link';
import { LoginForm } from '@/components/auth/LoginForm';
import { ROUTES } from '@/lib/utils/constants';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your Noteflow account',
};

export default function LoginPage() {
  return (
    <div className="bg-dark-surface rounded-2xl shadow-neu-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display-bold text-gray-100 mb-2">
          Welcome back
        </h1>
        <p className="text-gray-400">
          Enter your credentials to access your notes
        </p>
      </div>

      <LoginForm />

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link
            href={ROUTES.REGISTER}
            className="text-pastel-lavender hover:text-pastel-mint transition-colors font-sans-medium"
          >
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
}
