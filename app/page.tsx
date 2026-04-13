import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-gradient text-white py-20 px-4 text-center">
        <p className="text-xs font-semibold tracking-widest opacity-80 mb-3 uppercase">
          Your Guide to Understanding AI
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
          AI Doesn't Have to Be<br className="hidden md:block" /> Complicated
        </h1>
        <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">
          D & R AI Consultation helps everyday people and small businesses
          understand, explore, and start using AI — no tech background needed.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/what-is-ai"
            className="bg-white text-brand-purple font-semibold rounded-lg px-6 py-3 hover:opacity-90 transition-opacity"
          >
            Start Learning →
          </Link>
          <Link
            href="/try-ai"
            className="border border-white/50 bg-white/10 text-white font-semibold rounded-lg px-6 py-3 hover:bg-white/20 transition-colors"
          >
            Try AI Now
          </Link>
        </div>
      </section>

      {/* Feature cards */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <p className="text-center text-xs font-semibold text-gray-400 tracking-widest uppercase mb-10">
          What You'll Find Here
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              emoji: '🤖',
              title: 'What is AI?',
              description:
                'Plain-English answers to the questions everyone\'s afraid to ask. No jargon, no confusion.',
              href: '/what-is-ai',
            },
            {
              emoji: '⚙️',
              title: 'How it Works',
              description:
                'See how AI thinks, learns, and can help your business save time and serve customers better.',
              href: '/how-it-works',
            },
            {
              emoji: '✨',
              title: 'Try AI Live',
              description:
                'Practice with real AI using guided prompts. No experience needed — just click and explore.',
              href: '/try-ai',
            },
          ].map(({ emoji, title, description, href }) => (
            <Link
              key={href}
              href={href}
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-purple-50 group"
            >
              <div className="text-4xl mb-4">{emoji}</div>
              <h3 className="font-semibold text-brand-navy mb-2 group-hover:text-brand-purple transition-colors">
                {title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-white border-t border-purple-100 py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-brand-navy mb-3">
          Ready to see what AI can do for you?
        </h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Start with the basics or jump straight into the sandbox — either way,
          you'll be surprised how easy it is.
        </p>
        <Link
          href="/try-ai"
          className="inline-block bg-brand-gradient text-white font-semibold rounded-lg px-8 py-3 hover:opacity-90 transition-opacity"
        >
          Try AI for Free
        </Link>
      </section>
    </div>
  )
}
