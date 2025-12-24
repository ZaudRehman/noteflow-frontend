import type { Metadata, Viewport } from 'next';
import { APP_NAME } from '@/lib/utils/constants';
import { ToastContainer } from '@/components/ui/Toast';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} - Real-time Collaborative Notes`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    'Real-time collaborative note-taking for developers, students, and remote teams. Write together, organize with tags, never lose your work.',
  keywords: [
    'notes',
    'collaboration',
    'real-time',
    'markdown',
    'team',
    'productivity',
  ],
  authors: [{ name: APP_NAME }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://noteflow.app',
    title: `${APP_NAME} - Real-time Collaborative Notes`,
    description:
      'Real-time collaborative note-taking for developers, students, and remote teams.',
    siteName: APP_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${APP_NAME} - Real-time Collaborative Notes`,
    description:
      'Real-time collaborative note-taking for developers, students, and remote teams.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#1a1b26',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-dark-bg text-gray-100 antialiased">
        <ErrorBoundary>
          {children}
          <ToastContainer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
