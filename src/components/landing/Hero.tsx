import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ROUTES } from '@/lib/utils/constants';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/layout/Logo';

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(184,164,212,0.1),transparent_50%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-pastel-lavender/10 rounded-full border border-pastel-lavender/20 mb-8">
          <Sparkles className="w-4 h-4 text-pastel-lavender" />
          <span className="text-sm text-pastel-lavender font-sans-medium">
            Real-time collaboration, zero friction
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-display-bold text-gray-100 mb-6 leading-tight">
          Notes that{' '}
          <span className="bg-gradient-to-r from-pastel-lavender via-pastel-mint to-pastel-peach bg-clip-text text-transparent">
            flow
          </span>{' '}
          with your team
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Collaborative note-taking built for developers, students, and remote
          teams. Write together in real-time, organize with tags, and never lose
          your work.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={ROUTES.REGISTER}>
            <Button size="lg" className="gap-2 text-lg px-8 py-6">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href={ROUTES.LOGIN}>
            <Button variant="secondary" size="lg" className="text-lg px-8 py-6">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
          <div>
            <div className="text-3xl font-display-bold text-pastel-lavender mb-2">
              100ms
            </div>
            <div className="text-sm text-gray-500">Sync latency</div>
          </div>
          <div>
            <div className="text-3xl font-display-bold text-pastel-mint mb-2">
              Open Source
            </div>
            <div className="text-sm text-gray-500">MIT licensed</div>
          </div>
          <div>
            <div className="text-3xl font-display-bold text-pastel-peach mb-2">
              Self-host
            </div>
            <div className="text-sm text-gray-500">Full control</div>
          </div>
        </div>
      </div>
    </div>
  );
}
