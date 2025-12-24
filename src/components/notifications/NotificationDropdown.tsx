'use client';

import { useState } from 'react';
import { Bell, Check, Info, FileText } from 'lucide-react';
import { Dropdown } from '@/components/ui/Dropdown';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

interface Notification {
    id: string;
    title: string;
    description: string;
    time: string;
    read: boolean;
    type: 'info' | 'success' | 'warning';
}

const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: '1',
        title: 'Welcome to NoteFlow!',
        description: 'Get started by creating your first note.',
        time: '2 hours ago',
        read: false,
        type: 'success',
    },
    {
        id: '2',
        title: 'New Feature: Math Support',
        description: 'You can now use LaTeX equations in your notes.',
        time: '1 day ago',
        read: false,
        type: 'info',
    },
    {
        id: '3',
        title: 'Version 1.0 Live',
        description: 'We have officially launched NoteFlow v1.0.',
        time: '2 days ago',
        read: true,
        type: 'info',
    },
];

export function NotificationDropdown() {
    const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    return (
        <Dropdown
            align="right"
            className="w-80 p-0 overflow-hidden"
            trigger={
                <div className="relative p-2 rounded-xl hover:bg-dark-surface transition-colors cursor-pointer group">
                    <Bell className={cn("w-5 h-5 transition-colors", unreadCount > 0 ? "text-gray-100 group-hover:text-pastel-lavender" : "text-gray-400 group-hover:text-gray-300")} />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-dark-elevated animate-pulse" />
                    )}
                </div>
            }
        >
            <div className="flex items-center justify-between px-4 py-3 border-b border-dark-border bg-dark-surface/50">
                <h3 className="font-sans-semibold text-sm text-gray-100">
                    Notifications
                </h3>
                {unreadCount > 0 && (
                    <button
                        onClick={markAllAsRead}
                        className="text-xs text-pastel-lavender hover:text-pastel-mint transition-colors"
                    >
                        Mark all read
                    </button>
                )}
            </div>

            <div className="max-h-[300px] overflow-y-auto scrollbar-thin">
                {notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 text-sm">
                        No notifications
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            onClick={() => markAsRead(notification.id)}
                            className={cn(
                                'px-4 py-3 border-b border-dark-border last:border-0 cursor-pointer transition-colors',
                                notification.read
                                    ? 'bg-transparent hover:bg-dark-surface'
                                    : 'bg-pastel-lavender/5 hover:bg-pastel-lavender/10'
                            )}
                        >
                            <div className="flex gap-3">
                                <div className={cn(
                                    "mt-1 w-2 h-2 rounded-full flex-shrink-0",
                                    notification.read ? "bg-gray-600" : "bg-pastel-lavender"
                                )} />
                                <div className="flex-1 space-y-1">
                                    <p className={cn(
                                        "text-sm font-medium leading-none",
                                        notification.read ? "text-gray-400" : "text-gray-100"
                                    )}>
                                        {notification.title}
                                    </p>
                                    <p className="text-xs text-gray-500 line-clamp-2">
                                        {notification.description}
                                    </p>
                                    <p className="text-[10px] text-gray-600 pt-1">
                                        {notification.time}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Dropdown>
    );
}
