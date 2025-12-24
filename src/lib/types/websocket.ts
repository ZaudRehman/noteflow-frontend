export type WsMessage =
  | {
    type: 'note:created';
    note_id: string;
    user_id: string;
    title: string;
    timestamp: string;
  }
  | {
    type: 'note:updated';
    note_id: string;
    user_id: string;
    title?: string;
    content_delta?: string;
    timestamp: string;
  }
  | {
    type: 'note:deleted';
    note_id: string;
    user_id: string;
    timestamp: string;
  }
  | {
    type: 'tag:created';
    tag_id: string;
    name: string;
    user_id: string;
    timestamp: string;
  }
  | {
    type: 'tag:updated';
    tag_id: string;
    name: string;
    user_id: string;
    timestamp: string;
  }
  | {
    type: 'tag:deleted';
    tag_id: string;
    user_id: string;
    timestamp: string;
  }
  | {
    type: 'cursor:move';
    note_id: string;
    user_id: string;
    user_name: string;
    position: CursorPosition;
    timestamp: string;
  }
  | {
    type: 'user:joined';
    note_id: string;
    user_id: string;
    user_name: string;
    timestamp: string;
  }
  | {
    type: 'user:left';
    note_id: string;
    user_id: string;
    timestamp: string;
  }
  | {
    type: 'error';
    message: string;
    timestamp: string;
  }
  | {
    type: 'ping';
    timestamp: string;
  }
  | {
    type: 'pong';
    timestamp: string;
  }
  | {
    type: 'active_users';
    data: {
      user_id: string;
      display_name: string;
      cursor_line: number;
      cursor_column: number;
    }[];
    timestamp: string;
  }
  | {
    type: 'user_joined';
    data: {
      user_id: string;
      display_name: string;
      cursor_line: number;
      cursor_column: number;
    };
    timestamp: string;
  }
  | {
    type: 'user_left';
    data: {
      user_id: string;
    };
    timestamp: string;
  }
  | {
    type: 'content_update';
    data: any;
    timestamp: string;
  }
  | {
    type: 'cursor_update';
    user_id: string;
    data: {
      line: number;
      column: number;
    };
    timestamp: string;
  };

export interface CursorPosition {
  line: number;
  column: number;
}
