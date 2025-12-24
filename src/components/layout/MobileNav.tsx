'use client';

import { Home, FileText, Tag, Search, User } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/utils/constants';
import { cn } from '@/lib/utils/cn';

const navItems = [
  { href: ROUTES.DASHBOARD, label: 'Home', icon: Home },
  { href: ROUTES.NOTES, label: 'Notes', icon: FileText },
  { href: ROUTES.TAGS, label: 'Tags', icon: Tag },
  { href: ROUTES.SEARCH, label: 'Search', icon: Search },
  { href: ROUTES.PROFILE, label: 'Profile', icon: User },
];

export function MobileNav() {
  const router = useRouter();
  const pathname = usePathname();

  // Don't show on auth pages
  const isAuthPage = [
    ROUTES.LOGIN,
    ROUTES.REGISTER,
    ROUTES.FORGOT_PASSWORD,
    ROUTES.RESET_PASSWORD,
    '/',
  ].includes(pathname);

  if (isAuthPage) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-dark-elevated border-t border-dark-border shadow-neu-lg lg:hidden">
      <div className="flex items-center justify-around px-2 py-2 safe-area-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={cn(
                'flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-xl transition-all min-w-0 flex-1',
                isActive
                  ? 'text-pastel-lavender bg-pastel-lavender/10'
                  : 'text-gray-500 hover:text-gray-300'
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-xs font-sans-medium truncate">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
