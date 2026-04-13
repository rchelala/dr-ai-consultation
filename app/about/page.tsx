'use client'

import { useState, FormEvent } from 'react'

const FORMSPREE_URL = process.env.NEXT_PUBLIC_FORMSPREE_URL ?? ''

const team = [
  {
    name: 'Robert',
    role: 'Co-Founder & AI Consultant',
    bio: 'Robert brings a passion for making technology accessible to everyday people. His focus is helping small business owners cut through the noise and find practical, real-world uses for AI.',
    initial: 'R',
  },
  {
    name: 'Devin',
    role: 'Co-Founder & AI Consultant',
    bio: 'Devin is dedicated to empowering adults who feel left behind by technology. He specializes in showing non-technical audiences how AI can simplify their work and daily lives.',
    initial: 'D',
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
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs font-semibold text-brand-purple tracking-widest uppercase mb-3">
          Who We Are
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
          About D & R AI Consultation
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          We believe AI should be for everyone — not just tech professionals.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-brand-gradient rounded-xl p-8 text-white mb-10 text-center">
        <h2 className="text-xl font-bold mb-3">Our Mission</h2>
        <p className="opacity-90 leading-relaxed max-w-xl mx-auto">
          To help everyday people and small business owners understand, explore, and confidently
          use AI — without needing a tech degree or spending hours on YouTube.
        </p>
      </div>

      {/* Team */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-brand-navy text-center mb-8">Meet the Team</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {team.map(({ name, role, bio, initial }) => (
            <div key={name} className="bg-white rounded-xl p-6 shadow-sm border border-purple-50 text-center">
              <div className="w-16 h-16 bg-brand-gradient rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {initial}
              </div>
              <h3 className="font-bold text-brand-navy text-lg">{name}</h3>
              <p className="text-brand-purple text-xs font-semibold mb-3">{role}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact form */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-purple-50">
        <h2 className="text-2xl font-bold text-brand-navy mb-2">Get in Touch</h2>
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
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple"
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
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple"
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
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple resize-none"
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
              className="w-full bg-brand-gradient text-white font-semibold rounded-lg py-3 text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
