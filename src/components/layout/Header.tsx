'use client';

import { useState } from 'react';
import { Search, Bell, Menu, Settings, LogOut } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { ROUTES } from '@/lib/utils/constants';
import { useAuthStore } from '@/lib/stores/authStore';
import { useUIStore } from '@/lib/stores/uiStore';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import { NotificationDropdown } from '@/components/notifications/NotificationDropdown';
import { Logo } from './Logo';
import { cn } from '@/lib/utils/cn';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuthStore();
  const { logout } = useAuth();
  const { toggleSidebar, isSidebarOpen } = useUIStore();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`${ROUTES.SEARCH}?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  // Don't show header on public auth pages
  const isAuthPage = [
    ROUTES.LOGIN,
    ROUTES.REGISTER,
    ROUTES.FORGOT_PASSWORD,
    ROUTES.RESET_PASSWORD,
  ].includes(pathname as any);

  if (isAuthPage) return null;

  return (
    <header className="sticky top-0 z-40 bg-dark-elevated shadow-neu-lg border-b border-dark-border">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Menu toggle + Logo */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className="p-2"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-5 h-5" />
              </Button>
            )}
            <Logo className="hidden sm:flex" showIcon />
          </div>

          {/* Center - Search (only on dashboard) */}
          {isAuthenticated && (
            <form
              onSubmit={handleSearch}
              className="flex-1 max-w-md mx-4 hidden md:block"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-dark-bg rounded-full shadow-neu-inset pl-10 pr-4 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pastel-lavender/30 transition-all"
                />
              </div>
            </form>
          )}

          {/* Right side - Actions */}
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                {/* Notifications */}
                <NotificationDropdown />

                {/* User menu */}
                <Dropdown
                  align="right"
                  trigger={
                    <button className="flex items-center space-x-2 p-1 rounded-xl hover:bg-dark-surface transition-colors">
                      <Avatar
                        src={user?.avatar_url || undefined}
                        name={user?.display_name || 'User'}
                        size="sm"
                      />
                      <span className="hidden sm:block text-sm font-sans-medium text-gray-300">
                        {user?.display_name}
                      </span>
                    </button>
                  }
                >
                  <div className="px-4 py-3 border-b border-dark-border">
                    <p className="text-sm font-sans-medium text-gray-100">
                      {user?.display_name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>

                  <DropdownItem
                    onClick={() => router.push(ROUTES.PROFILE)}
                    className="flex items-center space-x-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </DropdownItem>

                  <DropdownItem
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-red-400 hover:bg-red-500/10"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </DropdownItem>
                </Dropdown>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(ROUTES.LOGIN)}
                  className="hidden sm:inline-flex"
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => router.push(ROUTES.REGISTER)}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
