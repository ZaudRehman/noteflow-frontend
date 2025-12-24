import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url('Invalid API base URL'),
  NEXT_PUBLIC_WS_BASE_URL: z.string().url('Invalid WebSocket base URL'),
  NEXT_PUBLIC_APP_NAME: z.string().optional().default('Noteflow'),
  NEXT_PUBLIC_APP_URL: z.string().url('Invalid app URL').optional().default('http://localhost:3000'),
});

function validateEnv() {
  const env = {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_WS_BASE_URL: process.env.NEXT_PUBLIC_WS_BASE_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  };

  try {
    return envSchema.parse(env);
  } catch (error) {
    console.error('❌ Invalid environment variables:', error);
    throw new Error('Invalid environment variables');
  }
}

export const env = validateEnv();
