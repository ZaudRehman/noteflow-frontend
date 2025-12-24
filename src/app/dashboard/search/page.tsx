'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSearch } from '@/lib/hooks/useSearch';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchResults } from '@/components/search/SearchResults';
import { SearchFilters } from '@/components/search/SearchFilters';
import { LoadingState } from '@/components/shared/LoadingState';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const {
    query,
    setQuery,
    results,
    isLoading,
    search,
  } = useSearch();

  const [filters, setFilters] = useState<any>({});

  useEffect(() => {
    if (initialQuery) {
      setTimeout(() => {
        setQuery(initialQuery);
        search(initialQuery);
      }, 0);
    }
  }, [initialQuery, setQuery, search]);

  useEffect(() => {
    if (query.trim()) {
      const timer = setTimeout(() => {
        search(query, filters);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [query, filters]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display-bold text-gray-100 mb-2">
          Search Notes
        </h1>
        <p className="text-gray-400">
          Find notes by title, content, or tags
        </p>
      </div>

      {/* Search bar */}
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        onClear={() => setQuery('')}
        placeholder="Search notes..."
        autoFocus
      />

      {/* Filters */}
      {query.trim() && (
        <SearchFilters onFilterChange={setFilters} />
      )}

      {/* Results */}
      {isLoading ? (
        <LoadingState message="Searching..." />
      ) : (
        <SearchResults data={results} isLoading={isLoading} />
      )}
    </div>
  );
}
