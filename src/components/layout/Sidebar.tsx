'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  FileText,
  Star,
  Archive,
  Tag,
  Search,
  User,
  X,
  Plus,
} from 'lucide-react';
import { useAuthStore } from '@/lib/stores/authStore';
import { useUIStore } from '@/lib/stores/uiStore';
import { useTagsStore } from '@/lib/stores/tagsStore';
import { useTags } from '@/lib/hooks/useTags';
import { ROUTES } from '@/lib/utils/constants';
import { Logo } from './Logo';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';

const mainNavItems = [
  { href: ROUTES.DASHBOARD, label: 'Dashboard', icon: Home },
  { href: ROUTES.NOTES, label: 'All Notes', icon: FileText },
  { href: ROUTES.FAVORITES, label: 'Favorites', icon: Star },
  { href: ROUTES.ARCHIVED, label: 'Archived', icon: Archive },
  { href: ROUTES.TAGS, label: 'Tags', icon: Tag },
  { href: ROUTES.SEARCH, label: 'Search', icon: Search },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { isSidebarOpen, setSidebarOpen } = useUIStore();
  const { tags } = useTagsStore();
  const { fetchTags } = useTags();

  useEffect(() => {
    fetchTags();
  }, []);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [pathname, setSidebarOpen]);

  // Close sidebar on outside click (mobile)
  useEffect(() => {
    if (!isSidebarOpen || window.innerWidth >= 1024) return;

    const handleClick = (e: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      if (sidebar && !sidebar.contains(e.target as Node)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isSidebarOpen, setSidebarOpen]);

  return (
    <>
      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={cn(
          'fixed inset-y-0 left-0 z-50 bg-dark-surface shadow-neu-lg transform transition-all duration-300 ease-in-out flex flex-col',
          // Mobile behavior: Slide in/out
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          // Desktop behavior: Static position, animate width
          'lg:translate-x-0 lg:static lg:inset-0',
          isSidebarOpen ? 'lg:w-72' : 'lg:w-0 lg:overflow-hidden'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-border w-72">
          <Logo showIcon />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-6 w-72">
          {/* Main navigation */}
          <div className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== ROUTES.DASHBOARD &&
                  pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 group',
                    isActive
                      ? 'bg-pastel-lavender/10 text-pastel-lavender shadow-neu-sm'
                      : 'text-gray-400 hover:bg-dark-elevated hover:text-gray-100'
                  )}
                >
                  <Icon
                    className={cn(
                      'w-5 h-5 flex-shrink-0',
                      isActive ? 'text-pastel-lavender' : 'text-gray-500'
                    )}
                  />
                  <span className="font-sans-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Quick Tags */}
          {tags.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3 px-3">
                <h3 className="text-xs font-sans-semibold text-gray-500 uppercase tracking-wider">
                  Quick Tags
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { }}
                  className="p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Add tag"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>

              <div className="space-y-1">
                {tags.slice(0, 5).map((tag) => (
                  <Link
                    key={tag.id}
                    href={ROUTES.TAG_DETAIL(tag.id)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-dark-elevated hover:text-gray-100 transition-colors group"
                  >
                    <span className="truncate">{tag.name}</span>
                    <Badge variant="default" className="ml-2">
                      {tag.note_count}
                    </Badge>
                  </Link>
                ))}
              </div>

              {tags.length > 5 && (
                <Link
                  href={ROUTES.TAGS}
                  className="block text-xs text-pastel-lavender hover:text-pastel-mint px-3 py-2 transition-colors"
                >
                  View all tags →
                </Link>
              )}
            </div>
          )}
        </nav>

        {/* User info - Fixed at bottom */}
        {user && (
          <div className="p-4 border-t border-dark-border">
            <Link
              href={ROUTES.PROFILE}
              className="flex items-center space-x-3 p-3 bg-dark-elevated rounded-xl shadow-neu-sm hover:shadow-neu-md transition-all"
            >
              <Avatar
                src={user.avatar_url || undefined}
                name={user.display_name}
                size="md"
              />
              <div className="min-w-0 flex-1">
                <p className="font-sans-medium text-sm text-gray-100 truncate">
                  {user.display_name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
