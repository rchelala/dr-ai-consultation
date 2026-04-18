'use client'

import { useState, FormEvent } from 'react'
import Image from 'next/image'
import Icon from '@/components/Icon'

const FORMSPREE_URL = process.env.NEXT_PUBLIC_FORMSPREE_URL ?? ''

const team = [
  {
    name: 'Robert',
    role: 'Co-Founder & AI Consultant',
    bio: 'Robert brings a passion for making technology accessible to everyday people. His focus is helping small business owners cut through the noise and find practical, real-world uses for AI.',
    photo: '/robert-profile.jpeg',
  },
  {
    name: 'Devin',
    role: 'Co-Founder & AI Consultant',
    bio: 'Devin is dedicated to empowering adults who feel left behind by technology. He specializes in showing non-technical audiences how AI can simplify their work and daily lives.',
    photo: '/devin-profile.jpeg',
  },
]

export default function AboutPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch(FORMSPREE_URL, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      if (res.ok) { setStatus('sent'); form.reset() }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <div style={{ position: 'relative', background: 'var(--grad-wash)', overflow: 'hidden' }}>
      <div className="blob blob-teal" style={{ width: 460, height: 460, top: -100, right: -120 }} />
      <div className="blob blob-peach" style={{ width: 400, height: 400, top: '50%', left: -160 }} />
      <div className="blob blob-sage" style={{ width: 340, height: 340, bottom: -100, left: '25%' }} />

      <div className="relative container--narrow" style={{ padding: '80px 24px 64px' }}>

        {/* Header */}
        <div className="section-header animate-fade-up">
          <p className="t-eyebrow">Who We Are</p>
          <h1 className="t-h1">About D &amp; R AI Consultation</h1>
          <p className="t-lead" style={{ marginTop: 16 }}>We believe AI should be for everyone — not just tech professionals.</p>
        </div>

        {/* Mission */}
        <div className="cta-band" style={{ marginBottom: 48 }}>
          <h2 className="t-h3" style={{ color: '#fff', marginBottom: 12 }}>Our Mission</h2>
          <p className="t-body" style={{ color: 'rgba(255,255,255,0.9)', maxWidth: 540, margin: '0 auto' }}>
            To help everyday people and small business owners understand, explore, and confidently use AI — without needing a tech degree or spending hours on YouTube.
          </p>
        </div>

        {/* Why Work With Us */}
        <div style={{ marginBottom: 64 }}>
          <div className="section-header" style={{ marginBottom: 32 }}>
            <h2 className="t-h2">Why Work With Us</h2>
            <p className="t-body" style={{ marginTop: 10 }}>We bring real operational and data experience that most consultants don&apos;t have.</p>
          </div>
          <div className="grid-3">
            {[
              { icon: 'stethoscope' as const, title: 'Healthcare Data Background', body: 'Robert has worked extensively with healthcare data and operational workflows — giving us a deep understanding of how real businesses actually run.' },
              { icon: 'database' as const, title: 'SQL & Analytics Expertise', body: "We don't just automate tasks — we measure results. You always know what's working and what to improve." },
              { icon: 'wrench' as const, title: 'Real Builders', body: "We've shipped real products: apps, websites, automation workflows. When we commit to building something, we deliver." },
            ].map(({ icon, title, body }) => (
              <div key={title} className="card" style={{ textAlign: 'center' }}>
                <div className="icon-tile" style={{ margin: '0 auto var(--space-5)' }}><Icon name={icon} /></div>
                <h3 className="t-h4">{title}</h3>
                <p className="t-small" style={{ marginTop: 10 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{ marginBottom: 64 }}>
          <div className="section-header" style={{ marginBottom: 32 }}>
            <h2 className="t-h2">Meet the Team</h2>
          </div>
          <div className="grid-2">
            {team.map(({ name, role, bio, photo }) => (
              <div key={name} className="card" style={{ textAlign: 'center' }}>
                <div style={{ width: 96, height: 96, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 16px', boxShadow: '0 0 0 3px rgba(42,107,112,0.2)' }}>
                  <Image src={photo} alt={`${name} profile photo`} width={96} height={96} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 className="t-h4">{name}</h3>
                <p className="t-eyebrow t-eyebrow--muted" style={{ marginTop: 4 }}>{role}</p>
                <p className="t-small" style={{ marginTop: 14 }}>{bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <div className="card" style={{ padding: 40 }}>
          <h2 className="t-h3" style={{ marginBottom: 8 }}>Book a Free AI Strategy Call</h2>
          <p className="t-small" style={{ marginBottom: 24 }}>
            Tell us about your business and we&apos;ll reach out to schedule a free 30-minute strategy call — no commitment required.
          </p>

          {status === 'sent' ? (
            <div style={{ background: 'rgba(42,107,112,0.08)', border: '1px solid rgba(42,107,112,0.2)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <p className="t-small" style={{ color: 'var(--brand-teal)', fontWeight: 600 }}>Message sent!</p>
              <p className="t-fine" style={{ marginTop: 4 }}>We&apos;ll get back to you within 1–2 business days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
              <div>
                <label className="field-label" htmlFor="name">Your Name</label>
                <input id="name" name="name" type="text" required placeholder="Jane Smith" className="field-input" />
              </div>
              <div>
                <label className="field-label" htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" required placeholder="jane@example.com" className="field-input" />
              </div>
              <div>
                <label className="field-label" htmlFor="message">Message</label>
                <textarea id="message" name="message" required rows={4} placeholder="Tell us a little about yourself and what you're looking for..." className="field-textarea" />
              </div>
              {status === 'error' && (
                <p className="t-small" style={{ color: '#e53e3e' }}>Something went wrong. Please try again or email us directly.</p>
              )}
              <button type="submit" disabled={status === 'sending'} className="btn btn-primary btn--lg" style={{ width: '100%', display: 'flex', opacity: status === 'sending' ? 0.6 : 1 }}>
                <Icon name="send" size={14} />
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  )
}
