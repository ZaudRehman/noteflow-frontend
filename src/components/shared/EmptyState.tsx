import { ReactNode } from 'react';
import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-12',
        className
      )}
    >
      <div className="w-16 h-16 bg-dark-elevated rounded-full flex items-center justify-center mb-4 shadow-neu-sm">
        {icon || <FileText className="w-8 h-8 text-gray-500" />}
      </div>
      <h3 className="text-lg font-sans-semibold text-gray-300 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 mb-6 max-w-sm">{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
