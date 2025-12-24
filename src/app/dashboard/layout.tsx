'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useAuthStore } from '@/lib/stores/authStore';
import { useAuth } from '@/lib/hooks/useAuth';
import { ROUTES } from '@/lib/utils/constants';
import { LoadingState } from '@/components/shared/LoadingState';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, accessToken, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!accessToken || !isAuthenticated) {
      router.push(`${ROUTES.LOGIN}?redirect=${encodeURIComponent('/dashboard')}`);
    }
  }, [accessToken, isAuthenticated, router]);

  if (!accessToken || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <LoadingState message="Loading your dashboard..." />
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-dark-bg">
        <Header />
        
        <div className="flex-1 flex">
          <Sidebar />
          
          <main className="flex-1 overflow-auto pb-20 lg:pb-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
        </div>

        <MobileNav />
      </div>
    </AuthGuard>
  );
}
