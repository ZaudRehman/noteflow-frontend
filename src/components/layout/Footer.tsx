import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';
import { APP_NAME } from '@/lib/utils/constants';
import { Logo } from './Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-surface border-t border-dark-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4 md:col-span-2">
            <Logo showIcon />
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Real-time collaborative note-taking for developers, students, and
              remote teams. Built with performance and privacy in mind.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://github.com/ZaudRehman/noteflow-frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-dark-elevated rounded-lg hover:bg-dark-border transition-colors group"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-gray-400 group-hover:text-pastel-lavender" />
              </a>
              <a
                href="https://x.com/RehmanZaud"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-dark-elevated rounded-lg hover:bg-dark-border transition-colors group"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-pastel-lavender" />
              </a>
              <a
                href="mailto:zaudrehman@gmail.com"
                className="p-2 bg-dark-elevated rounded-lg hover:bg-dark-border transition-colors group"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-gray-400 group-hover:text-pastel-lavender" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-sans-semibold text-gray-200 uppercase tracking-wide mb-4">
              Project
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-400 hover:text-pastel-lavender transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/ZaudRehman/noteflow-frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pastel-lavender transition-colors"
                >
                  Frontend Core
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ZaudRehman/noteflow-backend-v1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pastel-lavender transition-colors"
                >
                  Backend API
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-sans-semibold text-gray-200 uppercase tracking-wide mb-4">
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-pastel-lavender transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-pastel-lavender transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-gray-400 hover:text-pastel-lavender transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-dark-border flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row md:items-center md:gap-4">
            <p>© {currentYear} {APP_NAME}. All rights reserved.</p>
            <div className="hidden md:block w-px h-4 bg-dark-border" />
            <p>
              Created by{' '}
              <a
                href="https://github.com/ZaudRehman"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pastel-lavender transition-colors font-sans-medium"
              >
                Zaud Rehman
              </a>
            </p>
          </div>
          <p className="flex items-center space-x-1">
            <span>Built with</span>
            <span className="text-pastel-peach">♥</span>
            <span>for real-time collaboration</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
