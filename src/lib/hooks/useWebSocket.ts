'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useAuthStore } from '@/lib/stores/authStore';
import type { ActiveUserInfo } from '@/lib/types/models';
import type { WsMessage } from '@/lib/types/websocket';
import { env } from '@/lib/config/env';

interface ContentUpdate {
  title?: string;
  content?: string;
}

interface UseWebSocketReturn {
  isConnected: boolean;
  activeUsers: ActiveUserInfo[];
  sendContentUpdate: (update: ContentUpdate) => void;
  sendCursorUpdate: (line: number, column: number) => void;
  reconnect: () => void;
}

const MAX_RECONNECT_ATTEMPTS = 10;
const INITIAL_RECONNECT_DELAY = 1000;
const MAX_RECONNECT_DELAY = 30000;

export function useWebSocket(noteId: string): UseWebSocketReturn {
  const { user, accessToken } = useAuthStore();
  const [isConnected, setIsConnected] = useState(false);
  const [activeUsers, setActiveUsers] = useState<ActiveUserInfo[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const reconnectAttemptsRef = useRef(0);
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Calculate exponential backoff delay
  const getReconnectDelay = useCallback(() => {
    const delay = Math.min(
      INITIAL_RECONNECT_DELAY * Math.pow(2, reconnectAttemptsRef.current),
      MAX_RECONNECT_DELAY
    );
    return delay + Math.random() * 1000; // Add jitter
  }, []);

  // Send message through WebSocket
  const sendMessage = useCallback((message: WsMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected, message not sent:', message);
    }
  }, []);

  // Send content update
  const sendContentUpdate = useCallback((update: ContentUpdate) => {
    const message: WsMessage = {
      type: 'note:updated',
      note_id: noteId,
      user_id: user?.id || '',
      title: update.title,
      content_delta: update.content,
      timestamp: new Date().toISOString(),
    };
    sendMessage(message);
  }, [noteId, user?.id, sendMessage]);

  // Send cursor update
  const sendCursorUpdate = useCallback((line: number, column: number) => {
    const message: WsMessage = {
      type: 'cursor:move',
      note_id: noteId,
      user_id: user?.id || '',
      user_name: user?.display_name || 'Anonymous',
      position: { line, column },
      timestamp: new Date().toISOString(),
    };
    sendMessage(message);
  }, [noteId, user?.id, user?.display_name, sendMessage]);

  // Handle incoming messages
  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const message: WsMessage = JSON.parse(event.data);

      switch (message.type) {
        case 'active_users':
          setActiveUsers(message.data as ActiveUserInfo[]);
          break;

        case 'user_joined':
          setActiveUsers((prev) => {
            const exists = prev.some((u) => u.user_id === message.data.user_id);
            if (exists) return prev;
            return [...prev, message.data as ActiveUserInfo];
          });
          break;

        case 'user_left':
          setActiveUsers((prev) =>
            prev.filter((u) => u.user_id !== message.data.user_id)
          );
          break;

        case 'content_update':
          // Handle content updates from other users
          // This would typically trigger a re-render of the editor
          console.log('Content update received:', message.data);
          break;

        case 'cursor_update':
          // Handle cursor updates from other users
          setActiveUsers((prev) =>
            prev.map((u) =>
              u.user_id === message.user_id
                ? {
                  ...u,
                  cursor_line: message.data.line,
                  cursor_column: message.data.column,
                }
                : u
            )
          );
          break;

        default:
          console.warn('Unknown message type:', message.type);
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  }, []);

  // Setup heartbeat to keep connection alive
  const setupHeartbeat = useCallback(() => {
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
    }

    heartbeatIntervalRef.current = setInterval(() => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'ping' }));
      }
    }, 30000); // Ping every 30 seconds
  }, []);

  // Connect to WebSocket
  const connect = useCallback(() => {
    if (!noteId || !accessToken) {
      console.warn('Cannot connect: missing noteId or accessToken');
      return;
    }

    // Close existing connection
    if (wsRef.current) {
      wsRef.current.close();
    }

    try {
      // Construct WebSocket URL - auth handled by upgrade headers
      const wsUrl = `${env.NEXT_PUBLIC_WS_BASE_URL}/notes/${noteId}/ws?token=${accessToken}`;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        reconnectAttemptsRef.current = 0;
        setupHeartbeat();

        // Send initial join message
        const joinMessage: WsMessage = {
          type: 'user:joined',
          note_id: noteId,
          user_id: user?.id || '',
          user_name: user?.display_name || 'Anonymous',
          timestamp: new Date().toISOString(),
        };
        ws.send(JSON.stringify(joinMessage));
      };

      ws.onmessage = handleMessage;

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = (event) => {
        console.log('WebSocket closed:', event.code, event.reason);
        setIsConnected(false);
        setActiveUsers([]);

        // Clear heartbeat
        if (heartbeatIntervalRef.current) {
          clearInterval(heartbeatIntervalRef.current);
        }

        // Attempt reconnection if not a normal closure
        if (
          event.code !== 1000 &&
          reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS
        ) {
          const delay = getReconnectDelay();
          console.log(
            `Reconnecting in ${delay}ms (attempt ${reconnectAttemptsRef.current + 1}/${MAX_RECONNECT_ATTEMPTS})`
          );

          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptsRef.current += 1;
            connect();
          }, delay);
        } else if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
          console.error('Max reconnection attempts reached');
        }
      };

      wsRef.current = ws;
    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
    }
  }, [noteId, accessToken, user, handleMessage, setupHeartbeat, getReconnectDelay]);

  // Manual reconnect function
  const reconnect = useCallback(() => {
    reconnectAttemptsRef.current = 0;
    connect();
  }, [connect]);

  // Initialize connection
  useEffect(() => {
    connect();

    // Cleanup on unmount
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close(1000, 'Component unmounted');
      }
    };
  }, [connect]);

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, keep connection but reduce activity
        console.log('Page hidden, reducing WebSocket activity');
      } else {
        // Page is visible again, ensure connection is active
        console.log('Page visible, checking WebSocket connection');
        if (wsRef.current?.readyState !== WebSocket.OPEN) {
          reconnect();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [reconnect]);

  // Handle online/offline events
  useEffect(() => {
    const handleOnline = () => {
      console.log('Network online, reconnecting WebSocket');
      reconnect();
    };

    const handleOffline = () => {
      console.log('Network offline');
      setIsConnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [reconnect]);

  return {
    isConnected,
    activeUsers,
    sendContentUpdate,
    sendCursorUpdate,
    reconnect,
  };
}
