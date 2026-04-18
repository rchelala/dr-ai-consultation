import type { Metadata } from 'next'
import Link from 'next/link'
import CardHand from '@/components/CardHand'
import type { HandCard } from '@/components/CardHand'
import SmallBusinessRadar from '@/components/SmallBusinessRadar'
import Icon from '@/components/Icon'

export const metadata: Metadata = {
  title: 'What is AI & How it Works | D & R AI Consultation',
  description: 'A plain-English guide to what AI is, how it works, and how small businesses use it every day — no jargon needed.',
}

const whatCards: HandCard[] = [
  {
    badge: '💡',
    heading: 'So... what actually is AI?',
    body: `AI stands for Artificial Intelligence. But don't let that word scare you.

Think of AI as a very fast, very well-read assistant. It has read billions of books, articles, and websites. When you ask it a question, it uses everything it's read to give you a helpful answer — instantly.

It doesn't "think" the way you do. It doesn't have feelings. But it's incredibly good at understanding what you're asking and giving you useful responses.`,
  },
  {
    badge: '📺',
    heading: "You've already been using AI without knowing it",
    body: `AI is everywhere in your daily life:

• When Netflix recommends a show you might like — that's AI.
• When your phone corrects your spelling as you type — that's AI.
• When you speak to Siri or Alexa — that's AI.
• When your email filters out spam — that's AI.

The AI we focus on here — called "generative AI" — is the kind that can hold a conversation, write text, answer questions, and help you brainstorm ideas.`,
  },
  {
    badge: '💬',
    heading: 'What can AI actually do for me?',
    body: `Here are some everyday things people use AI for:

• Writing emails, letters, and messages faster
• Getting quick answers without searching through pages of results
• Summarizing long documents into bullet points
• Brainstorming ideas for your business
• Creating social media posts and captions
• Drafting customer FAQ responses

You don't need to be technical to use it. If you can send a text message, you can use AI.`,
  },
  {
    badge: '🚫',
    heading: 'What AI is NOT',
    body: `Let's clear up some common misunderstandings:

• AI is not a robot that will take over. It's a tool — like a calculator or a search engine.
• AI is not always right. It can make mistakes, so always double-check important information.
• AI is not spying on you when you use it through our site. We don't store your conversations.
• AI is not just for tech people. Millions of small business owners, teachers, and retirees use it every day.`,
  },
]

const stepCards: HandCard[] = [
  {
    badge: '01',
    badgeIsNumber: true,
    heading: 'You ask a question or give a task',
    body: `When you type something to an AI — like "write me an email" or "what are my hours?" — that's called a "prompt." Think of it like texting a very knowledgeable assistant.

The clearer your request, the better the answer. But don't stress about getting it perfect — AI is good at figuring out what you mean.`,
  },
  {
    badge: '02',
    badgeIsNumber: true,
    heading: 'AI reads your message and thinks through an answer',
    body: `The AI has been trained on an enormous amount of text — think billions of books, articles, and websites. When you ask something, it uses patterns from all that reading to figure out the best response.

It doesn't look things up in real time like a search engine. It draws on what it already knows. That's why it's so fast — and also why it can occasionally get something wrong.`,
  },
  {
    badge: '03',
    badgeIsNumber: true,
    heading: 'It writes a response, word by word',
    body: `AI generates its answer one word at a time, which is why you sometimes see text appearing as it "types." It's not pulling an answer from a database — it's constructing a response in real time, based on what word is most likely to come next given everything you've said.

This is why AI can write in so many styles: formal, casual, detailed, or brief — it adapts to what you ask for.`,
  },
  {
    badge: '04',
    badgeIsNumber: true,
    heading: 'You can keep the conversation going',
    body: `Unlike a search engine where each search starts fresh, AI remembers the full conversation while you're chatting. You can say "make it shorter" or "add a more friendly tone" and it will adjust.

This back-and-forth is where AI really shines — you can refine and improve the output until it's exactly what you need.`,
  },
]

export default function WhatIsAIPage() {
  return (
    <div className="relative" style={{ background: 'var(--grad-wash)', overflow: 'hidden' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-teal" style={{ width: 460, height: 460, top: -120, right: -120 }} />
        <div className="blob blob-peach" style={{ width: 400, height: 400, top: '40%', left: -160 }} />
      </div>

      <div className="relative container--narrow" style={{ padding: '80px 24px 64px' }}>

        {/* Header */}
        <div className="section-header animate-fade-up">
          <p className="t-eyebrow">The Basics</p>
          <h1 className="t-h1">What is AI?</h1>
          <p className="t-lead" style={{ marginTop: 16 }}>A plain-English guide for anyone who&apos;s curious but not sure where to start.</p>
        </div>

        {/* Card hand — keep existing animated component */}
        <div className="animate-fade-up" style={{ animationDelay: '100ms', marginBottom: 80 }}>
          <CardHand cards={whatCards} hint="tap to explore" />
        </div>

        {/* How it Works */}
        <div className="section-header animate-fade-up">
          <p className="t-eyebrow">Under the Hood</p>
          <h2 className="t-h2">How AI Works</h2>
          <p className="t-lead" style={{ marginTop: 16 }}>No technical jargon — just a clear picture of what&apos;s actually happening when you talk to AI.</p>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: '100ms', marginBottom: 64 }}>
          <CardHand cards={stepCards} hint="tap to see the steps" />
        </div>

        {/* Small business use cases */}
        <div style={{ marginBottom: 48 }}>
          <div className="section-header">
            <h2 className="t-h2">How small businesses use AI</h2>
            <p className="t-body" style={{ marginTop: 12 }}>Real things real business owners do with AI every day.</p>
          </div>
          <SmallBusinessRadar />
        </div>

        {/* CTA band */}
        <div className="cta-band">
          <h2 className="t-h3" style={{ color: '#fff' }}>See it for yourself</h2>
          <p className="t-small" style={{ color: 'rgba(255,255,255,0.85)', marginTop: 8, marginBottom: 20 }}>
            The best way to understand AI is to try it. Pick a guided prompt and send your first message.
          </p>
          <Link href="/try-ai" className="btn btn-on-dark">
            Try AI Now <Icon name="arrowRight" size={16} />
          </Link>
        </div>

      </div>
    </div>
  )
}
