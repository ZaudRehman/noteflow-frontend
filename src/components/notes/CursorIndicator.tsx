'use client';

import { useState, useEffect } from 'react';
import type { ActiveUserInfo } from '@/lib/types/models';
import { cn } from '@/lib/utils/cn';

interface CursorIndicatorProps {
  user: ActiveUserInfo;
  color?: string;
  className?: string;
}

export function CursorIndicator({
  user,
  color = '#b8a4d4',
  className,
}: CursorIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Fade out after 3 seconds of inactivity
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [user.cursor_line, user.cursor_column]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'absolute pointer-events-none transition-all duration-150',
        className
      )}
      style={{
        top: `${user.cursor_line * 1.5}rem`,
        left: `${user.cursor_column * 0.5}ch`,
      }}
    >
      {/* Cursor line */}
      <div
        className="w-0.5 h-5 animate-pulse"
        style={{ backgroundColor: color }}
      />

      {/* User label */}
      <div
        className="absolute top-0 left-2 px-2 py-0.5 rounded text-xs font-sans-medium text-white whitespace-nowrap shadow-lg"
        style={{ backgroundColor: color }}
      >
        {user.display_name}
      </div>
    </div>
  );
}
