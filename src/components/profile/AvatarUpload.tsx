'use client';

import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

interface AvatarUploadProps {
  currentAvatarUrl?: string;
  displayName: string;
  onUpload: (file: File) => Promise<string>;
  className?: string;
}

export function AvatarUpload({
  currentAvatarUrl,
  displayName,
  onUpload,
  className,
}: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setIsUploading(true);
    try {
      const url = await onUpload(file);
      console.log('Avatar uploaded:', url);
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center space-x-6">
        <Avatar
          src={previewUrl || currentAvatarUrl || undefined}
          name={displayName}
          size="lg"
          className="w-20 h-20"
        />

        <div className="flex-1 space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleButtonClick}
            disabled={isUploading}
            className="gap-2"
          >
            {isUploading ? (
              <>Uploading...</>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload new avatar
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500">
            JPG, PNG or GIF. Max size 5MB.
          </p>
        </div>
      </div>

      {/* Note about avatar storage */}
      <div className="flex items-start space-x-2 p-3 bg-pastel-sky/10 rounded-lg border border-pastel-sky/20">
        <ImageIcon className="w-4 h-4 text-pastel-sky flex-shrink-0 mt-0.5" />
        <p className="text-xs text-gray-400">
          Note: Avatar upload requires additional backend configuration. For now,
          you can use an external image URL in the profile form.
        </p>
      </div>
    </div>
  );
}
