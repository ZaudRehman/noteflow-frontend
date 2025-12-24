import Link from 'next/link';
import { Star, Archive, Clock, MoreVertical, Trash2, Edit } from 'lucide-react';
import type { Note } from '@/lib/types/models';
import { formatRelativeTime } from '@/lib/utils/formatDate';
import { ROUTES } from '@/lib/utils/constants';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import { Avatar } from '@/components/ui/Avatar';
import { NotePreview } from '@/components/notes/NotePreview';
import { cn } from '@/lib/utils/cn';

interface NoteCardProps {
  note: Note;
  onFavorite?: (id: string) => void;
  onArchive?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function NoteCard({ note, onFavorite, onArchive, onDelete }: NoteCardProps) {
  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    onFavorite?.(note.id);
  };

  const handleArchive = (e: React.MouseEvent) => {
    e.preventDefault();
    onArchive?.(note.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    onDelete?.(note.id);
  };

  return (
    <Link
      href={ROUTES.NOTE_DETAIL(note.id)}
      className="block bg-dark-surface rounded-2xl shadow-neu-md hover:shadow-neu-lg transition-all duration-200 p-5 group relative"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-base font-sans-semibold text-gray-100 group-hover:text-pastel-lavender transition-colors line-clamp-2 flex-1">
          {note.title}
        </h3>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavorite}
            className={cn(
              'p-2',
              note.is_favorited && 'text-yellow-400'
            )}
            aria-label={note.is_favorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star
              className={cn('w-4 h-4', note.is_favorited && 'fill-current')}
            />
          </Button>

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
            <DropdownItem
              onClick={() => onArchive?.(note.id)}
              className="flex items-center space-x-2"
            >
              <Archive className="w-4 h-4" />
              <span>{note.is_archived ? 'Unarchive' : 'Archive'}</span>
            </DropdownItem>
            <DropdownItem
              onClick={() => onDelete?.(note.id)}
              className="flex items-center space-x-2 text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      {/* Content preview */}
      {/* Content preview */}
      <div className="relative h-32 mb-4 overflow-hidden mask-linear-fade">
        <div className="text-xs text-gray-400 pointer-events-none select-none transform scale-90 origin-top-left w-[110%]">
          <NotePreview content={note.content || ''} />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dark-surface to-transparent" />
      </div>

      {/* Tags */}
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
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

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>{formatRelativeTime(note.updated_at)}</span>
        </div>

        {/* Active users */}
        {note.active_users && note.active_users.length > 0 && (
          <div className="flex items-center -space-x-2">
            {note.active_users.slice(0, 3).map((user) => (
              <Avatar
                key={user.user_id}
                src={undefined}
                name={user.display_name}
                size="sm"
                className="ring-2 ring-dark-surface"
              />
            ))}
            {note.active_users.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-dark-elevated flex items-center justify-center text-xs font-sans-medium ring-2 ring-dark-surface">
                +{note.active_users.length - 3}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Badges */}
      {(note.is_favorited || note.is_archived) && (
        <div className="absolute top-3 right-3">
          {note.is_favorited && (
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
          )}
        </div>
      )}
    </Link>
  );
}
