import { Logo } from '@/components/layout/Logo';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-dark-bg">
      {/* Header */}
      <header className="p-6">
        <Logo showIcon />
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Noteflow. All rights reserved.
      </footer>
    </div>
  );
}
