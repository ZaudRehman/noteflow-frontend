'use client';

import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Quote,
    Code,
    Heading1,
    Heading2,
    Link as LinkIcon,
    Sigma // Using Sigma for Math
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

interface MarkdownToolbarProps {
    onInsert: (prefix: string, suffix: string) => void;
    className?: string;
}

export function MarkdownToolbar({ onInsert, className }: MarkdownToolbarProps) {
    const tools = [
        { icon: Bold, label: 'Bold', prefix: '**', suffix: '**' },
        { icon: Italic, label: 'Italic', prefix: '_', suffix: '_' },
        { icon: Heading1, label: 'Heading 1', prefix: '# ', suffix: '' },
        { icon: Heading2, label: 'Heading 2', prefix: '## ', suffix: '' },
        { icon: List, label: 'Bullet List', prefix: '- ', suffix: '' },
        { icon: ListOrdered, label: 'Numbered List', prefix: '1. ', suffix: '' },
        { icon: Quote, label: 'Quote', prefix: '> ', suffix: '' },
        { icon: Code, label: 'Code Block', prefix: '```\n', suffix: '\n```' },
        { icon: LinkIcon, label: 'Link', prefix: '[', suffix: '](url)' },
        { icon: Sigma, label: 'Math', prefix: '$$ ', suffix: ' $$' }, // Math
    ];

    return (
        <div className={cn("flex items-center gap-1 p-2 bg-dark-elevated border-b border-dark-border rounded-t-xl overflow-x-auto", className)}>
            {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                    <Button
                        key={tool.label}
                        variant="ghost"
                        size="sm"
                        onClick={() => onInsert(tool.prefix, tool.suffix)}
                        className="p-2 h-8 w-8 text-gray-400 hover:text-gray-100 hover:bg-dark-surface"
                        title={tool.label}
                        aria-label={tool.label}
                    >
                        <Icon className="w-4 h-4" />
                    </Button>
                );
            })}
        </div>
    );
}
