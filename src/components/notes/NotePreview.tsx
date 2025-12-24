'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { cn } from '@/lib/utils/cn';

interface NotePreviewProps {
  content: string;
  className?: string;
}

export function NotePreview({ content, className }: NotePreviewProps) {
  if (!content || content.trim() === '') {
    return (
      <div className={cn('text-gray-500 text-sm italic', className)}>
        No content to preview
      </div>
    );
  }

  return (
    <div className={cn('markdown-preview', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
