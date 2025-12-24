'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';
import { ROUTES } from '@/lib/utils/constants';
import { LoadingState } from '@/components/shared/LoadingState';

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check authentication status
    if (!isAuthenticated) {
      const redirectUrl = `${ROUTES.LOGIN}?redirect=${encodeURIComponent(pathname)}`;
      router.replace(redirectUrl);
    } else {
      setIsChecking(false);
    }
  }, [isAuthenticated, router, pathname]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <LoadingState message="Verifying authentication..." />
      </div>
    );
  }

  return <>{children}</>;
}
