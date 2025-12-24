import Link from 'next/link';
import { FileText } from 'lucide-react';
import type { SearchResponse } from '@/lib/types/api';
import { formatRelativeTime } from '@/lib/utils/formatDate';
import { truncate } from '@/lib/utils/truncate';
import { ROUTES } from '@/lib/utils/constants';
import { EmptyState } from '@/components/shared/EmptyState';
import { Badge } from '@/components/ui/Badge';

interface SearchResultsProps {
  data: SearchResponse | null;
  isLoading?: boolean;
}

export function SearchResults({ data, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4 mt-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-dark-surface rounded-xl shadow-neu-sm p-4 animate-pulse"
          >
            <div className="h-5 bg-dark-elevated rounded w-3/4 mb-3" />
            <div className="h-4 bg-dark-elevated rounded w-full mb-2" />
            <div className="h-4 bg-dark-elevated rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  if (data.notes.length === 0) {
    return (
      <EmptyState
        icon={<FileText className="w-8 h-8 text-gray-500" />}
        title="No notes found"
        description={`No results for "${data.query}". Try different keywords.`}
        className="mt-12"
      />
    );
  }

  return (
    <div className="space-y-6 mt-6">
      {/* Results header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          Found <span className="text-pastel-lavender font-sans-medium">{data.total}</span> notes
          matching <span className="text-gray-100 font-sans-medium">&quot;{data.query}&quot;</span>
        </p>
      </div>

      {/* Results list */}
      <div className="space-y-3">
        {data.notes.map((note) => (
          <Link
            key={note.id}
            href={ROUTES.NOTE_DETAIL(note.id)}
            className="block bg-dark-surface rounded-xl shadow-neu-sm hover:shadow-neu-md transition-all p-5 group"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="text-base font-sans-semibold text-gray-100 group-hover:text-pastel-lavender transition-colors line-clamp-1">
                {note.title}
              </h3>
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {formatRelativeTime(note.updated_at)}
              </span>
            </div>

            <p className="text-sm text-gray-400 line-clamp-2 mb-3">
              {truncate(note.content || 'No content', 180)}
            </p>

            {/* Tags */}
            {note.tags && note.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {note.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="primary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {note.tags.length > 3 && (
                  <Badge variant="default" className="text-xs">
                    +{note.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
