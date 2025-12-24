export interface User {
  id: string;
  email: string;
  display_name: string;
  avatar_url: string | null;
  theme: string | null;
  preferences: Record<string, any> | null;
  created_at: string;
  last_login_at: string | null;
}

export interface Note {
  id: string;
  user_id: string;
  title: string;
  content: string;
  last_edited_by: string | null;
  is_favorited: boolean;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
  tags: string[];
  active_users: ActiveUserInfo[];
}

export interface ActiveUserInfo {
  user_id: string;
  display_name: string;
  cursor_line: number;
  cursor_column: number;
}

export interface Tag {
  id: string;
  name: string;
  note_count: number;
  created_at: string;
}

export interface Revision {
  id: string;
  note_id: string;
  content: string;
  created_by: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  avatar_url: string | null;
  theme: string;
  preferences: Record<string, any>;
  created_at: string;
  last_login_at: string | null;
}
