'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Star, FileText, Archive, TrendingUp } from 'lucide-react';
import type { Note } from '@/lib/types/models';
import { useNotes } from '@/lib/hooks/useNotes';
import { useAuthStore } from '@/lib/stores/authStore';
import { ROUTES } from '@/lib/utils/constants';
import { Button } from '@/components/ui/Button';
import { NoteGrid } from '@/components/notes/NoteGrid';
import { LoadingState } from '@/components/shared/LoadingState';
import { CreateNoteButton } from '@/components/notes/CreateNoteButton';
import { Scratchpad } from '@/components/dashboard/Scratchpad';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const {
    notes,
    isLoading,
    fetchNotes,
    toggleFavorite,
    toggleArchive,
    deleteNote,
  } = useNotes();

  const recentNotes = [...notes]
    .sort(
      (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
    .slice(0, 6);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const stats = useMemo(() => [
    {
      icon: FileText,
      label: 'Total Notes',
      value: notes.length,
      color: 'text-pastel-lavender',
    },
    {
      icon: Star,
      label: 'Favorites',
      value: notes.filter((n) => n.is_favorited).length,
      color: 'text-pastel-mint',
    },
    {
      icon: Archive,
      label: 'Archived',
      value: notes.filter((n) => n.is_archived).length,
      color: 'text-pastel-peach',
    },
    {
      icon: TrendingUp,
      label: 'This Week',
      value: notes.filter((n) => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return new Date(n.created_at) > weekAgo;
      }).length,
      color: 'text-pastel-sky',
    },
  ], [notes]);

  // Time-based greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  if (isLoading) {
    return <LoadingState message="Loading your dashboard..." />;
  }

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div>
        <h1 className="text-3xl font-display-bold text-gray-100 mb-2">
          {greeting}, {user?.display_name || 'User'}! 👋
        </h1>
        <p className="text-gray-400">
          Here&apos;s what&apos;s happening with your notes today.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-dark-surface rounded-2xl shadow-neu-sm p-6 hover:shadow-neu-md transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-3xl font-display-bold text-gray-100 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">

          {/* Recent notes */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-sans-semibold text-gray-100">
                  Recent Notes
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Your most recently updated notes
                </p>
              </div>

              <Button
                onClick={() => router.push(ROUTES.NOTES)}
                variant="secondary"
              >
                View All
              </Button>
            </div>

            <NoteGrid
              notes={recentNotes}
              onFavorite={toggleFavorite}
              onArchive={toggleArchive}
              onDelete={deleteNote}
              emptyTitle="No notes yet"
              emptyDescription="Create your first note to get started."
              emptyAction={<CreateNoteButton variant="button" />}
            />
          </div>

          {/* Quick actions */}
          <div className="bg-gradient-to-br from-pastel-lavender/10 to-pastel-mint/10 rounded-2xl p-8 border border-pastel-lavender/20">
            <h3 className="text-xl font-sans-semibold text-gray-100 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button
                onClick={() => router.push(ROUTES.NOTES)}
                variant="secondary"
                className="gap-2 justify-start"
              >
                <FileText className="w-4 h-4" />
                Browse All Notes
              </Button>
              <Button
                onClick={() => router.push(ROUTES.FAVORITES)}
                variant="secondary"
                className="gap-2 justify-start"
              >
                <Star className="w-4 h-4" />
                View Favorites
              </Button>
              <Button
                onClick={() => router.push(ROUTES.TAGS)}
                variant="secondary"
                className="gap-2 justify-start"
              >
                <Archive className="w-4 h-4" />
                Manage Tags
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Scratchpad />
        </div>
      </div>

      {/* Floating action button */}
      <CreateNoteButton />
    </div>
  );
}
