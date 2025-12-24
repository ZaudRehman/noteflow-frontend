import type { ActiveUserInfo } from '@/lib/types/models';
import { Avatar } from '@/components/ui/Avatar';
import { Tooltip } from '@/components/ui/Tooltip';
import { Users } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ActiveUsersProps {
  users: ActiveUserInfo[];
  className?: string;
  maxDisplay?: number;
}

export function ActiveUsers({
  users,
  className,
  maxDisplay = 5,
}: ActiveUsersProps) {
  if (users.length === 0) {
    return null;
  }

  const displayUsers = users.slice(0, maxDisplay);
  const remainingCount = users.length - maxDisplay;

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex items-center space-x-1 text-xs text-gray-500">
        <Users className="w-4 h-4" />
        <span>{users.length} active</span>
      </div>

      <div className="flex items-center -space-x-2">
        {displayUsers.map((user) => (
          <Tooltip
            key={user.user_id}
            content={
              <div className="text-center">
                <div className="font-bold">{user.display_name}</div>
                <div className="text-xs opacity-75">Line {user.cursor_line + 1}</div>
              </div>
            }
            position="top"
          >
            <div className="relative">
              <Avatar
                src={undefined}
                name={user.display_name}
                size="sm"
                className="ring-2 ring-dark-surface hover:z-10 transition-all cursor-pointer"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-dark-surface rounded-full"></span>
            </div>
          </Tooltip>
        ))}

        {remainingCount > 0 && (
          <Tooltip content={`+${remainingCount} more`} position="top">
            <div className="w-8 h-8 rounded-full bg-dark-elevated flex items-center justify-center text-xs font-sans-medium ring-2 ring-dark-surface cursor-pointer hover:z-10 transition-all">
              +{remainingCount}
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
