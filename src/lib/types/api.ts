import type { User, Note, Tag } from './models';

// Auth responses
export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
}

// Note responses
export interface NoteListResponse {
  notes: Note[];
  total: number;
  page: number;
  limit: number;
}

export type NoteResponse = Note;

// Tag responses
export interface TagListResponse {
  tags: Tag[];
  total: number;
}

// Search responses
export interface SearchResponse {
  notes: Note[];
  total: number;
  query: string;
}

// Request types
export interface RegisterRequest {
  email: string;
  password: string;
  display_name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateNoteRequest {
  title: string;
  content?: string;
}

export interface UpdateNoteRequest {
  title?: string;
  content?: string;
}

export interface CreateTagRequest {
  name: string;
}

export interface UpdateTagRequest {
  name: string;
}

export interface AddTagRequest {
  tag_id: string;
}

export interface UpdateProfileRequest {
  display_name?: string;
  avatar_url?: string;
}

export interface UpdatePreferencesRequest {
  theme?: string;
  preferences?: Record<string, any>;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  new_password: string;
}
