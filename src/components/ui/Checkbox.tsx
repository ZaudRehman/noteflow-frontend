'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
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
              'w-5 h-5 bg-dark-elevated rounded shadow-neu-inset border border-dark-border',
              'peer-checked:bg-pastel-lavender peer-checked:border-pastel-lavender transition-all'
            )}
          />
          <Check
            className={cn(
              'absolute inset-0 m-auto w-4 h-4 text-dark-bg opacity-0 peer-checked:opacity-100 transition-opacity'
            )}
          />
        </div>
        {label && <span className="text-sm text-gray-300">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
