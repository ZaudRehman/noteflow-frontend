'use client';

import { Search as SearchIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export function SearchBar({
  query,
  onQueryChange,
  onClear,
  placeholder = 'Search notes...',
  className,
  autoFocus = false,
}: SearchBarProps) {
  const handleClear = () => {
    onQueryChange('');
    onClear?.();
  };

  return (
    <div
      className={cn(
        'flex items-center bg-dark-bg rounded-full shadow-neu-inset px-4 py-2.5 transition-all',
        'focus-within:ring-2 focus-within:ring-pastel-lavender/30',
        className
      )}
    >
      <SearchIcon className="w-4 h-4 text-gray-500 mr-3 flex-shrink-0" />
      <input
        type="text"
        className="bg-transparent flex-1 text-sm text-gray-100 placeholder-gray-500 outline-none"
        placeholder={placeholder}
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        autoFocus={autoFocus}
      />
      {query && (
        <button
          onClick={handleClear}
          className="p-1 hover:bg-dark-surface rounded-full transition-colors ml-2"
          aria-label="Clear search"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      )}
    </div>
  );
}
