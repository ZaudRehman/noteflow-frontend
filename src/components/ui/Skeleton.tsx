import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-dark-elevated',
        className
      )}
      {...props}
    />
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4"
          style={{ width: `${((i * 7) % 31) + 65}%` }}
        />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-dark-surface rounded-2xl shadow-neu-md p-6 space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <SkeletonText lines={3} />
    </div>
  );
}
