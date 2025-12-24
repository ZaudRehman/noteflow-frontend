'use client';

import { LayoutGrid, List, SortAsc, SortDesc, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import { cn } from '@/lib/utils/cn';

interface NoteFiltersProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
  sortBy: 'created' | 'updated' | 'title';
  sortOrder: 'asc' | 'desc';
  onSortChange: (sortBy: 'created' | 'updated' | 'title', sortOrder: 'asc' | 'desc') => void;
  className?: string;
}

export function NoteFilters({
  view,
  onViewChange,
  sortBy,
  sortOrder,
  onSortChange,
  className,
}: NoteFiltersProps) {
  const sortLabels = {
    created: 'Date created',
    updated: 'Last updated',
    title: 'Title',
  };

  return (
    <div className={cn('flex items-center justify-between gap-3', className)}>
      {/* View toggle */}
      <div className="flex items-center gap-1 bg-dark-surface rounded-xl p-1 shadow-neu-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewChange('grid')}
          className={cn(
            'p-2',
            view === 'grid' && 'bg-dark-elevated shadow-neu-inset'
          )}
          aria-label="Grid view"
        >
          <LayoutGrid className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewChange('list')}
          className={cn(
            'p-2',
            view === 'list' && 'bg-dark-elevated shadow-neu-inset'
          )}
          aria-label="List view"
        >
          <List className="w-4 h-4" />
        </Button>
      </div>

      {/* Sort controls */}
      <div className="flex items-center gap-2">
        <Dropdown
          trigger={
            <Button variant="secondary" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">{sortLabels[sortBy]}</span>
            </Button>
          }
        >
          <DropdownItem onClick={() => onSortChange('updated', sortOrder)}>
            Last updated
          </DropdownItem>
          <DropdownItem onClick={() => onSortChange('created', sortOrder)}>
            Date created
          </DropdownItem>
          <DropdownItem onClick={() => onSortChange('title', sortOrder)}>
            Title
          </DropdownItem>
        </Dropdown>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
          className="p-2"
          aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
        >
          {sortOrder === 'asc' ? (
            <SortAsc className="w-4 h-4" />
          ) : (
            <SortDesc className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
