import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'What is AI? | D & R AI Consultation',
  description: 'A plain-English explanation of artificial intelligence — no jargon, no tech background needed.',
}

const sections = [
  {
    emoji: '🤔',
    heading: 'So... what actually is AI?',
    body: `AI stands for Artificial Intelligence. But don't let that word scare you.

Think of AI as a very fast, very well-read assistant. It has read billions of books, articles, and websites. When you ask it a question, it uses everything it's read to give you a helpful answer — instantly.

It doesn't "think" the way you do. It doesn't have feelings. But it's incredibly good at understanding what you're asking and giving you useful responses.`,
  },
  {
    emoji: '📺',
    heading: 'You\'ve already been using AI without knowing it',
    body: `AI is everywhere in your daily life:

• When Netflix recommends a show you might like — that's AI.
• When your phone corrects your spelling as you type — that's AI.
• When you speak to Siri or Alexa — that's AI.
• When your email filters out spam — that's AI.

The AI we focus on here — called "generative AI" — is the kind that can hold a conversation, write text, answer questions, and help you brainstorm ideas.`,
  },
  {
    emoji: '💬',
    heading: 'What can AI actually do for me?',
    body: `Here are some everyday things people use AI for:

• Writing emails, letters, and messages faster
• Getting quick answers to questions without searching through pages of results
• Summarizing long documents into bullet points
• Brainstorming ideas for your business
• Creating social media posts and captions
• Drafting customer FAQ responses

You don't need to be technical to use it. If you can send a text message, you can use AI.`,
  },
  {
    emoji: '🚫',
    heading: 'What AI is NOT',
    body: `Let's clear up some common misunderstandings:

• AI is not a robot that will take over. It's a tool — like a calculator or a search engine.
• AI is not always right. It can make mistakes, so always double-check important information.
• AI is not spying on you when you use it through our site. We don't store your conversations.
• AI is not just for tech people. Millions of small business owners, teachers, and retirees use it every day.`,
  },
]

export default function WhatIsAIPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <p className="text-xs font-semibold text-brand-purple tracking-widest uppercase mb-3">
          The Basics
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
          What is AI?
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          A plain-English guide for anyone who's curious but not sure where to start.
        </p>
      </div>

      <div className="space-y-10">
        {sections.map(({ emoji, heading, body }) => (
          <div key={heading} className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-purple-50">
            <div className="flex items-start gap-4">
              <span className="text-3xl mt-1 shrink-0">{emoji}</span>
              <div>
                <h2 className="text-xl font-semibold text-brand-navy mb-3">{heading}</h2>
                <div className="text-gray-600 leading-relaxed whitespace-pre-line">{body}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Next step CTA */}
      <div className="mt-12 bg-brand-gradient rounded-xl p-8 text-white text-center">
        <h2 className="text-xl font-bold mb-2">Ready to go deeper?</h2>
        <p className="opacity-90 mb-5 text-sm">
          Now that you know what AI is, find out how it actually works — and how small businesses are using it today.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/how-it-works"
            className="bg-white text-brand-purple font-semibold rounded-lg px-6 py-2.5 hover:opacity-90 transition-opacity text-sm"
          >
            How it Works →
          </Link>
          <Link
            href="/try-ai"
            className="border border-white/50 bg-white/10 text-white font-semibold rounded-lg px-6 py-2.5 hover:bg-white/20 transition-colors text-sm"
          >
            Try AI Now
          </Link>
        </div>
      </div>
    </div>
  )
}
