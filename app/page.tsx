import Link from 'next/link'
import { HeroSection } from '@/components/ui/hero-section-with-smooth-bg-shader'

export default function HomePage() {
  return (
    <div>
      {/* Hero — full-screen mesh gradient */}
      <HeroSection />

      {/* Feature cards — glass on gradient background */}
      <section className="relative overflow-hidden py-20" style={{ background: 'linear-gradient(135deg, rgba(72,185,187,0.22) 0%, #faf7f2 45%, rgba(255,179,107,0.18) 100%)' }}>
        {/* Decorative blobs */}
        <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(72,185,187,0.3)' }} />
        <div className="absolute -bottom-32 -right-32 w-[460px] h-[460px] rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(255,179,107,0.28)' }} />

        <div className="relative max-w-5xl mx-auto px-6">
          <p className="text-center text-xs font-semibold text-brand-purple/50 tracking-[0.2em] uppercase mb-12">
            What You'll Find Here
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'What is AI?',
                description:
                  "Plain-English answers to the questions everyone's afraid to ask. No jargon, no confusion.",
                href: '/what-is-ai',
              },
              {
                number: '02',
                title: 'Try AI Live',
                description:
                  'Practice with real AI using guided prompts. No experience needed — just click and explore.',
                href: '/try-ai',
              },
              {
                number: '03',
                title: 'About Us',
                description:
                  'Meet the team behind D & R AI Consultation and learn why we built this for you.',
                href: '/about',
              },
            ].map(({ number, title, description, href }) => (
              <Link
                key={href}
                href={href}
                className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl p-8 shadow-md hover:bg-white/75 hover:shadow-xl hover:-translate-y-2 transition-all duration-200 group"
              >
                <div className="font-display text-5xl font-bold text-brand-purple/15 mb-5 group-hover:text-brand-purple/35 transition-colors leading-none">
                  {number}
                </div>
                <h3 className="font-display text-xl font-semibold text-brand-navy mb-3 group-hover:text-brand-purple group-hover:underline transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{description}</p>
                <span className="text-sm text-brand-purple font-semibold tracking-wide">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-brand-navy py-20 px-6 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-lavender/40 mb-4">
          Get Started Today
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 max-w-xl mx-auto leading-tight">
          Ready to see what AI can do for you?
        </h2>
        <p className="text-brand-lavender/60 mb-8 max-w-md mx-auto text-sm leading-relaxed">
          Start with the basics or jump straight into the sandbox — either way,
          you'll be surprised how easy it is.
        </p>
        <Link
          href="/try-ai"
          className="inline-block bg-brand-gradient text-white font-semibold rounded-full px-10 py-4 hover:opacity-90 transition-opacity shadow-lg"
        >
          Try AI for Free
        </Link>
      </section>
    </div>
  )
}
