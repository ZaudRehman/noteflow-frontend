import { FileText, Users2, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: 'Create a note',
    description: 'Start writing instantly. No setup, no configuration.',
  },
  {
    icon: Users2,
    title: 'Invite collaborators',
    description: 'Share your note with anyone. They can edit in real-time.',
  },
  {
    icon: Sparkles,
    title: 'Work together',
    description: 'See changes live. Every keystroke syncs across all devices.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display-bold text-gray-100 mb-4">
            Simple, powerful workflow
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get started in seconds. No learning curve, just start writing.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center relative">
                {/* Connector line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-pastel-lavender to-pastel-mint opacity-30" />
                )}

                <div className="relative z-10 w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-pastel-lavender to-pastel-mint rounded-2xl shadow-neu-lg flex items-center justify-center">
                  <Icon className="w-12 h-12 text-dark-bg" />
                </div>

                <div className="text-4xl font-display-bold text-pastel-lavender mb-3">
                  {index + 1}
                </div>

                <h3 className="text-xl font-sans-semibold text-gray-100 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
