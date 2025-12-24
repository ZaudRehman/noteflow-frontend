'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { PenLine, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Scratchpad() {
    const [content, setContent] = useState('');
    const debouncedContent = useDebounce(content, 1000);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('noteflow_scratchpad');
        if (saved) {
            setTimeout(() => setContent(saved), 0);
        }
    }, []);

    // Save to localStorage when content changes
    useEffect(() => {
        localStorage.setItem('noteflow_scratchpad', debouncedContent);
    }, [debouncedContent]);

    const handleClear = () => {
        if (confirm('Clear scratchpad? This cannot be undone.')) {
            setContent('');
            localStorage.removeItem('noteflow_scratchpad');
        }
    };

    return (
        <div className="bg-dark-surface border border-dark-border rounded-2xl p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-pastel-lavender">
                    <PenLine className="w-5 h-5" />
                    <h3 className="font-sans-semibold text-lg">Quick Scratchpad</h3>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClear}
                    className="text-gray-500 hover:text-red-400 p-2 h-auto"
                    title="Clear scratchpad"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
            <textarea
                className="flex-1 w-full bg-dark-bg/50 rounded-xl p-4 resize-none border-none focus:ring-1 focus:ring-pastel-lavender/30 text-sm font-mono text-gray-300 placeholder-gray-600 transition-all"
                placeholder="Type anything here... It saves automatically."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
        </div>
    );
}
