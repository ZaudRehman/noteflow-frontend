import type { Tag } from '@/lib/types/models';
import { TagChip } from './TagChip';
import { EmptyState } from '@/components/shared/EmptyState';
import { Tag as TagIcon } from 'lucide-react';

interface TagListProps {
  tags: Tag[];
  onTagClick?: (tag: Tag) => void;
  onTagRemove?: (tagId: string) => void;
  showCount?: boolean;
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md';
  emptyMessage?: string;
}

export function TagList({
  tags,
  onTagClick,
  onTagRemove,
  showCount = true,
  variant = 'primary',
  size = 'md',
  emptyMessage = 'No tags yet',
}: TagListProps) {
  if (tags.length === 0) {
    return (
      <EmptyState
        icon={<TagIcon className="w-6 h-6 text-gray-500" />}
        title={emptyMessage}
        description="Create tags to organize your notes."
      />
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => onTagClick?.(tag)}
          className="transition-transform hover:scale-105 active:scale-95"
        >
          <TagChip
            name={tag.name}
            count={showCount ? tag.note_count : undefined}
            onRemove={onTagRemove ? () => onTagRemove(tag.id) : undefined}
            variant={variant}
            size={size}
          />
        </button>
      ))}
    </div>
  );
}
