import { useEffect, useRef, useState } from 'react';
import { NoteflowWebSocket } from './manager';
import type { WsMessage } from '@/lib/types/websocket';

export function useWebSocket(noteId: string | null) {
  const wsRef = useRef<NoteflowWebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WsMessage | null>(null);

  useEffect(() => {
    if (!noteId) return;

    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('[useWebSocket] No access token found');
      return;
    }

    const ws = new NoteflowWebSocket(noteId, token);
    wsRef.current = ws;

    ws.connect(
      (msg) => {
        setLastMessage(msg);
        setIsConnected(true);
      },
      (error) => {
        console.error('[useWebSocket] Error:', error);
        setIsConnected(false);
      }
    );

    return () => {
      ws.disconnect();
      wsRef.current = null;
      setIsConnected(false);
    };
  }, [noteId]);

  const send = (msg: WsMessage) => {
    wsRef.current?.send(msg);
  };

  return {
    isConnected,
    lastMessage,
    send,
  };
}
