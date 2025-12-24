'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className="flex items-center space-x-3 cursor-pointer">
        <div className="relative">
          <input
            type="radio"
            className="sr-only peer"
            ref={ref}
            {...props}
          />
          <div
            className={cn(
              'w-5 h-5 bg-dark-elevated rounded-full shadow-neu-inset border border-dark-border',
              'peer-checked:border-pastel-lavender transition-all'
            )}
          />
          <div
            className={cn(
              'absolute inset-0 m-auto w-3 h-3 bg-pastel-lavender rounded-full opacity-0',
              'peer-checked:opacity-100 transition-opacity'
            )}
          />
        </div>
        {label && <span className="text-sm text-gray-300">{label}</span>}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
