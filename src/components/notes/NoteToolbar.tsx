'use client';

import {
  Save,
  Star,
  Archive,
  Trash2,
  Share2,
  MoreVertical,
  Eye,
  Edit3,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import { cn } from '@/lib/utils/cn';

interface NoteToolbarProps {
  isFavorited?: boolean;
  isArchived?: boolean;
  onSave?: () => void;
  onFavorite?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
  showPreview?: boolean;
  onTogglePreview?: () => void;
  isSaving?: boolean;
  className?: string;
}

export function NoteToolbar({
  isFavorited = false,
  isArchived = false,
  onSave,
  onFavorite,
  onArchive,
  onDelete,
  onShare,
  showPreview = false,
  onTogglePreview,
  isSaving = false,
  className,
}: NoteToolbarProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 p-4 bg-dark-surface rounded-xl shadow-neu-sm',
        className
      )}
    >
      {/* Left side - Primary actions */}
      <div className="flex items-center gap-2">
        {onSave && (
          <Button
            variant="primary"
            size="sm"
            onClick={onSave}
            disabled={isSaving}
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">
              {isSaving ? 'Saving...' : 'Save'}
            </span>
          </Button>
        )}

        {onTogglePreview && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onTogglePreview}
            className="gap-2"
          >
            {showPreview ? (
              <>
                <Edit3 className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Preview</span>
              </>
            )}
          </Button>
        )}
      </div>

      {/* Right side - Secondary actions */}
      <div className="flex items-center gap-1">
        {onFavorite && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onFavorite}
            className={cn('p-2', isFavorited && 'text-yellow-400')}
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star className={cn('w-4 h-4', isFavorited && 'fill-current')} />
          </Button>
        )}

        {onShare && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onShare}
            className="p-2"
            aria-label="Share note"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        )}

        <Dropdown
          align="right"
          trigger={
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              aria-label="More options"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          }
        >
          {onArchive && (
            <DropdownItem
              onClick={onArchive}
              className="flex items-center space-x-2"
            >
              <Archive className="w-4 h-4" />
              <span>{isArchived ? 'Unarchive' : 'Archive'}</span>
            </DropdownItem>
          )}
          {onDelete && (
            <DropdownItem
              onClick={onDelete}
              className="flex items-center space-x-2 text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </DropdownItem>
          )}
        </Dropdown>
      </div>
    </div>
  );
}
