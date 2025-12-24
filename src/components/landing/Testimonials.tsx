import { Avatar } from '@/components/ui/Avatar';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer',
    avatar: null,
    quote:
      'Finally, a note-taking app that actually works for team collaboration. The real-time sync is incredibly fast.',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Product Manager',
    avatar: null,
    quote:
      'We switched from Notion to Noteflow for our team docs. The speed difference is night and day.',
  },
  {
    name: 'Emily Watson',
    role: 'Design Lead',
    avatar: null,
    quote:
      'Love the minimalist interface. No distractions, just pure focus on writing and collaborating.',
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display-bold text-gray-100 mb-4">
            Loved by teams worldwide
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Here&apos;s what people are saying about Noteflow.
          </p>
        </div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-dark-bg rounded-2xl shadow-neu-md p-8 relative"
            >
              <Quote className="w-8 h-8 text-pastel-lavender/30 mb-4" />

              <p className="text-gray-300 leading-relaxed mb-6">
                &quot;{testimonial.quote}&quot;
              </p>

              <div className="flex items-center space-x-3">
                <Avatar
                  name={testimonial.name}
                  src={testimonial.avatar || undefined}
                  size="md"
                />
                <div>
                  <div className="font-sans-semibold text-gray-100">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
