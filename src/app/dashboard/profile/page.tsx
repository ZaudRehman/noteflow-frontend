'use client';

import { useState } from 'react';
import { User, Settings, Lock, Monitor } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/authStore';
import { useAuth } from '@/lib/hooks/useAuth';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { PreferencesForm } from '@/components/profile/PreferencesForm';
import { AvatarUpload } from '@/components/profile/AvatarUpload';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

type TabType = 'profile' | 'preferences' | 'security' | 'sessions';

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const { updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  const tabs = [
    { id: 'profile' as TabType, label: 'Profile', icon: User },
    { id: 'preferences' as TabType, label: 'Preferences', icon: Settings },
    { id: 'security' as TabType, label: 'Security', icon: Lock },
    { id: 'sessions' as TabType, label: 'Sessions', icon: Monitor },
  ];

  const handleProfileUpdate = async (values: any) => {
    await updateProfile(values);
  };

  const handlePreferencesUpdate = async (values: any) => {
    await updateProfile(values);
  };

  const handleAvatarUpload = async (file: File): Promise<string> => {
    // Simulate upload by creating a local object URL
    const objectUrl = URL.createObjectURL(file);

    // Update global store to reflect change immediately in UI
    updateUser({ avatar_url: objectUrl });

    return objectUrl;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display-bold text-gray-100 mb-2">
          Account Settings
        </h1>
        <p className="text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-dark-surface rounded-xl shadow-neu-sm p-2 flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-sans-medium transition-all',
                activeTab === tab.id
                  ? 'bg-dark-elevated text-pastel-lavender shadow-neu-inset'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-dark-elevated/50'
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="bg-dark-surface rounded-2xl shadow-neu-md p-6">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-sans-semibold text-gray-100 mb-4">
                Profile Information
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Update your account profile information and email address.
              </p>
            </div>

            <AvatarUpload
              currentAvatarUrl={user?.avatar_url || undefined}
              displayName={user?.display_name || 'User'}
              onUpload={handleAvatarUpload}
            />

            <div className="border-t border-dark-border pt-6">
              <ProfileForm onSubmit={handleProfileUpdate} />
            </div>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-sans-semibold text-gray-100 mb-4">
                Preferences
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Customize your Noteflow experience.
              </p>
            </div>

            <PreferencesForm onSubmit={handlePreferencesUpdate} />
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-sans-semibold text-gray-100 mb-4">
                Security Settings
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Manage your password and security preferences.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-dark-elevated rounded-xl">
                <div>
                  <h3 className="text-sm font-sans-medium text-gray-100">
                    Password
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Last changed 3 months ago
                  </p>
                </div>
                <Button variant="secondary" size="sm">
                  Change Password
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-dark-elevated rounded-xl">
                <div>
                  <h3 className="text-sm font-sans-medium text-gray-100">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Add an extra layer of security
                  </p>
                </div>
                <Button variant="secondary" size="sm">
                  Enable
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-dark-elevated rounded-xl">
                <div>
                  <h3 className="text-sm font-sans-medium text-gray-100">
                    Active Sessions
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Manage your active sessions
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab('sessions')}
                >
                  View
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-sans-semibold text-gray-100 mb-4">
                Active Sessions
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Manage where you&apos;re currently logged in.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-dark-elevated rounded-xl">
                <div>
                  <h3 className="text-sm font-sans-medium text-gray-100">
                    Current Session
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Chrome on macOS • Active now
                  </p>
                </div>
                <span className="px-2 py-1 bg-pastel-mint/20 text-pastel-mint text-xs rounded-full">
                  Current
                </span>
              </div>

              <div className="text-center py-8 text-sm text-gray-500">
                No other active sessions
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Danger zone */}
      {activeTab === 'profile' && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
          <h3 className="text-lg font-sans-semibold text-red-400 mb-2">
            Danger Zone
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <Button variant="danger" size="sm">
            Delete Account
          </Button>
        </div>
      )}
    </div>
  );
}
