import Link from 'next/link';
import { ArrowRight, Github } from 'lucide-react';
import { ROUTES } from '@/lib/utils/constants';
import { Button } from '@/components/ui/Button';

export function CTA() {
  return (
    <section className="py-24 bg-dark-bg relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pastel-lavender/10 via-transparent to-pastel-mint/10" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-display-bold text-gray-100 mb-6">
          Ready to transform your note-taking?
        </h2>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Your thoughts, organized beautifully. Free forever for personal use.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={ROUTES.REGISTER}>
            <Button size="lg" className="gap-2 text-lg px-8 py-6">
              Start Writing Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>

          <a
            href="https://github.com/ZaudRehman/noteflow-frontend"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="secondary"
              size="lg"
              className="gap-2 text-lg px-8 py-6"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </Button>
          </a>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-pastel-mint rounded-full" />
            <span>Open Source</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-pastel-lavender rounded-full" />
            <span>Self-Hostable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-pastel-peach rounded-full" />
            <span>Free Forever</span>
          </div>
        </div>
      </div>
    </section>
  );
}
