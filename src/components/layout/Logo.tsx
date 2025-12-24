import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

interface LogoProps {
  className?: string;
  showIcon?: boolean;
}

export function Logo({ className, showIcon = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn('flex items-center space-x-2', className)}
    >
      {showIcon && (
        <div className="w-8 h-8 bg-gradient-to-br from-pastel-lavender to-pastel-mint rounded-lg shadow-neu-sm flex items-center justify-center">
          <span className="text-dark-bg font-display-bold text-lg">N</span>
        </div>
      )}
      <span className="text-2xl font-display-bold bg-gradient-to-r from-pastel-lavender via-pastel-mint to-pastel-peach bg-clip-text text-transparent tracking-tight">
        Noteflow
      </span>
    </Link>
  );
}
