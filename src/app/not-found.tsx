import Link from 'next/link';
import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/utils/constants';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg p-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-dark-elevated rounded-full flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-8 h-8 text-gray-500" />
        </div>

        <h1 className="text-6xl font-display-bold text-gray-100 mb-3">404</h1>

        <p className="text-xl text-gray-400 mb-6">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <Link href={ROUTES.HOME}>
          <Button>Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
}
