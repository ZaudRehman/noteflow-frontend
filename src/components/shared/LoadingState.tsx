import { Spinner } from '@/components/ui/Spinner';
import { cn } from '@/lib/utils/cn';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({ message, className }: LoadingStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-12',
        className
      )}
    >
      <Spinner size="lg" className="mb-4" />
      {message && <p className="text-sm text-gray-500">{message}</p>}
    </div>
  );
}
