'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useUIStore } from '@/lib/stores/uiStore';
import { cn } from '@/lib/utils/cn';

export function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={removeToast}
        />
      ))}
    </div>
  );
}

interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: (id: string) => void;
}

function Toast({ id, message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  const bgColor = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
  }[type];

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-xl shadow-neu-lg text-white min-w-[300px]',
        bgColor
      )}
    >
      <p className="flex-1 text-sm font-sans-medium">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="p-1 hover:bg-white/20 rounded-lg transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// Export showToast helper function
export function showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
  const { addToast } = useUIStore.getState();
  addToast(message, type);
}