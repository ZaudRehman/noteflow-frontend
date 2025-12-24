import {
  Zap,
  Users,
  Tag,
  History,
  Lock,
  FileText,
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Real-time Collaboration',
    description:
      'See edits as they happen. Work together with your team in real-time with sub-100ms sync.',
    gradient: 'from-pastel-lavender to-pastel-mint',
  },
  {
    icon: Users,
    title: 'Multi-user Support',
    description:
      'Unlimited collaborators per note. See who&apos;s editing with live cursors and presence indicators.',
    gradient: 'from-pastel-mint to-pastel-sky',
  },
  {
    icon: Tag,
    title: 'Smart Organization',
    description:
      'Tag-based organization with full-text search. Find any note instantly, no matter how many you have.',
    gradient: 'from-pastel-sky to-pastel-peach',
  },
  {
    icon: History,
    title: 'Version History',
    description:
      'Never lose work. Every change is saved with automatic versioning and one-click restore.',
    gradient: 'from-pastel-peach to-pastel-lavender',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description:
      'Self-hostable and open-source. Your data stays yours. Deploy on your own infrastructure.',
    gradient: 'from-pastel-lavender to-pastel-mint',
  },
  {
    icon: FileText,
    title: 'Markdown Support',
    description:
      'Write in plain text with full Markdown support. No bloat, just clean, fast note-taking.',
    gradient: 'from-pastel-mint to-pastel-peach',
  },
];

export function Features() {
  return (
    <section className="py-24 bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display-bold text-gray-100 mb-4">
            Everything you need to collaborate
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Built for speed, designed for teams, optimized for developers.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-dark-bg rounded-2xl shadow-neu-md hover:shadow-neu-lg transition-all p-8 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6 text-dark-bg" />
                </div>

                <h3 className="text-xl font-sans-semibold text-gray-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
