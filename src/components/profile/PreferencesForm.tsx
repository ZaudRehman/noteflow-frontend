'use client';

import { useForm } from 'react-hook-form';
import { Switch } from '@/components/ui/Switch';
import { Button } from '@/components/ui/Button';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import { useAuthStore } from '@/lib/stores/authStore';

interface PreferencesFormValues {
  theme: string;
  notifications_enabled: boolean;
  auto_save: boolean;
  preview_mode: 'split' | 'preview' | 'editor';
}

interface PreferencesFormProps {
  onSubmit: (values: Partial<PreferencesFormValues>) => Promise<void>;
}

export function PreferencesForm({ onSubmit }: PreferencesFormProps) {
  const { user } = useAuthStore();
  const preferences = (user?.preferences as PreferencesFormValues) || {};

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<PreferencesFormValues>({
    defaultValues: {
      theme: user?.theme || 'dark',
      notifications_enabled: preferences.notifications_enabled ?? true,
      auto_save: preferences.auto_save ?? true,
      preview_mode: preferences.preview_mode || 'split',
    },
  });

  const theme = watch('theme');
  const previewMode = watch('preview_mode');

  const handleFormSubmit = async (values: PreferencesFormValues) => {
    await onSubmit({
      theme: values.theme,
      preferences: {
        notifications_enabled: values.notifications_enabled,
        auto_save: values.auto_save,
        preview_mode: values.preview_mode,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Theme */}
      <div>
        <label className="block text-sm font-sans-medium text-gray-300 mb-3">
          Theme
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setValue('theme', 'dark')}
            className={`flex-1 p-4 rounded-xl border-2 transition-all ${
              theme === 'dark'
                ? 'border-pastel-lavender bg-pastel-lavender/10'
                : 'border-dark-border bg-dark-surface hover:border-dark-border/50'
            }`}
          >
            <div className="text-sm font-sans-medium text-gray-100">Dark</div>
            <div className="text-xs text-gray-500 mt-1">
              Easy on the eyes
            </div>
          </button>
          <button
            type="button"
            onClick={() => setValue('theme', 'light')}
            className={`flex-1 p-4 rounded-xl border-2 transition-all ${
              theme === 'light'
                ? 'border-pastel-lavender bg-pastel-lavender/10'
                : 'border-dark-border bg-dark-surface hover:border-dark-border/50'
            }`}
          >
            <div className="text-sm font-sans-medium text-gray-100">Light</div>
            <div className="text-xs text-gray-500 mt-1">
              Coming soon
            </div>
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="flex items-center justify-between py-3">
        <div>
          <label className="text-sm font-sans-medium text-gray-300">
            Enable notifications
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Receive updates about your notes and collaborations
          </p>
        </div>
        <Switch {...register('notifications_enabled')} />
      </div>

      {/* Auto-save */}
      <div className="flex items-center justify-between py-3">
        <div>
          <label className="text-sm font-sans-medium text-gray-300">
            Auto-save notes
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Automatically save changes while you type
          </p>
        </div>
        <Switch {...register('auto_save')} />
      </div>

      {/* Editor mode */}
      <div>
        <label className="block text-sm font-sans-medium text-gray-300 mb-3">
          Default editor mode
        </label>
        <div className="grid grid-cols-3 gap-3">
          {['split', 'preview', 'editor'].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setValue('preview_mode', mode as any)}
              className={`p-3 rounded-xl border-2 transition-all capitalize ${
                previewMode === mode
                  ? 'border-pastel-lavender bg-pastel-lavender/10'
                  : 'border-dark-border bg-dark-surface hover:border-dark-border/50'
              }`}
            >
              <div className="text-xs font-sans-medium text-gray-100">
                {mode}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Submit button */}
      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-dark-border">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Preferences'}
        </Button>
      </div>
    </form>
  );
}
