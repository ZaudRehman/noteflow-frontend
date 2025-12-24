import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          className={cn(
            'w-full bg-dark-bg rounded-xl shadow-neu-inset px-4 py-3',
            'focus:shadow-neu-sm focus:outline-none focus:ring-2 focus:ring-pastel-lavender/30',
            'transition-all duration-200 text-gray-100 placeholder-gray-500',
            error && 'ring-2 ring-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
