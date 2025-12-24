import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface TagChipProps {
  name: string;
  count?: number;
  onRemove?: () => void;
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md';
  className?: string;
}

export function TagChip({
  name,
  count,
  onRemove,
  variant = 'primary',
  size = 'md',
  className,
}: TagChipProps) {
  const variantClasses = {
    default: 'bg-dark-elevated text-gray-300 hover:bg-dark-border',
    primary: 'bg-pastel-lavender/10 text-pastel-lavender hover:bg-pastel-lavender/20',
    secondary: 'bg-pastel-mint/10 text-pastel-mint hover:bg-pastel-mint/20',
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-sans-medium transition-colors',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      <span className="truncate">{name}</span>
      {count !== undefined && (
        <span className="opacity-60 text-xs">({count})</span>
      )}
      {onRemove && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove();
          }}
          className="hover:bg-black/20 rounded-full p-0.5 transition-colors"
          aria-label={`Remove ${name} tag`}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}
