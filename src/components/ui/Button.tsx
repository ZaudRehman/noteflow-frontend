import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-sans-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-pastel-lavender text-dark-bg shadow-neu-sm hover:shadow-neu-md active:shadow-neu-inset',
        secondary: 'bg-dark-surface text-gray-100 shadow-neu-sm hover:shadow-neu-md active:shadow-neu-inset',
        ghost: 'bg-transparent text-gray-100 hover:bg-dark-surface',
        danger: 'bg-red-500 text-white shadow-neu-sm hover:shadow-neu-md active:shadow-neu-inset',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
