'use client';

import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/hooks/useAuth';

interface LogoutButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  children?: React.ReactNode;
}

export function LogoutButton({
  variant = 'ghost',
  size = 'md',
  showIcon = true,
  children = 'Logout',
}: LogoutButtonProps) {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Button variant={variant} size={size} onClick={handleLogout}>
      {showIcon && <LogOut className="w-4 h-4 mr-2" />}
      {children}
    </Button>
  );
}
