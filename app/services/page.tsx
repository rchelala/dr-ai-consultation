import Link from 'next/link'

const tiers = [
  {
    name: 'Starter AI Audit',
    price: '$299',
    priceNote: 'one-time',
    tagline: 'Understand exactly where AI can help — before committing to anything.',
    highlight: false,
    features: [
      '60-minute discovery call',
      'Full business workflow review',
      '3–5 identified AI opportunities',
      'Priority ranking with ROI estimates',
      'Written action plan you keep forever',
      'Follow-up Q&A session',
    ],
    cta: 'Get Your Audit',
  },
  {
    name: 'Implementation Package',
    price: 'Custom',
    priceNote: 'based on scope',
    tagline: 'We build it, integrate it, and hand it off — ready to run on day one.',
    highlight: true,
    features: [
      'Everything in Starter Audit',
      'Custom AI tool build (chatbot, workflow, or automation)',
      'Integration with your existing tools',
      'Staff training session',
      '30-day post-launch support',
      'Performance baseline report',
    ],
    cta: 'Get a Custom Quote',
  },
  {
    name: 'Ongoing AI Support',
    price: 'Monthly',
    priceNote: 'retainer',
    tagline: 'AI that keeps improving as your business grows — never set it and forget it.',
    highlight: false,
    features: [
      'Monthly strategy call',
      'Prompt tuning and optimization',
      'New automation opportunities',
      'Staff training updates',
      'Performance reporting',
      'Priority response time',
    ],
    cta: 'Start Monthly Support',
  },
]

const included = [
  { icon: '📞', title: 'Discovery Call', body: 'Every engagement starts with a free 30-minute call to understand your business before we recommend anything.' },
  { icon: '📋', title: 'Custom Recommendations', body: "No generic playbooks. Every recommendation is tailored to your specific business, industry, and goals." },
  { icon: '🤝', title: 'Follow-Up Support', body: "We don't disappear after delivery. Every package includes follow-up to make sure everything works as promised." },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-brand-lavender">
      {/* Header */}
      <section className="relative overflow-hidden py-24 px-6" style={{ background: 'linear-gradient(135deg, rgba(72,185,187,0.15) 0%, #faf7f2 50%, rgba(255,179,107,0.12) 100%)' }}>
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(72,185,187,0.2)' }} />
        <div className="absolute -bottom-20 -right-20 w-[360px] h-[360px] rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(255,179,107,0.18)' }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold text-brand-purple/50 tracking-[0.2em] uppercase mb-4">
            Our Services
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-navy mb-5 leading-tight">
            Simple Packages.<br />
            <em className="not-italic text-brand-purple">Real Results.</em>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            Every package is built around your business — not a cookie-cutter template. Not sure where to start? Take our free AI quiz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/quiz"
              className="inline-block bg-brand-gradient text-white font-semibold rounded-full px-8 py-3.5 hover:opacity-90 transition-opacity shadow-md"
            >
              Take the Free Quiz First
            </Link>
            <Link
              href="/about"
              className="inline-block border-2 border-brand-navy/20 text-brand-navy font-semibold rounded-full px-8 py-3.5 hover:border-brand-purple hover:text-brand-purple transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {tiers.map(({ name, price, priceNote, tagline, highlight, features, cta }) => (
              <div
                key={name}
                className={`rounded-2xl p-8 border transition-all ${
                  highlight
                    ? 'bg-brand-navy text-white border-brand-navy shadow-2xl md:-mt-4 md:mb-4'
                    : 'bg-white/60 backdrop-blur-xl border-white/80 shadow-sm hover:shadow-lg'
                }`}
              >
                {highlight && (
                  <div className="inline-block text-xs font-semibold text-brand-pink uppercase tracking-wider mb-4 bg-brand-pink/10 px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <h2 className={`font-display text-xl font-bold mb-1 ${highlight ? 'text-white' : 'text-brand-navy'}`}>
                  {name}
                </h2>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className={`text-3xl font-bold ${highlight ? 'text-white' : 'text-brand-navy'}`}>{price}</span>
                  <span className={`text-sm ${highlight ? 'text-brand-lavender/50' : 'text-gray-400'}`}>{priceNote}</span>
                </div>

                <p className={`text-sm mb-6 leading-relaxed ${highlight ? 'text-brand-lavender/70' : 'text-gray-500'}`}>
                  {tagline}
                </p>

                <ul className="space-y-3 mb-8">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <span className={`mt-0.5 flex-shrink-0 ${highlight ? 'text-brand-pink' : 'text-brand-purple'}`}>✓</span>
                      <span className={highlight ? 'text-brand-lavender/80' : 'text-gray-600'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/about"
                  className={`block text-center font-semibold rounded-full py-3.5 transition-all ${
                    highlight
                      ? 'bg-brand-gradient text-white hover:opacity-90'
                      : 'border-2 border-brand-navy/20 text-brand-navy hover:border-brand-purple hover:text-brand-purple'
                  }`}
                >
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included in every package */}
      <section className="bg-brand-navy py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
              What&apos;s Included in Every Package
            </h2>
            <p className="text-brand-lavender/60 text-sm max-w-md mx-auto">
              Regardless of which package you choose, you always get these with us.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {included.map(({ icon, title, body }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-7 text-center">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-brand-lavender/60 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-brand-lavender">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-navy text-center mb-10">
            Common Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Do I need any technical experience?",
                a: "None at all. We handle everything technical — you just need to tell us about your business and goals.",
              },
              {
                q: "How long does implementation take?",
                a: "Most implementations are complete within 2–4 weeks depending on complexity. The Starter Audit is delivered within 5 business days.",
              },
              {
                q: "What tools or software do you use?",
                a: "We work with leading AI platforms and choose the right tools for your specific needs — never locking you into a single vendor.",
              },
              {
                q: "Can I upgrade my package later?",
                a: "Absolutely. Most clients start with the Starter Audit to understand their opportunities, then move to Implementation once they have a clear plan.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white/60 backdrop-blur-xl border border-white/70 rounded-2xl p-6">
                <h3 className="font-display text-base font-semibold text-brand-navy mb-2">{q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm mb-4">Still have questions?</p>
            <Link
              href="/about"
              className="inline-block bg-brand-gradient text-white font-semibold rounded-full px-8 py-3.5 hover:opacity-90 transition-opacity"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
