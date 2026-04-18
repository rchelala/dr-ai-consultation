import Link from 'next/link'
import Icon from '@/components/Icon'

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
  { icon: 'phone' as const, title: 'Discovery Call', body: 'Every engagement starts with a free 30-minute call to understand your business before we recommend anything.' },
  { icon: 'clipboard' as const, title: 'Custom Recommendations', body: 'No generic playbooks. Every recommendation is tailored to your specific business, industry, and goals.' },
  { icon: 'users' as const, title: 'Follow-Up Support', body: "We don't disappear after delivery. Every package includes follow-up to make sure everything works as promised." },
]

export default function ServicesPage() {
  return (
    <div>
      {/* Header */}
      <section className="section section--wash" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="blob blob-teal" style={{ width: 400, height: 400, top: -100, left: -80 }} />
        <div className="blob blob-peach" style={{ width: 360, height: 360, bottom: -100, right: -80 }} />
        <div className="container--narrow" style={{ position: 'relative', textAlign: 'center' }}>
          <p className="t-eyebrow">Our Services</p>
          <h1 className="t-h1" style={{ marginTop: 16 }}>
            Simple Packages.<br />
            <em className="t-accent" style={{ fontStyle: 'normal' }}>Real Results.</em>
          </h1>
          <p className="t-lead" style={{ marginTop: 20 }}>
            Every package is built around your business — not a cookie-cutter template. Not sure where to start? Take our free AI quiz.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
            <Link href="/quiz" className="btn btn-primary btn--lg">Take the Free Quiz First</Link>
            <Link href="/about" className="btn btn-secondary btn--lg">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="section">
        <div className="container">
          <div className="grid-3" style={{ alignItems: 'stretch' }}>
            {tiers.map(({ name, price, priceNote, tagline, highlight, features, cta }) => (
              <div key={name}
                   className={highlight ? 'card card--feature' : 'card card--interactive'}
                   style={highlight ? { transform: 'translateY(-16px)', marginBottom: 16 } : {}}>
                {highlight && <div className="badge badge-peach" style={{ marginBottom: 16 }}>Most Popular</div>}
                <h2 className="t-h4" style={{ color: highlight ? '#fff' : 'var(--ink-100)' }}>{name}</h2>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8, marginBottom: 8 }}>
                  <span className="t-h2" style={{ color: highlight ? '#fff' : 'var(--ink-100)', fontSize: 36 }}>{price}</span>
                  <span className="t-fine" style={{ color: highlight ? 'rgba(250,247,242,0.5)' : 'var(--ink-40)' }}>{priceNote}</span>
                </div>
                <p className="t-small" style={{ color: highlight ? 'rgba(250,247,242,0.7)' : 'var(--ink-60)', marginBottom: 24 }}>{tagline}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'grid', gap: 12 }}>
                  {features.map((f) => (
                    <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <Icon name="check" size={18} style={{ color: highlight ? 'var(--brand-peach)' : 'var(--brand-teal)', flexShrink: 0, marginTop: 2 }} />
                      <span className="t-small" style={{ color: highlight ? 'rgba(250,247,242,0.85)' : 'var(--ink-80)' }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/about" className={highlight ? 'btn btn-on-dark' : 'btn btn-secondary'} style={{ width: '100%', display: 'flex' }}>
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="section section--dark">
        <div className="container">
          <div className="section-header">
            <h2 className="t-h2" style={{ color: '#fff' }}>What&apos;s Included in Every Package</h2>
            <p className="t-body" style={{ color: 'rgba(250,247,242,0.65)', marginTop: 12 }}>Regardless of which package you choose, you always get these with us.</p>
          </div>
          <div className="grid-3">
            {included.map(({ icon, title, body }) => (
              <div key={title} className="card card--dark" style={{ padding: 28 }}>
                <div className="icon-tile icon-tile--dark"><Icon name={icon} /></div>
                <h3 className="t-h4" style={{ color: '#fff' }}>{title}</h3>
                <p className="t-small" style={{ marginTop: 10, color: 'rgba(250,247,242,0.65)' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--cream">
        <div className="container--narrow">
          <div className="section-header">
            <h2 className="t-h2">Common Questions</h2>
          </div>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { q: 'Do I need any technical experience?', a: 'None at all. We handle everything technical — you just need to tell us about your business and goals.' },
              { q: 'How long does implementation take?', a: 'Most implementations are complete within 2–4 weeks depending on complexity. The Starter Audit is delivered within 5 business days.' },
              { q: 'What tools or software do you use?', a: 'We work with leading AI platforms and choose the right tools for your specific needs — never locking you into a single vendor.' },
              { q: 'Can I upgrade my package later?', a: 'Absolutely. Most clients start with the Starter Audit to understand their opportunities, then move to Implementation once they have a clear plan.' },
            ].map(({ q, a }) => (
              <div key={q} className="card card--interactive" style={{ padding: 24 }}>
                <h3 className="t-h4">{q}</h3>
                <p className="t-small" style={{ marginTop: 8 }}>{a}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <p className="t-small" style={{ marginBottom: 16 }}>Still have questions?</p>
            <Link href="/about" className="btn btn-primary btn--lg">
              Contact Us <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
