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
                href="https://github.com/yourusername/noteflow"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-dark-elevated rounded-lg hover:bg-dark-border transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-gray-400" />
              </a>
              <a
                href="https://twitter.com/noteflow"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-dark-elevated rounded-lg hover:bg-dark-border transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-gray-400" />
              </a>
              <a
                href="mailto:hello@noteflow.app"
                className="p-2 bg-dark-elevated rounded-lg hover:bg-dark-border transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-sans-semibold text-gray-200 uppercase tracking-wide mb-4">
              Product
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
                <Link
                  href="/dashboard/notes"
                  className="text-gray-400 hover:text-pastel-lavender transition-colors"
                >
                  Notes
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/tags"
                  className="text-gray-400 hover:text-pastel-lavender transition-colors"
                >
                  Tags
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/yourusername/noteflow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pastel-lavender transition-colors"
                >
                  GitHub
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
                <a
                  href="#"
                  className="text-gray-400 hover:text-pastel-lavender transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-pastel-lavender transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-pastel-lavender transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-dark-border flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 space-y-4 md:space-y-0">
          <p>
            © {currentYear} {APP_NAME}. All rights reserved.
          </p>
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
