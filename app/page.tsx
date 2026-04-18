import Link from 'next/link'
import { HeroSection } from '@/components/ui/hero-section-with-smooth-bg-shader'
import Icon from '@/components/Icon'

export default function HomePage() {
  return (
    <div>
      {/* Hero — keep existing animated shader */}
      <HeroSection
        title="We help your business save hours a week"
        highlightText="using AI."
        description="D & R AI Consultation delivers practical, no-hype AI solutions for small businesses — from automating repetitive tasks to responding to customers 24/7."
        buttonText="See Our Services"
        buttonHref="/services"
        secondaryButtonText="Take the AI Quiz"
        secondaryButtonHref="/quiz"
      />

      {/* What AI Can Do */}
      <section className="section section--wash" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="blob blob-teal" style={{ width: 420, height: 420, top: -160, left: -160 }} />
        <div className="blob blob-peach" style={{ width: 360, height: 360, bottom: -140, right: -120 }} />
        <div className="container" style={{ position: 'relative' }}>
          <div className="section-header">
            <p className="t-eyebrow t-eyebrow--muted">Real Outcomes</p>
            <h2 className="t-h2">What AI Can Do For Your Business</h2>
            <p className="t-body">Small businesses don&apos;t need AI hype — they need results. Here&apos;s what we actually deliver.</p>
          </div>
          <div className="grid-4">
            {[
              { icon: 'calendar' as const, headline: 'Automate Scheduling', body: 'Never lose a booking to missed calls or after-hours requests again.' },
              { icon: 'chat' as const, headline: 'Respond 24/7', body: 'AI-powered replies handle customer inquiries around the clock — without hiring staff.' },
              { icon: 'megaphone' as const, headline: 'Create Marketing Content', body: 'Generate social posts, emails, and ad copy in minutes, not hours.' },
              { icon: 'barChart' as const, headline: 'Analyze Your Data', body: 'Turn your numbers into clear insights and action steps — no spreadsheet expertise needed.' },
            ].map(({ icon, headline, body }) => (
              <div key={headline} className="card card--interactive">
                <div className="icon-tile"><Icon name={icon} /></div>
                <h3 className="t-h4">{headline}</h3>
                <p className="t-small" style={{ marginTop: 8 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section section--dark">
        <div className="container">
          <div className="section-header">
            <p className="t-eyebrow t-eyebrow--on-dark">Industries We Serve</p>
            <h2 className="t-h2" style={{ color: '#fff' }}>AI Built for Your Industry</h2>
            <p className="t-body" style={{ color: 'rgba(250,247,242,0.6)' }}>Every business is different. Here&apos;s how we solve real problems across industries.</p>
          </div>
          <div className="grid-2">
            {[
              { industry: 'Healthcare Offices', icon: 'stethoscope' as const, problem: "Patients call after hours with questions you can't answer.", solution: 'We implement an AI assistant that answers FAQs, confirms appointments, and collects intake info automatically.', result: 'Reduce front-desk calls by up to 40%' },
              { industry: 'Landscaping', icon: 'leaf' as const, problem: 'You lose leads when people reach out after hours or on weekends.', solution: 'An AI chatbot captures leads, answers pricing questions, and books consultations while you sleep.', result: 'Increase lead capture by 30%' },
              { industry: 'Real Estate', icon: 'home' as const, problem: 'Writing listings, follow-up emails, and social content eats up hours every week.', solution: 'AI generates compelling property descriptions, drip campaigns, and market summaries in minutes.', result: 'Save 8+ hours of writing per week' },
              { industry: 'Gyms & Fitness', icon: 'dumbbell' as const, problem: "Members churn silently — you only notice after they've already left.", solution: 'AI tracks engagement patterns and sends personalized re-engagement messages before members quit.', result: 'Improve member retention by 20%' },
            ].map(({ industry, icon, problem, solution, result }) => (
              <div key={industry} className="card card--dark" style={{ padding: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                  <div className="icon-tile icon-tile--dark" style={{ width: 40, height: 40, marginBottom: 0 }}>
                    <Icon name={icon} size={20} />
                  </div>
                  <h3 className="t-h4" style={{ color: '#fff' }}>{industry}</h3>
                </div>
                <div style={{ display: 'grid', gap: 14 }}>
                  <div>
                    <span className="t-eyebrow" style={{ color: 'var(--brand-peach)' }}>Problem</span>
                    <p className="t-small" style={{ marginTop: 6, color: 'rgba(250,247,242,0.7)' }}>{problem}</p>
                  </div>
                  <div>
                    <span className="t-eyebrow" style={{ color: '#8ed6d6' }}>Solution</span>
                    <p className="t-small" style={{ marginTop: 6, color: 'rgba(250,247,242,0.7)' }}>{solution}</p>
                  </div>
                  <div style={{ paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <span className="t-small" style={{ color: '#fff', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <Icon name="trendingUp" size={16} /> {result}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="section section--cream">
        <div className="container">
          <div className="section-header">
            <p className="t-eyebrow t-eyebrow--muted">How We Work Together</p>
            <h2 className="t-h2">Choose Your Starting Point</h2>
            <p className="t-body">Whether you&apos;re just curious or ready to automate your whole business, we have a path for you.</p>
          </div>
          <div className="grid-3" style={{ alignItems: 'stretch', marginBottom: 40 }}>
            {[
              { name: 'Starter Audit', price: 'Starting at $299', description: 'We analyze your business and identify 3–5 AI opportunities with a clear roadmap.', highlight: false },
              { name: 'Implementation', price: 'Custom Pricing', description: 'We build and integrate your AI tools — chatbots, automations, workflows — from scratch.', highlight: true },
              { name: 'Ongoing Support', price: 'Monthly Retainer', description: 'Continuous optimization, prompt tuning, and staff training as your business grows.', highlight: false },
            ].map(({ name, price, description, highlight }) => (
              <div key={name} className={highlight ? 'card card--feature' : 'card card--interactive'}
                   style={highlight ? { transform: 'translateY(-8px)' } : {}}>
                {highlight && <div className="badge badge-peach" style={{ marginBottom: 16 }}>Most Popular</div>}
                <h3 className="t-h4" style={{ color: highlight ? '#fff' : 'var(--ink-100)' }}>{name}</h3>
                <p className="t-small" style={{ color: highlight ? 'rgba(250,247,242,0.6)' : 'var(--brand-teal)', fontWeight: 600, marginTop: 4 }}>{price}</p>
                <p className="t-small" style={{ marginTop: 16, color: highlight ? 'rgba(250,247,242,0.7)' : 'var(--ink-60)' }}>{description}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link href="/services" className="btn btn-primary btn--lg">
              View All Packages <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="section section--peach">
        <div className="container--narrow" style={{ textAlign: 'center' }}>
          <p className="t-eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>Free Assessment</p>
          <h2 className="t-h2" style={{ color: '#fff', marginTop: 16 }}>How Ready Is Your Business for AI?</h2>
          <p className="t-body" style={{ color: 'rgba(255,255,255,0.85)', marginTop: 16, marginBottom: 32 }}>
            Take our 2-minute quiz and get a personalized AI plan — completely free. No email required.
          </p>
          <Link href="/quiz" className="btn btn-on-dark btn--lg">
            Take the Quiz <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </section>

      {/* Why Us */}
      <section className="section section--cream">
        <div className="container">
          <div className="section-header">
            <p className="t-eyebrow t-eyebrow--muted">Our Advantage</p>
            <h2 className="t-h2">Why Work With Us</h2>
            <p className="t-body">We&apos;re not AI hype merchants. We understand operations, data, and what it actually takes to run a business.</p>
          </div>
          <div className="grid-3" style={{ marginBottom: 48 }}>
            {[
              { icon: 'stethoscope' as const, title: 'Healthcare Data Background', body: 'Robert brings years of experience working with healthcare data and operations — meaning we understand real-world workflows, not just theory.' },
              { icon: 'database' as const, title: 'SQL & Analytics Expertise', body: "We don't just automate — we measure. Our analytics background means every AI solution comes with a way to track what's actually working." },
              { icon: 'wrench' as const, title: 'Real Builders, Not Consultants', body: "We've shipped actual products: apps, websites, automation workflows. When we say we'll build it, we mean it." },
            ].map(({ icon, title, body }) => (
              <div key={title} className="card">
                <div className="icon-tile"><Icon name={icon} /></div>
                <h3 className="t-h4">{title}</h3>
                <p className="t-small" style={{ marginTop: 8 }}>{body}</p>
              </div>
            ))}
          </div>
          <blockquote style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
            <p className="t-h3" style={{ fontStyle: 'italic', color: 'var(--ink-80)', fontWeight: 500 }}>
              &ldquo;We don&apos;t just know AI — we understand workflows, data, and operations. That separates us from 90% of &lsquo;AI consultants&rsquo;.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* Try AI CTA */}
      <section className="section section--dark" style={{ textAlign: 'center' }}>
        <div className="container--narrow">
          <p className="t-eyebrow t-eyebrow--on-dark">Live Demo</p>
          <h2 className="t-h2" style={{ color: '#fff', marginTop: 16 }}>See what AI can do for your business — right now.</h2>
          <p className="t-body" style={{ color: 'rgba(250,247,242,0.65)', marginTop: 16, marginBottom: 32 }}>
            Try real AI prompts designed for small business owners. No account, no credit card, no experience needed.
          </p>
          <Link href="/try-ai" className="btn btn-primary btn--lg">
            Try AI for Your Business <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
