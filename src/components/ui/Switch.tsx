'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className="flex items-center space-x-3 cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only peer"
            ref={ref}
            {...props}
          />
          <div
            className={cn(
              'w-11 h-6 bg-dark-elevated rounded-full shadow-neu-inset',
              'peer-checked:bg-pastel-lavender transition-all duration-200'
            )}
          />
          <div
            className={cn(
              'absolute left-1 top-1 w-4 h-4 bg-gray-100 rounded-full shadow-neu-sm transition-all duration-200',
              'peer-checked:translate-x-5 peer-checked:bg-dark-bg'
            )}
          />
        </div>
        {label && <span className="text-sm text-gray-300">{label}</span>}
      </label>
    );
  }
);

Switch.displayName = 'Switch';
