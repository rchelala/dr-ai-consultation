'use client'

import { useState, FormEvent } from 'react'
import Image from 'next/image'

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
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="relative overflow-hidden" style={{ background: 'linear-gradient(140deg, rgba(140,197,184,0.2) 0%, #faf7f2 40%, rgba(255,179,107,0.16) 100%)' }}>
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-[460px] h-[460px] rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(72,185,187,0.28)' }} />
      <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(255,179,107,0.22)' }} />
      <div className="absolute -bottom-24 left-1/4 w-[340px] h-[340px] rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(140,197,184,0.2)' }} />

      <div className="relative max-w-3xl mx-auto px-4 pt-20 pb-12">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-brand-purple tracking-[0.2em] uppercase mb-3">
            Who We Are
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-4">
            About D & R AI Consultation
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            We believe AI should be for everyone — not just tech professionals.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-brand-gradient rounded-xl p-8 text-gray-500 mb-10 text-center">
          <h2 className="font-display text-xl font-bold mb-3">Our Mission</h2>
          <p className="opacity-90 leading-relaxed max-w-xl mx-auto">
            To help everyday people and small business owners understand, explore, and confidently
            use AI — without needing a tech degree or spending hours on YouTube.
          </p>
        </div>

        {/* Team */}
        <div className="mb-14">
          <h2 className="font-display text-2xl font-bold text-brand-navy text-center mb-8">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {team.map(({ name, role, bio, photo }) => (
              <div
                key={name}
                className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-xl p-6 shadow-md text-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-2 ring-brand-purple/25">
                  <Image
                    src={photo}
                    alt={`${name} profile photo`}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display font-bold text-brand-navy text-lg">{name}</h3>
                <p className="text-brand-purple text-xs font-semibold mb-3">{role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-xl p-8 shadow-md">
          <h2 className="font-display text-2xl font-bold text-brand-navy mb-2">Get in Touch</h2>
          <p className="text-gray-500 text-sm mb-6">
            Have a question or want to learn more about working with us? Send us a message.
          </p>

          {status === 'sent' ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-green-700 font-semibold">Message sent!</p>
              <p className="text-green-600 text-sm mt-1">We'll get back to you within 1-2 business days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Jane Smith"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple bg-white/70"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@example.com"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple bg-white/70"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us a little about yourself and what you're looking for..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple resize-none bg-white/70"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-brand-gradient text-gray-500 font-semibold rounded-full py-3 text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
