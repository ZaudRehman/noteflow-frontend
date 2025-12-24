import { useState } from 'react';
import { searchAPI } from '@/lib/api/search';
import { useDebounce } from './useDebounce';
import { useUIStore } from '@/lib/stores/uiStore';
import type { SearchResponse } from '@/lib/types/api';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResponse | null>(null);
  const debouncedQuery = useDebounce(query, 300);
  const { addToast } = useUIStore();

  const search = async (
    searchQuery: string,
    params?: { page?: number; limit?: number }
  ) => {
    if (!searchQuery.trim()) {
      setResults(null);
      return;
    }

    setIsLoading(true);
    try {
      const data = await searchAPI.search(searchQuery.trim(), params);
      setResults(data);
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Search failed', 'error');
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-search on debounced query change
  const debouncedSearch = async () => {
    if (debouncedQuery) {
      await search(debouncedQuery);
    } else {
      setResults(null);
    }
  };

  return {
    query,
    setQuery,
    debouncedQuery,
    results,
    isLoading,
    search,
    debouncedSearch,
  };
}
