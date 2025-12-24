import type { Metadata } from 'next';
import Link from 'next/link';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { ROUTES } from '@/lib/utils/constants';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create a new Noteflow account',
};

export default function RegisterPage() {
  return (
    <div className="bg-dark-surface rounded-2xl shadow-neu-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display-bold text-gray-100 mb-2">
          Create your account
        </h1>
        <p className="text-gray-400">
          Start taking notes and collaborating today
        </p>
      </div>

      <RegisterForm />

      
    </div>
  );
}
