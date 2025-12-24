'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { MarkdownToolbar } from './MarkdownToolbar';
import { cn } from '@/lib/utils/cn';

interface NoteEditorProps {
  noteId?: string;
  initialTitle?: string;
  initialContent?: string;
  onSave?: (title: string, content: string) => void;
  autoSave?: boolean;
  className?: string;
}

export function NoteEditor({
  noteId,
  initialTitle = '',
  initialContent = '',
  onSave,
  autoSave = true,
  className,
}: NoteEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const debouncedTitle = useDebounce(title, 1000);
  const debouncedContent = useDebounce(content, 1000);

  // Refs to track last saved values to prevent infinite loops
  const lastSavedTitleRef = useRef(initialTitle);
  const lastSavedContentRef = useRef(initialContent);

  // Auto-save effect
  useEffect(() => {
    if (!autoSave || !onSave) return;

    // Don't save if nothing changed since last save
    if (debouncedTitle === lastSavedTitleRef.current &&
      debouncedContent === lastSavedContentRef.current) {
      return;
    }

    const save = async () => {
      // Prevent concurrent saves
      if (isSaving) return;

      setIsSaving(true);
      try {
        await onSave(debouncedTitle, debouncedContent);
        setLastSaved(new Date());

        // Update refs only after successful save
        lastSavedTitleRef.current = debouncedTitle;
        lastSavedContentRef.current = debouncedContent;
      } catch (error) {
        console.error('Failed to auto-save:', error);
      } finally {
        setIsSaving(false);
      }
    };

    save();
  }, [debouncedTitle, debouncedContent, autoSave, onSave, isSaving]);

  // Update local state when props change
  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [noteId, initialTitle, initialContent]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInsert = useCallback((prefix: string, suffix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentContent = textarea.value;
    const before = currentContent.substring(0, start);
    const selected = currentContent.substring(start, end);
    const after = currentContent.substring(end);

    const newContent = `${before}${prefix}${selected}${suffix}${after}`;

    // Update content and trigger change
    setContent(newContent);

    // Restore focus and set cursor position after render
    requestAnimationFrame(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + selected.length + suffix.length;
      if (start === end) {
        textarea.setSelectionRange(start + prefix.length, start + prefix.length);
      } else {
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }
    });
  }, []);

  return (
    <div className={cn('max-w-3xl mx-auto px-8 py-4 space-y-6', className)}>
      {/* Save indicator */}
      {autoSave && (
        <div className="flex items-center justify-end text-xs text-gray-500">
          {isSaving ? (
            <span className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-text-pastel-lavender rounded-full animate-pulse" />
              <span>Saving...</span>
            </span>
          ) : lastSaved ? (
            <span>Saved {new Date(lastSaved).toLocaleTimeString()}</span>
          ) : null}
        </div>
      )}

      {/* Title input */}
      <Input
        type="text"
        placeholder="Untitled note"
        value={title}
        onChange={handleTitleChange}
        className="text-4xl font-display-bold bg-transparent border-none shadow-none px-0 focus:ring-0 placeholder-gray-600"
      />

      <div className="relative group min-h-[500px]">
        <MarkdownToolbar
          onInsert={handleInsert}
          className="mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 sticky top-4 z-10"
        />
        {/* Content editor */}
        <Textarea
          ref={textareaRef}
          placeholder="Start writing..."
          value={content}
          onChange={handleContentChange}
          className="w-full h-full min-h-[500px] resize-none font-sans text-lg leading-relaxed bg-transparent border-none shadow-none px-0 focus:ring-0 text-gray-300"
        />
      </div>

      {/* Character count */}
      <div className="flex items-center justify-between text-xs text-gray-500 border-t border-dark-border pt-4 mt-8">
        <span>{content.length} characters</span>
        <span>{content.split(/\s+/).filter(Boolean).length} words</span>
      </div>
    </div>
  );
}
