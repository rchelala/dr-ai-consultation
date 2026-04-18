import Link from 'next/link'
import { HeroSection } from '@/components/ui/hero-section-with-smooth-bg-shader'

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <HeroSection
        title="We help your business save hours a week"
        highlightText="using AI."
        description="D & R AI Consultation delivers practical, no-hype AI solutions for small businesses — from automating repetitive tasks to responding to customers 24/7."
        buttonText="See Our Services"
        buttonHref="/services"
        secondaryButtonText="Take the AI Quiz"
        secondaryButtonHref="/quiz"
      />

      {/* What AI Can Do For Your Business */}
      <section className="relative overflow-hidden py-24" style={{ background: 'linear-gradient(135deg, rgba(72,185,187,0.14) 0%, #faf7f2 45%, rgba(255,179,107,0.12) 100%)' }}>
        <div className="absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(72,185,187,0.2)' }} />
        <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(255,179,107,0.2)' }} />

        <div className="relative max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-brand-purple/50 tracking-[0.2em] uppercase mb-3">
              Real Outcomes
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-4">
              What AI Can Do For Your Business
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              Small businesses don&apos;t need AI hype — they need results. Here&apos;s what we actually deliver.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🗓️',
                headline: 'Automate Scheduling',
                body: 'Never lose a booking to missed calls or after-hours requests again.',
              },
              {
                icon: '💬',
                headline: 'Respond 24/7',
                body: 'AI-powered replies handle customer inquiries around the clock — without hiring staff.',
              },
              {
                icon: '📣',
                headline: 'Create Marketing Content',
                body: 'Generate social posts, emails, and ad copy in minutes, not hours.',
              },
              {
                icon: '📊',
                headline: 'Analyze Your Data',
                body: 'Turn your numbers into clear insights and action steps — no spreadsheet expertise needed.',
              },
            ].map(({ icon, headline, body }) => (
              <div
                key={headline}
                className="bg-white/50 backdrop-blur-xl border border-white/70 rounded-2xl p-7 shadow-sm animate-fade-up hover:shadow-xl hover:-translate-y-2 transition-all duration-200 group"
              >
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-display text-lg font-semibold text-brand-navy mb-2 group-hover:underline">{headline}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Use Cases */}
      <section className="bg-brand-navy py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-brand-lavender/40 tracking-[0.2em] uppercase mb-3">
              Industries We Serve
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              AI Built for Your Industry
            </h2>
            <p className="text-brand-lavender/60 text-base max-w-xl mx-auto">
              Every business is different. Here&apos;s how we solve real problems across industries.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                industry: 'Healthcare Offices',
                icon: '🏥',
                problem: "Patients call after hours with questions you can't answer.",
                solution: 'We implement an AI assistant that answers FAQs, confirms appointments, and collects intake info automatically.',
                result: 'Reduce front-desk calls by up to 40%',
              },
              {
                industry: 'Landscaping',
                icon: '🌿',
                problem: 'You lose leads when people reach out after hours or on weekends.',
                solution: 'An AI chatbot captures leads, answers pricing questions, and books consultations while you sleep.',
                result: 'Increase lead capture by 30%',
              },
              {
                industry: 'Real Estate',
                icon: '🏡',
                problem: 'Writing listings, follow-up emails, and social content eats up hours every week.',
                solution: 'AI generates compelling property descriptions, drip campaigns, and market summaries in minutes.',
                result: 'Save 8+ hours of writing per week',
              },
              {
                industry: 'Gyms & Fitness',
                icon: '💪',
                problem: "Members churn silently — you only notice after they've already left.",
                solution: 'AI tracks engagement patterns and sends personalized re-engagement messages before members quit.',
                result: 'Improve member retention by 20%',
              },
            ].map(({ industry, icon, problem, solution, result }) => (
              <div
                key={industry}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{icon}</span>
                  <span className="font-display text-lg font-semibold text-white">{industry}</span>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-brand-pink font-semibold uppercase tracking-wider text-xs">Problem</span>
                    <p className="text-brand-lavender/70 mt-1 leading-relaxed">{problem}</p>
                  </div>
                  <div>
                    <span className="text-brand-purple font-semibold uppercase tracking-wider text-xs" style={{ color: '#72b9bb' }}>Solution</span>
                    <p className="text-brand-lavender/70 mt-1 leading-relaxed">{solution}</p>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <span className="text-white font-semibold">→ {result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 px-6" style={{ background: '#faf7f2' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-brand-purple/50 tracking-[0.2em] uppercase mb-3">
              How We Work Together
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-4">
              Choose Your Starting Point
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              Whether you&apos;re just curious or ready to automate your whole business, we have a path for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                name: 'Starter Audit',
                price: 'Starting at $299',
                description: 'We analyze your business and identify 3–5 AI opportunities with a clear roadmap.',
                highlight: false,
              },
              {
                name: 'Implementation',
                price: 'Custom Pricing',
                description: 'We build and integrate your AI tools — chatbots, automations, workflows — from scratch.',
                highlight: true,
              },
              {
                name: 'Ongoing Support',
                price: 'Monthly Retainer',
                description: 'Continuous optimization, prompt tuning, and staff training as your business grows.',
                highlight: false,
              },
            ].map(({ name, price, description, highlight }) => (
              <div
                key={name}
                className={`rounded-2xl p-8 border transition-all ${
                  highlight
                    ? 'bg-brand-navy text-white border-brand-navy shadow-xl scale-105'
                    : 'bg-white/60 backdrop-blur-xl border-white/70 text-brand-navy shadow-sm hover:shadow-md'
                }`}
              >
                {highlight && (
                  <div className="text-xs font-semibold text-brand-pink uppercase tracking-wider mb-3">Most Popular</div>
                )}
                <h3 className={`font-display text-xl font-bold mb-1 ${highlight ? 'text-white' : 'text-brand-navy'}`}>{name}</h3>
                <p className={`text-sm font-semibold mb-4 ${highlight ? 'text-brand-lavender/60' : 'text-brand-purple'}`}>{price}</p>
                <p className={`text-sm leading-relaxed ${highlight ? 'text-brand-lavender/70' : 'text-gray-500'}`}>{description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/services"
              className="inline-block bg-brand-gradient text-black-400 font-semibold rounded-full px-10 py-4 hover:opacity-90 transition-opacity shadow-md"
            >
              View All Packages →
            </Link>
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="py-20 px-6" style={{ background: 'linear-gradient(135deg, #e8916d 0%, #d4785a 100%)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold text-white/60 tracking-[0.2em] uppercase mb-4">
            Free Lead Magnet
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            How Ready Is Your Business for AI?
          </h2>
          <p className="text-white/80 text-base mb-8 leading-relaxed">
            Take our 2-minute quiz and get a personalized AI plan — completely free. No email required.
          </p>
          <Link
            href="/quiz"
            className="inline-block bg-white text-brand-navy font-semibold rounded-full px-10 py-4 hover:bg-white/90 transition-opacity shadow-md"
          >
            Take the Quiz →
          </Link>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-24 px-6 bg-brand-lavender">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-brand-purple/50 tracking-[0.2em] uppercase mb-3">
              Our Advantage
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-4">
              Why Work With Us
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              We&apos;re not AI hype merchants. We understand operations, data, and what it actually takes to run a business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: '🏥',
                title: 'Healthcare Data Background',
                body: 'Robert brings years of experience working with healthcare data and operations — meaning we understand real-world workflows, not just theory.',
              },
              {
                icon: '📊',
                title: 'SQL & Analytics Expertise',
                body: "We don't just automate — we measure. Our analytics background means every AI solution comes with a way to track what's actually working.",
              },
              {
                icon: '🛠️',
                title: 'Real Builders, Not Consultants',
                body: "We've shipped actual products: apps, websites, automation workflows. When we say we'll build it, we mean it.",
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="bg-white/60 backdrop-blur-xl border border-white/70 rounded-2xl p-8 shadow-sm">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-display text-lg font-semibold text-brand-navy mb-3">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <blockquote className="text-center max-w-2xl mx-auto">
            <p className="font-display text-xl md:text-2xl italic text-brand-navy/70 leading-relaxed">
              &ldquo;We don&apos;t just know AI — we understand workflows, data, and operations. That separates us from 90% of &lsquo;AI consultants&rsquo;.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* Try AI CTA */}
      <section className="bg-brand-navy py-20 px-6 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-lavender/40 mb-4">
          Live Demo
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 max-w-xl mx-auto leading-tight">
          See what AI can do for your business — right now.
        </h2>
        <p className="text-brand-lavender/60 mb-8 max-w-md mx-auto text-sm leading-relaxed">
          Try real AI prompts designed for small business owners. No account, no credit card, no experience needed.
        </p>
        <Link
          href="/try-ai"
          className="inline-block bg-brand-gradient text-white font-semibold rounded-full px-10 py-4 hover:opacity-90 transition-opacity shadow-lg"
        >
          Try AI for Your Business
        </Link>
      </section>
    </div>
  )
}
