import { LoadingState } from '@/components/shared/LoadingState';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg">
      <LoadingState message="Loading..." />
    </div>
  );
}
