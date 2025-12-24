'use client';

import { useState } from 'react';
import { Filter, Calendar, Tag as TagIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import { Badge } from '@/components/ui/Badge';

interface SearchFiltersProps {
  onFilterChange: (filters: SearchFilters) => void;
}

interface SearchFilters {
  dateRange?: 'today' | 'week' | 'month' | 'all';
  tags?: string[];
  sortBy?: 'relevance' | 'date' | 'title';
}

export function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    dateRange: 'all',
    sortBy: 'relevance',
  });

  const handleDateChange = (dateRange: SearchFilters['dateRange']) => {
    const newFilters = { ...filters, dateRange };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (sortBy: SearchFilters['sortBy']) => {
    const newFilters = { ...filters, sortBy };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex items-center gap-3 mb-6">
      {/* Date range filter */}
      <Dropdown
        trigger={
          <Button variant="secondary" size="sm" className="gap-2">
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">
              {filters.dateRange === 'all'
                ? 'All time'
                : filters.dateRange === 'today'
                ? 'Today'
                : filters.dateRange === 'week'
                ? 'This week'
                : 'This month'}
            </span>
          </Button>
        }
      >
        <DropdownItem onClick={() => handleDateChange('today')}>
          Today
        </DropdownItem>
        <DropdownItem onClick={() => handleDateChange('week')}>
          This week
        </DropdownItem>
        <DropdownItem onClick={() => handleDateChange('month')}>
          This month
        </DropdownItem>
        <DropdownItem onClick={() => handleDateChange('all')}>
          All time
        </DropdownItem>
      </Dropdown>

      {/* Sort by */}
      <Dropdown
        trigger={
          <Button variant="secondary" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">
              {filters.sortBy === 'relevance'
                ? 'Relevance'
                : filters.sortBy === 'date'
                ? 'Date'
                : 'Title'}
            </span>
          </Button>
        }
      >
        <DropdownItem onClick={() => handleSortChange('relevance')}>
          Relevance
        </DropdownItem>
        <DropdownItem onClick={() => handleSortChange('date')}>
          Date modified
        </DropdownItem>
        <DropdownItem onClick={() => handleSortChange('title')}>
          Title (A-Z)
        </DropdownItem>
      </Dropdown>
    </div>
  );
}
