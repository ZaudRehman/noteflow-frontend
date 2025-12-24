'use client';

import { useEffect } from 'react';
import { useTags } from '@/lib/hooks/useTags';
import { TagManager } from '@/components/tags/TagManager';
import { LoadingState } from '@/components/shared/LoadingState';

export default function TagsPage() {
  const { tags, isLoading, fetchTags, createTag, updateTag, deleteTag } =
    useTags();

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const handleCreateTag = async (name: string) => {
    await createTag(name);
    await fetchTags();
  };

  const handleUpdateTag = async (id: string, name: string) => {
    await updateTag(id, { name });
    await fetchTags();
  };

  const handleDeleteTag = async (id: string) => {
    await deleteTag(id);
    await fetchTags();
  };

  if (isLoading) {
    return <LoadingState message="Loading tags..." />;
  }

  return (
    <div className="space-y-6">
      <TagManager
        tags={tags}
        onCreateTag={handleCreateTag}
        onUpdateTag={handleUpdateTag}
        onDeleteTag={handleDeleteTag}
      />
    </div>
  );
}
