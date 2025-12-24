'use client';

import { useState, useRef, useEffect } from 'react';
import { Check, Plus, X } from 'lucide-react';
import type { Tag } from '@/lib/types/models';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { TagChip } from './TagChip';
import { cn } from '@/lib/utils/cn';

interface TagSelectorProps {
  availableTags: Tag[];
  selectedTags: string[];
  onTagSelect: (tagId: string) => void;
  onTagDeselect: (tagId: string) => void;
  onCreateTag?: (name: string) => Promise<void>;
  className?: string;
}

export function TagSelector({
  availableTags,
  selectedTags,
  onTagSelect,
  onTagDeselect,
  onCreateTag,
  className,
}: TagSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredTags = availableTags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedTagObjects = availableTags.filter((tag) =>
    selectedTags.includes(tag.id)
  );

  const canCreateNewTag =
    searchQuery.trim() &&
    !availableTags.some(
      (tag) => tag.name.toLowerCase() === searchQuery.trim().toLowerCase()
    );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCreateTag = async () => {
    if (!onCreateTag || !canCreateNewTag) return;

    setIsCreating(true);
    try {
      await onCreateTag(searchQuery.trim());
      setSearchQuery('');
    } catch (error) {
      console.error('Failed to create tag:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      {/* Selected tags */}
      {selectedTagObjects.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedTagObjects.map((tag) => (
            <TagChip
              key={tag.id}
              name={tag.name}
              onRemove={() => onTagDeselect(tag.id)}
              size="sm"
            />
          ))}
        </div>
      )}

      {/* Input trigger */}
      <div className="relative">
        <Input
          placeholder="Add tags..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-dark-elevated rounded-xl shadow-neu-lg border border-dark-border max-h-64 overflow-y-auto">
          {/* Create new tag option */}
          {canCreateNewTag && onCreateTag && (
            <button
              onClick={handleCreateTag}
              disabled={isCreating}
              className="w-full flex items-center space-x-2 px-4 py-3 text-sm text-pastel-mint hover:bg-dark-surface transition-colors border-b border-dark-border"
            >
              <Plus className="w-4 h-4" />
              <span>
                {isCreating ? 'Creating...' : `Create "${searchQuery.trim()}"`}
              </span>
            </button>
          )}

          {/* Tag list */}
          {filteredTags.length > 0 ? (
            filteredTags.map((tag) => {
              const isSelected = selectedTags.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  onClick={() =>
                    isSelected ? onTagDeselect(tag.id) : onTagSelect(tag.id)
                  }
                  className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-300 hover:bg-dark-surface transition-colors"
                >
                  <span className="truncate">{tag.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">
                      {tag.note_count}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-pastel-lavender" />}
                  </div>
                </button>
              );
            })
          ) : (
            <div className="px-4 py-6 text-center text-sm text-gray-500">
              No tags found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
