'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import type { Tag } from '@/lib/types/models';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import { CreateTagDialog } from './CreateTagDialog';
import { EditTagDialog } from './EditTagDialog';
import { DeleteTagDialog } from './DeleteTagDialog';
import { EmptyState } from '@/components/shared/EmptyState';
import { ROUTES } from '@/lib/utils/constants';
import { formatRelativeTime } from '@/lib/utils/formatDate';

interface TagManagerProps {
  tags: Tag[];
  onCreateTag: (name: string) => Promise<void>;
  onUpdateTag: (id: string, name: string) => Promise<void>;
  onDeleteTag: (id: string) => Promise<void>;
}

export function TagManager({
  tags,
  onCreateTag,
  onUpdateTag,
  onDeleteTag,
}: TagManagerProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [deletingTag, setDeletingTag] = useState<Tag | null>(null);

  const handleCreate = async (name: string) => {
    await onCreateTag(name);
    setIsCreateOpen(false);
  };

  const handleUpdate = async (name: string) => {
    if (!editingTag) return;
    await onUpdateTag(editingTag.id, name);
    setEditingTag(null);
  };

  const handleDelete = async () => {
    if (!deletingTag) return;
    await onDeleteTag(deletingTag.id);
    setDeletingTag(null);
  };

  if (tags.length === 0) {
    return (
      <>
        <EmptyState
          title="No tags yet"
          description="Tags help you organize and find your notes quickly."
          action={
            <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Create your first tag
            </Button>
          }
        />
        <CreateTagDialog
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onConfirm={handleCreate}
        />
      </>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-sans-semibold text-gray-100">Tags</h2>
          <p className="text-sm text-gray-500 mt-1">
            {tags.length} {tags.length === 1 ? 'tag' : 'tags'}
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Tag</span>
        </Button>
      </div>

      {/* Tag list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="bg-dark-surface rounded-xl shadow-neu-sm hover:shadow-neu-md transition-all p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <Link
                href={ROUTES.TAG_DETAIL(tag.id)}
                className="flex-1 min-w-0"
              >
                <h3 className="text-base font-sans-semibold text-gray-100 truncate hover:text-pastel-lavender transition-colors">
                  {tag.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Created {formatRelativeTime(tag.created_at)}
                </p>
              </Link>

              <Dropdown
                align="right"
                trigger={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                }
              >
                <DropdownItem
                  onClick={() => setEditingTag(tag)}
                  className="flex items-center space-x-2"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit</span>
                </DropdownItem>
                <DropdownItem
                  onClick={() => setDeletingTag(tag)}
                  className="flex items-center space-x-2 text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </DropdownItem>
              </Dropdown>
            </div>

            <Link href={ROUTES.TAG_DETAIL(tag.id)}>
              <Badge variant="primary" className="text-sm">
                {tag.note_count} {tag.note_count === 1 ? 'note' : 'notes'}
              </Badge>
            </Link>
          </div>
        ))}
      </div>

      {/* Dialogs */}
      <CreateTagDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onConfirm={handleCreate}
      />

      {editingTag && (
        <EditTagDialog
          isOpen={!!editingTag}
          onClose={() => setEditingTag(null)}
          onConfirm={handleUpdate}
          initialName={editingTag.name}
        />
      )}

      {deletingTag && (
        <DeleteTagDialog
          isOpen={!!deletingTag}
          onClose={() => setDeletingTag(null)}
          onConfirm={handleDelete}
          tagName={deletingTag.name}
          noteCount={deletingTag.note_count}
        />
      )}
    </div>
  );
}
