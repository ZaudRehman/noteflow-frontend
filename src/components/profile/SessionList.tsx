'use client';

import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { formatDateTime } from '@/lib/utils/formatDate';
import { Button } from '@/components/ui/Button';

interface Session {
  id: string;
  device_type: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  location: string;
  ip_address: string;
  last_active: string;
  is_current: boolean;
}

interface SessionListProps {
  sessions: Session[];
  onRevoke: (sessionId: string) => Promise<void>;
}

export function SessionList({ sessions, onRevoke }: SessionListProps) {
  const getDeviceIcon = (type: Session['device_type']) => {
    switch (type) {
      case 'desktop':
        return Monitor;
      case 'mobile':
        return Smartphone;
      case 'tablet':
        return Tablet;
      default:
        return Monitor;
    }
  };

  return (
    <div className="space-y-3">
      {sessions.map((session) => {
        const Icon = getDeviceIcon(session.device_type);

        return (
          <div
            key={session.id}
            className="flex items-center justify-between p-4 bg-dark-surface rounded-xl shadow-neu-sm"
          >
            <div className="flex items-start space-x-4 flex-1">
              <div className="w-10 h-10 bg-dark-elevated rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-gray-400" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-sans-medium text-gray-100">
                    {session.browser}
                  </h4>
                  {session.is_current && (
                    <span className="px-2 py-0.5 bg-pastel-mint/20 text-pastel-mint text-xs rounded-full font-sans-medium">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {session.location} • {session.ip_address}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Last active {formatDateTime(session.last_active)}
                </p>
              </div>
            </div>

            {!session.is_current && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRevoke(session.id)}
                className="text-red-400 hover:text-red-300"
              >
                Revoke
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
