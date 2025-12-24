import { z } from 'zod';
import { VALIDATION } from './constants';

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(VALIDATION.PASSWORD_MIN_LENGTH, `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`)
    .max(VALIDATION.PASSWORD_MAX_LENGTH, `Password must be less than ${VALIDATION.PASSWORD_MAX_LENGTH} characters`),
  display_name: z
    .string()
    .min(VALIDATION.DISPLAY_NAME_MIN_LENGTH, 'Display name is required')
    .max(VALIDATION.DISPLAY_NAME_MAX_LENGTH, `Display name must be less than ${VALIDATION.DISPLAY_NAME_MAX_LENGTH} characters`),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const createNoteSchema = z.object({
  title: z
    .string()
    .min(VALIDATION.TITLE_MIN_LENGTH, 'Title is required')
    .max(VALIDATION.TITLE_MAX_LENGTH, `Title must be less than ${VALIDATION.TITLE_MAX_LENGTH} characters`),
  content: z.string().optional(),
});

export const updateNoteSchema = z.object({
  title: z
    .string()
    .min(VALIDATION.TITLE_MIN_LENGTH, 'Title is required')
    .max(VALIDATION.TITLE_MAX_LENGTH, `Title must be less than ${VALIDATION.TITLE_MAX_LENGTH} characters`)
    .optional(),
  content: z.string().optional(),
});

export const createTagSchema = z.object({
  name: z
    .string()
    .min(VALIDATION.TAG_NAME_MIN_LENGTH, 'Tag name is required')
    .max(VALIDATION.TAG_NAME_MAX_LENGTH, `Tag name must be less than ${VALIDATION.TAG_NAME_MAX_LENGTH} characters`),
});

export const updateProfileSchema = z.object({
  display_name: z
    .string()
    .min(VALIDATION.DISPLAY_NAME_MIN_LENGTH, 'Display name is required')
    .max(VALIDATION.DISPLAY_NAME_MAX_LENGTH, `Display name must be less than ${VALIDATION.DISPLAY_NAME_MAX_LENGTH} characters`)
    .optional(),
  avatar_url: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  new_password: z
    .string()
    .min(VALIDATION.PASSWORD_MIN_LENGTH, `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`)
    .max(VALIDATION.PASSWORD_MAX_LENGTH, `Password must be less than ${VALIDATION.PASSWORD_MAX_LENGTH} characters`),
});
