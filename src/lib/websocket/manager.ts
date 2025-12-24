import type { WsMessage } from '@/lib/types/websocket';

const WS_BASE = process.env.NEXT_PUBLIC_WS_BASE_URL!;

export class NoteflowWebSocket {
  private ws: WebSocket | null = null;
  private noteId: string;
  private token: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private pingInterval: NodeJS.Timeout | null = null;
  private onMessageCallback: ((msg: WsMessage) => void) | null = null;
  private onErrorCallback: ((error: Event) => void) | null = null;

  constructor(noteId: string, token: string) {
    this.noteId = noteId;
    this.token = token;
  }

  connect(onMessage: (msg: WsMessage) => void, onError?: (error: Event) => void) {
    this.onMessageCallback = onMessage;
    this.onErrorCallback = onError || null;

    const wsUrl = `${WS_BASE}/notes/${this.noteId}/ws?token=${this.token}`;
    console.log(`[WebSocket] Connecting to: ${wsUrl}`);

    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log(`[WebSocket] Connected to note ${this.noteId}`);
      this.reconnectAttempts = 0;

      // Send ping every 30 seconds
      this.pingInterval = setInterval(() => {
        this.send({ type: 'ping', timestamp: new Date().toISOString() });
      }, 30000);
    };

    this.ws.onmessage = (event) => {
      try {
        const msg: WsMessage = JSON.parse(event.data);
        if (this.onMessageCallback) {
          this.onMessageCallback(msg);
        }
      } catch (error) {
        console.error('[WebSocket] Failed to parse message:', error);
      }
    };

    this.ws.onerror = (error) => {
      console.error('[WebSocket] Error:', error);
      if (this.onErrorCallback) {
        this.onErrorCallback(error);
      }
    };

    this.ws.onclose = () => {
      console.log('[WebSocket] Connection closed');
      if (this.pingInterval) {
        clearInterval(this.pingInterval);
        this.pingInterval = null;
      }

      // Auto-reconnect with exponential backoff
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        const delay = Math.min(1000 * 2 ** this.reconnectAttempts, 10000);
        setTimeout(() => {
          this.reconnectAttempts++;
          console.log(`[WebSocket] Reconnecting... (attempt ${this.reconnectAttempts})`);
          if (this.onMessageCallback) {
            this.connect(this.onMessageCallback, this.onErrorCallback || undefined);
          }
        }, delay);
      }
    };
  }

  send(msg: WsMessage) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
    } else {
      console.warn('[WebSocket] Cannot send, connection not open');
    }
  }

  disconnect() {
    console.log('[WebSocket] Manually disconnecting');
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
    this.reconnectAttempts = this.maxReconnectAttempts; // Prevent auto-reconnect
    this.ws?.close();
    this.ws = null;
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}
