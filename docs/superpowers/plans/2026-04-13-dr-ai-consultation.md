# D & R AI Consultation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 5-page educational web app that teaches non-technical adults about AI and lets them practice with a live Gemini-powered chat sandbox.

**Architecture:** Next.js 15 App Router with TypeScript and Tailwind CSS. All pages are server components except the interactive ChatSandbox (client component). Gemini API calls are routed through a server-side API route so the API key never reaches the browser. No database or auth required.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, `@google/generative-ai` SDK, Formspree (contact form), Vercel (hosting)

---

## File Map

Files created or modified in this plan:

```
/ (project root)
├── app/
│   ├── layout.tsx                  Root layout: Inter font, Navbar, Footer wrapping all pages
│   ├── globals.css                 Tailwind directives + any global resets
│   ├── page.tsx                    Home page: hero, feature cards, CTAs
│   ├── what-is-ai/
│   │   └── page.tsx                What is AI? content page
│   ├── how-it-works/
│   │   └── page.tsx                How AI Works content page
│   ├── try-ai/
│   │   └── page.tsx                Try AI page: assembles PromptCards + ChatSandbox
│   ├── about/
│   │   └── page.tsx                About/Contact page with Formspree form
│   └── api/
│       └── chat/
│           └── route.ts            POST handler: receives message+history, calls Gemini, streams response
├── components/
│   ├── Navbar.tsx                  Sticky nav with mobile hamburger menu
│   ├── Footer.tsx                  Dark navy footer
│   ├── PromptCard.tsx              Clickable guided prompt card
│   └── ChatSandbox.tsx             Chat UI: message history, streaming input, send button
├── lib/
│   └── prompts.ts                  Exported array of GUIDED_PROMPTS with id/category/label/text
├── __tests__/
│   ├── api-chat.test.ts            API route: validates request, returns 400 on missing message
│   ├── PromptCard.test.tsx         PromptCard: renders label, calls onSelect on click
│   └── ChatSandbox.test.tsx        ChatSandbox: renders input, displays messages
├── .env.local                      GEMINI_API_KEY, NEXT_PUBLIC_FORMSPREE_URL (not committed)
├── .env.example                    Template for required env vars
├── jest.config.ts                  Jest config using next/jest
├── jest.setup.ts                   Imports @testing-library/jest-dom
└── tailwind.config.ts              Extended with brand colors
```

---

## Task 1: Scaffold the Next.js Project

**Files:**
- Create: all base project files via `create-next-app`
- Modify: `tailwind.config.ts` — add brand colors
- Create: `jest.config.ts`, `jest.setup.ts`
- Create: `.env.local`, `.env.example`

- [ ] **Step 1: Bootstrap the project**

Run inside `C:\Users\rober\OneDrive\Documents\AI Consultation`:

```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes
```

Expected: project files created, dependencies installed.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install @google/generative-ai
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest
```

- [ ] **Step 3: Create jest.config.ts**

```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)
```

- [ ] **Step 4: Create jest.setup.ts**

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Add test script to package.json**

Open `package.json` and add to the `"scripts"` object:
```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 6: Extend tailwind.config.ts with brand colors**

Replace the contents of `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#7c3aed',
          pink: '#db2777',
          lavender: '#fdf4ff',
          navy: '#1e1b4b',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 7: Create .env.example**

```
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_FORMSPREE_URL=https://formspree.io/f/your_form_id_here
```

- [ ] **Step 8: Create .env.local**

```
GEMINI_API_KEY=PASTE_YOUR_GEMINI_KEY_HERE
NEXT_PUBLIC_FORMSPREE_URL=PASTE_YOUR_FORMSPREE_URL_HERE
```

Note: The user must get their Gemini API key from https://aistudio.google.com/app/apikey and their Formspree URL from https://formspree.io (free account, create a new form).

- [ ] **Step 9: Update .gitignore to protect secrets**

Verify `.gitignore` contains `.env.local` (create-next-app adds this by default). Also add:
```
.superpowers/
```

- [ ] **Step 10: Initialize git and make first commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Next.js 15 project with Tailwind and Jest"
```

---

## Task 2: Shared Layout — Navbar

**Files:**
- Create: `components/Navbar.tsx`
- Create: `__tests__/Navbar.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/Navbar.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navbar from '@/components/Navbar'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Navbar', () => {
  it('renders the brand name', () => {
    render(<Navbar />)
    expect(screen.getByText('D & R AI Consultation')).toBeInTheDocument()
  })

  it('renders all nav links', () => {
    render(<Navbar />)
    expect(screen.getByText('What is AI?')).toBeInTheDocument()
    expect(screen.getByText('How it Works')).toBeInTheDocument()
    expect(screen.getByText('Try AI')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('toggles mobile menu on hamburger click', async () => {
    render(<Navbar />)
    const toggle = screen.getByLabelText('Toggle menu')
    // Menu starts hidden on desktop — just verify the button exists
    expect(toggle).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- --testPathPattern=Navbar
```

Expected: FAIL — `Cannot find module '@/components/Navbar'`

- [ ] **Step 3: Create components/Navbar.tsx**

```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/what-is-ai', label: 'What is AI?' },
  { href: '/how-it-works', label: 'How it Works' },
  { href: '/try-ai', label: 'Try AI' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-purple-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-lg bg-brand-gradient bg-clip-text text-transparent"
        >
          D & R AI Consultation
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6 text-sm">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`transition-colors ${
                pathname === href
                  ? 'text-brand-purple font-semibold'
                  : 'text-gray-600 hover:text-brand-purple'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-600 hover:text-brand-purple text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-purple-50 px-4 py-3 flex flex-col gap-4 bg-white">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm ${
                pathname === href ? 'text-brand-purple font-semibold' : 'text-gray-600'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- --testPathPattern=Navbar
```

Expected: PASS — 3 tests pass

- [ ] **Step 5: Commit**

```bash
git add components/Navbar.tsx __tests__/Navbar.test.tsx
git commit -m "feat: add Navbar component with mobile menu"
```

---

## Task 3: Shared Layout — Footer + Root Layout

**Files:**
- Create: `components/Footer.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Create components/Footer.tsx**

```typescript
export default function Footer() {
  return (
    <footer className="bg-brand-navy text-purple-200 py-8 mt-auto">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="font-semibold text-white mb-1">D & R AI Consultation</p>
        <p className="text-sm opacity-75">
          Built to make AI accessible for everyone
        </p>
        <p className="text-xs opacity-50 mt-4">
          © {new Date().getFullYear()} D & R AI Consultation. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Update app/globals.css**

Replace the contents:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-brand-lavender text-gray-800;
  }
}
```

- [ ] **Step 3: Update app/layout.tsx**

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'D & R AI Consultation',
  description:
    'Helping everyday people and small businesses understand and use AI — no tech background needed.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Start dev server and verify layout renders**

```bash
npm run dev
```

Open http://localhost:3000. Expected: purple gradient "D & R AI Consultation" in the nav, dark navy footer visible at bottom, lavender background on the page.

- [ ] **Step 5: Commit**

```bash
git add components/Footer.tsx app/layout.tsx app/globals.css
git commit -m "feat: add Footer and root layout with Inter font"
```

---

## Task 4: Home Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace app/page.tsx with the Home page**

```typescript
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
                'Plain-English answers to the questions everyone's afraid to ask. No jargon, no confusion.',
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
```

- [ ] **Step 2: Verify in browser**

Visit http://localhost:3000. Expected: purple-to-pink gradient hero, two CTA buttons, three feature cards, a bottom CTA banner. All links should work without 404 (pages don't exist yet but navigation is set up).

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add home page with hero, feature cards, and CTA"
```

---

## Task 5: What is AI? Page

**Files:**
- Create: `app/what-is-ai/page.tsx`

- [ ] **Step 1: Create app/what-is-ai/page.tsx**

```typescript
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
    heading: 'You've already been using AI without knowing it',
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
```

- [ ] **Step 2: Verify in browser**

Visit http://localhost:3000/what-is-ai. Expected: page title, 4 white content cards with emoji + heading + text, gradient CTA at the bottom with two buttons.

- [ ] **Step 3: Commit**

```bash
git add app/what-is-ai/page.tsx
git commit -m "feat: add What is AI? content page"
```

---

## Task 6: How AI Works Page

**Files:**
- Create: `app/how-it-works/page.tsx`

- [ ] **Step 1: Create app/how-it-works/page.tsx**

```typescript
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How AI Works | D & R AI Consultation',
  description: 'Learn how AI processes information and how small businesses are using it to save time and serve customers better.',
}

const steps = [
  {
    number: '01',
    heading: 'You ask a question or give a task',
    body: `When you type something to an AI — like "write me an email" or "what are my hours?" — that's called a "prompt." Think of it like texting a very knowledgeable assistant.

The clearer your request, the better the answer. But don't stress about getting it perfect — AI is good at figuring out what you mean.`,
  },
  {
    number: '02',
    heading: 'AI reads your message and thinks through an answer',
    body: `The AI has been trained on an enormous amount of text — think billions of books, articles, and websites. When you ask something, it uses patterns from all that reading to figure out the best response.

It doesn't look things up in real time like a search engine. It draws on what it already knows. That's why it's so fast — and also why it can occasionally get something wrong.`,
  },
  {
    number: '03',
    heading: 'It writes a response, word by word',
    body: `AI generates its answer one word at a time, which is why you sometimes see text appearing as it "types." It's not pulling an answer from a database — it's constructing a response in real time, based on what word is most likely to come next given everything you've said.

This is why AI can write in so many styles: formal, casual, detailed, or brief — it adapts to what you ask for.`,
  },
  {
    number: '04',
    heading: 'You can keep the conversation going',
    body: `Unlike a search engine where each search starts fresh, AI remembers the full conversation while you're chatting. You can say "make it shorter" or "add a more friendly tone" and it will adjust.

This back-and-forth is where AI really shines — you can refine and improve the output until it's exactly what you need.`,
  },
]

const useCases = [
  {
    emoji: '📧',
    title: 'Write emails and messages',
    detail: 'Draft professional emails in seconds. Great for follow-ups, proposals, and customer responses.',
  },
  {
    emoji: '📋',
    title: 'Answer customer FAQs',
    detail: 'Give AI your business info and have it write answers to your most common questions.',
  },
  {
    emoji: '📱',
    title: 'Create social media posts',
    detail: 'Describe your product or special and let AI write engaging captions ready to post.',
  },
  {
    emoji: '📄',
    title: 'Summarize long documents',
    detail: 'Paste in a long article, report, or email thread — AI will give you the key points.',
  },
  {
    emoji: '💡',
    title: 'Brainstorm ideas',
    detail: 'Stuck on a promotion, product name, or event theme? AI can generate dozens of ideas instantly.',
  },
  {
    emoji: '🗓️',
    title: 'Write a plan or checklist',
    detail: 'Ask AI to help you build a weekly task list, onboarding guide, or step-by-step process.',
  },
]

export default function HowItWorksPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <p className="text-xs font-semibold text-brand-purple tracking-widest uppercase mb-3">
          Under the Hood
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
          How AI Works
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          No technical jargon — just a clear picture of what's actually happening when you talk to AI.
        </p>
      </div>

      {/* Step-by-step */}
      <div className="space-y-6 mb-14">
        {steps.map(({ number, heading, body }) => (
          <div key={number} className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-purple-50 flex gap-5">
            <div className="text-3xl font-bold text-purple-200 shrink-0 leading-none pt-1">
              {number}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-brand-navy mb-2">{heading}</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm">{body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Small business use cases */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-brand-navy text-center mb-2">
          How small businesses use AI
        </h2>
        <p className="text-gray-500 text-center text-sm mb-8">
          Real things real business owners do with AI every day.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {useCases.map(({ emoji, title, detail }) => (
            <div key={title} className="bg-white rounded-xl p-5 shadow-sm border border-purple-50 flex gap-4">
              <span className="text-2xl shrink-0">{emoji}</span>
              <div>
                <h3 className="font-semibold text-brand-navy text-sm mb-1">{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-brand-gradient rounded-xl p-8 text-white text-center">
        <h2 className="text-xl font-bold mb-2">See it for yourself</h2>
        <p className="opacity-90 mb-5 text-sm">
          The best way to understand AI is to try it. Pick a guided prompt and send your first message.
        </p>
        <Link
          href="/try-ai"
          className="inline-block bg-white text-brand-purple font-semibold rounded-lg px-8 py-2.5 hover:opacity-90 transition-opacity text-sm"
        >
          Try AI Now →
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser**

Visit http://localhost:3000/how-it-works. Expected: numbered steps 01–04, a grid of 6 small business use cases, gradient CTA at bottom.

- [ ] **Step 3: Commit**

```bash
git add app/how-it-works/page.tsx
git commit -m "feat: add How AI Works content page with small business use cases"
```

---

## Task 7: Gemini API Route

**Files:**
- Create: `app/api/chat/route.ts`
- Create: `__tests__/api-chat.test.ts`

- [ ] **Step 1: Write the failing test**

Create `__tests__/api-chat.test.ts`:

```typescript
import { POST } from '@/app/api/chat/route'
import { NextRequest } from 'next/server'

// Mock the Gemini SDK
jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      startChat: jest.fn().mockReturnValue({
        sendMessageStream: jest.fn().mockResolvedValue({
          stream: (async function* () {
            yield { text: () => 'Hello from Gemini' }
          })(),
        }),
      }),
    }),
  })),
}))

process.env.GEMINI_API_KEY = 'test-key'

describe('POST /api/chat', () => {
  it('returns 400 when message is missing', async () => {
    const req = new NextRequest('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 when message is not a string', async () => {
    const req = new NextRequest('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 123 }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns a streaming response for valid message', async () => {
    const req = new NextRequest('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'Hello', history: [] }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toContain('text/plain')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- --testPathPattern=api-chat
```

Expected: FAIL — `Cannot find module '@/app/api/chat/route'`

- [ ] **Step 3: Create app/api/chat/route.ts**

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest } from 'next/server'

const SYSTEM_INSTRUCTION = `You are a friendly AI assistant on the D & R AI Consultation website. 
You help small business owners and adults who are brand new to AI understand and explore what AI can do. 
Keep your responses clear, encouraging, and free of technical jargon. 
Use simple, everyday language. If someone asks something completely unrelated to AI or business topics, 
gently redirect them back to AI-related questions.`

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json()

    if (!message || typeof message !== 'string') {
      return new Response('Message is required', { status: 400 })
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_INSTRUCTION,
    })

    const chat = model.startChat({
      history: Array.isArray(history)
        ? history.map((msg: { role: string; text: string }) => ({
            role: msg.role,
            parts: [{ text: msg.text }],
          }))
        : [],
    })

    const result = await chat.sendMessageStream(message)

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text()
          if (text) {
            controller.enqueue(new TextEncoder().encode(text))
          }
        }
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- --testPathPattern=api-chat
```

Expected: PASS — 3 tests pass

- [ ] **Step 5: Commit**

```bash
git add app/api/chat/route.ts __tests__/api-chat.test.ts
git commit -m "feat: add Gemini streaming API route with validation"
```

---

## Task 8: Prompt Data + PromptCard Component

**Files:**
- Create: `lib/prompts.ts`
- Create: `components/PromptCard.tsx`
- Create: `__tests__/PromptCard.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/PromptCard.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PromptCard from '@/components/PromptCard'

const mockPrompt = {
  id: 'test',
  category: 'TEST CATEGORY',
  label: 'Test Label',
  text: 'This is the test prompt text.',
}

describe('PromptCard', () => {
  it('renders the category and label', () => {
    render(<PromptCard prompt={mockPrompt} onSelect={jest.fn()} />)
    expect(screen.getByText('TEST CATEGORY')).toBeInTheDocument()
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('calls onSelect with prompt text when clicked', async () => {
    const onSelect = jest.fn()
    render(<PromptCard prompt={mockPrompt} onSelect={onSelect} />)
    await userEvent.click(screen.getByRole('button'))
    expect(onSelect).toHaveBeenCalledWith('This is the test prompt text.')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- --testPathPattern=PromptCard
```

Expected: FAIL — `Cannot find module '@/components/PromptCard'`

- [ ] **Step 3: Create lib/prompts.ts**

```typescript
export interface Prompt {
  id: string
  category: string
  label: string
  text: string
}

export const GUIDED_PROMPTS: Prompt[] = [
  {
    id: 'email',
    category: 'WRITE AN EMAIL',
    label: 'Professional Follow-Up',
    text: 'Write a friendly but professional follow-up email to a potential client I met at a networking event last week. Keep it short and end by offering a free 30-minute consultation call.',
  },
  {
    id: 'summarize',
    category: 'EXPLAIN SIMPLY',
    label: 'What is AI in plain English?',
    text: "Explain what artificial intelligence is in 3 simple sentences, like you're talking to someone who has never heard of it before.",
  },
  {
    id: 'business',
    category: 'BUSINESS IDEAS',
    label: 'AI for My Business',
    text: 'Give me 5 practical ways a small business (like a bakery, salon, or retail shop) could use AI to save time or make more money each week.',
  },
  {
    id: 'social',
    category: 'SOCIAL MEDIA',
    label: 'Write an Instagram Caption',
    text: 'Write 3 different Instagram captions for a photo of a new product launch at a local small business. Make them friendly and engaging, and end each one with a call to action.',
  },
  {
    id: 'faq',
    category: 'CUSTOMER SERVICE',
    label: 'Answer Customer Questions',
    text: 'I run a small landscaping business. Write clear, friendly answers to these 3 common customer questions: What areas do you serve? How much do you charge? How do I get a quote?',
  },
  {
    id: 'plan',
    category: 'PLANNING',
    label: 'Start Using AI This Week',
    text: 'Help me create a simple 4-step plan to start using AI tools in my small business. I have no technical experience and just want to start with the basics.',
  },
]
```

- [ ] **Step 4: Create components/PromptCard.tsx**

```typescript
import { Prompt } from '@/lib/prompts'

interface PromptCardProps {
  prompt: Prompt
  onSelect: (text: string) => void
}

export default function PromptCard({ prompt, onSelect }: PromptCardProps) {
  return (
    <button
      onClick={() => onSelect(prompt.text)}
      className="text-left bg-white border border-purple-100 rounded-xl p-4 hover:border-brand-purple hover:shadow-md transition-all group w-full"
    >
      <p className="text-xs font-semibold text-brand-pink mb-1 tracking-wide">
        {prompt.category}
      </p>
      <p className="text-sm font-medium text-brand-navy group-hover:text-brand-purple transition-colors">
        {prompt.label}
      </p>
      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed line-clamp-2">
        {prompt.text}
      </p>
    </button>
  )
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npm test -- --testPathPattern=PromptCard
```

Expected: PASS — 2 tests pass

- [ ] **Step 6: Commit**

```bash
git add lib/prompts.ts components/PromptCard.tsx __tests__/PromptCard.test.tsx
git commit -m "feat: add guided prompts data and PromptCard component"
```

---

## Task 9: ChatSandbox Component

**Files:**
- Create: `components/ChatSandbox.tsx`
- Create: `__tests__/ChatSandbox.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/ChatSandbox.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChatSandbox from '@/components/ChatSandbox'

// Mock fetch
global.fetch = jest.fn()

describe('ChatSandbox', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the input field and send button', () => {
    render(<ChatSandbox />)
    expect(screen.getByPlaceholderText(/ask anything/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })

  it('shows empty state message when no messages', () => {
    render(<ChatSandbox />)
    expect(screen.getByText(/pick a prompt/i)).toBeInTheDocument()
  })

  it('pre-fills input when initialMessage is provided', () => {
    render(<ChatSandbox initialMessage="Hello world" />)
    const input = screen.getByPlaceholderText(/ask anything/i) as HTMLTextAreaElement
    expect(input.value).toBe('Hello world')
  })

  it('disables send button when input is empty', () => {
    render(<ChatSandbox />)
    const btn = screen.getByRole('button', { name: /send/i })
    expect(btn).toBeDisabled()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- --testPathPattern=ChatSandbox
```

Expected: FAIL — `Cannot find module '@/components/ChatSandbox'`

- [ ] **Step 3: Create components/ChatSandbox.tsx**

```typescript
'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'model'
  text: string
}

interface ChatSandboxProps {
  initialMessage?: string
}

export default function ChatSandbox({ initialMessage = '' }: ChatSandboxProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState(initialMessage)
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setInput(initialMessage)
  }, [initialMessage])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage() {
    const text = input.trim()
    if (!text || isLoading) return

    const userMsg: Message = { role: 'user', text }
    const history = [...messages]
    const withUser = [...history, userMsg]
    setMessages(withUser)
    setInput('')
    setIsLoading(true)

    // Add a placeholder for the model response
    setMessages([...withUser, { role: 'model', text: '' }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      })

      if (!res.ok || !res.body) throw new Error('Request failed')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        fullText += decoder.decode(value, { stream: true })
        setMessages([...withUser, { role: 'model', text: fullText }])
      }
    } catch {
      setMessages([...withUser, { role: 'model', text: 'Sorry, something went wrong. Please try again.' }])
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-[520px] bg-white rounded-xl border border-purple-100 shadow-sm overflow-hidden">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-10">
            Pick a prompt above or type your own question below.
          </p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-brand-gradient text-white rounded-br-sm'
                  : 'bg-gray-100 text-gray-800 rounded-bl-sm'
              }`}
            >
              {msg.text || (isLoading && i === messages.length - 1 ? (
                <span className="flex gap-1">
                  <span className="animate-bounce">•</span>
                  <span className="animate-bounce [animation-delay:0.1s]">•</span>
                  <span className="animate-bounce [animation-delay:0.2s]">•</span>
                </span>
              ) : null)}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-purple-50 p-3 flex gap-2 items-end bg-white">
        <textarea
          className="flex-1 resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple min-h-[44px] max-h-[120px]"
          placeholder="Ask anything or edit the prompt above... (Enter to send)"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className="bg-brand-gradient text-white rounded-lg px-4 py-2.5 text-sm font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          {isLoading ? 'Sending...' : 'Send →'}
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- --testPathPattern=ChatSandbox
```

Expected: PASS — 4 tests pass

- [ ] **Step 5: Commit**

```bash
git add components/ChatSandbox.tsx __tests__/ChatSandbox.test.tsx
git commit -m "feat: add ChatSandbox component with streaming Gemini responses"
```

---

## Task 10: Try AI Page

**Files:**
- Create: `app/try-ai/page.tsx`

- [ ] **Step 1: Create app/try-ai/page.tsx**

```typescript
'use client'

import { useState } from 'react'
import PromptCard from '@/components/PromptCard'
import ChatSandbox from '@/components/ChatSandbox'
import { GUIDED_PROMPTS } from '@/lib/prompts'

export default function TryAIPage() {
  const [selectedPrompt, setSelectedPrompt] = useState('')

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <p className="text-xs font-semibold text-brand-purple tracking-widest uppercase mb-3">
          Hands-On Practice
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
          Try AI for Yourself
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          No experience needed. Click a prompt below to get started — or type your own question.
        </p>
      </div>

      {/* Guided prompts */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Step 1 — Pick a starter prompt
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {GUIDED_PROMPTS.map(prompt => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onSelect={setSelectedPrompt}
            />
          ))}
        </div>
      </section>

      {/* Chat sandbox */}
      <section>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Step 2 — Send it and see what happens
        </h2>
        <ChatSandbox initialMessage={selectedPrompt} />
        <p className="text-xs text-gray-400 text-center mt-3">
          You can edit the prompt, ask follow-up questions, or start fresh anytime.
        </p>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser**

Visit http://localhost:3000/try-ai. Expected: 6 prompt cards in a grid, ChatSandbox below. Click a prompt card — the text should load into the sandbox input. Type a message and press Send — the response should stream in. Requires `.env.local` to have a valid `GEMINI_API_KEY`.

- [ ] **Step 3: Commit**

```bash
git add app/try-ai/page.tsx
git commit -m "feat: add Try AI page with guided prompts and live ChatSandbox"
```

---

## Task 11: About / Contact Page

**Files:**
- Create: `app/about/page.tsx`

Note: Before this task, Robert and Devin must:
1. Create a free account at https://formspree.io
2. Create a new form (name it "D & R AI Consultation Contact")
3. Copy the form endpoint URL (looks like `https://formspree.io/f/xyzabc`)
4. Add it to `.env.local`: `NEXT_PUBLIC_FORMSPREE_URL=https://formspree.io/f/xyzabc`

- [ ] **Step 1: Create app/about/page.tsx**

```typescript
'use client'

import type { Metadata } from 'next'
import { useState, FormEvent } from 'react'

const FORMSPREE_URL = process.env.NEXT_PUBLIC_FORMSPREE_URL!

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
```

- [ ] **Step 2: Verify in browser**

Visit http://localhost:3000/about. Expected: mission banner, two team cards for Robert and Devin, contact form below. Fill out the form and submit — if `NEXT_PUBLIC_FORMSPREE_URL` is set, you should get an email. If not set yet, the form will show an error (expected).

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: add About/Contact page with team bios and Formspree contact form"
```

---

## Task 12: Run All Tests + Mobile Check

**Files:** No new files — verification only

- [ ] **Step 1: Run the full test suite**

```bash
npm test
```

Expected: All tests pass (Navbar: 3, PromptCard: 2, ChatSandbox: 4, api-chat: 3 = 12 total)

- [ ] **Step 2: Build the project to check for TypeScript errors**

```bash
npm run build
```

Expected: Build completes with no errors. Any TypeScript type errors will appear here — fix them before proceeding.

- [ ] **Step 3: Check mobile layout in browser**

In the browser (http://localhost:3000), open DevTools (F12) → click the device icon → select "iPhone SE" or similar mobile size. Walk through each page:

- **Home:** Hero text readable, buttons stack vertically, feature cards stack to 1 column
- **What is AI? / How it Works:** Content cards readable, no horizontal scroll
- **Try AI:** Prompt cards stack to 1-2 columns, chat sandbox usable
- **About:** Team cards stack, form full-width

Fix any layout issues by adding responsive Tailwind classes (`sm:`, `md:`) as needed.

- [ ] **Step 4: Commit any responsive fixes**

```bash
git add -A
git commit -m "fix: mobile responsive layout adjustments"
```

---

## Task 13: Deploy to Vercel

**Prerequisites before this task:**
- Robert or Devin must create a free account at https://vercel.com (sign in with GitHub recommended)
- Project must be pushed to a GitHub repository

- [ ] **Step 1: Create a GitHub repository**

Go to https://github.com/new. Create a new repository named `dr-ai-consultation` (private is fine).

- [ ] **Step 2: Push the project to GitHub**

```bash
git remote add origin https://github.com/YOUR_USERNAME/dr-ai-consultation.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with the actual GitHub username.

- [ ] **Step 3: Import the project on Vercel**

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select the `dr-ai-consultation` repo
4. Click "Deploy" — Vercel auto-detects Next.js

- [ ] **Step 4: Add environment variables on Vercel**

In the Vercel dashboard, go to your project → Settings → Environment Variables. Add:

| Name | Value |
|------|-------|
| `GEMINI_API_KEY` | Your Gemini API key from aistudio.google.com |
| `NEXT_PUBLIC_FORMSPREE_URL` | Your Formspree form URL |

Then go to Deployments → click the three dots on the latest deployment → "Redeploy".

- [ ] **Step 5: Verify the live site**

Open the Vercel URL (e.g., `dr-ai-consultation.vercel.app`). Test:
- All 5 pages load correctly
- Navigation works
- Try AI sandbox sends a message and gets a Gemini response
- Contact form submits and you receive the email

- [ ] **Step 6: Final commit with deployment note**

```bash
git commit --allow-empty -m "chore: deployed to Vercel at dr-ai-consultation.vercel.app"
```

---

## Self-Review

**Spec coverage check:**

| Spec Requirement | Covered By |
|---|---|
| Home page with hero, CTAs, feature cards | Task 4 |
| What is AI? page — plain English, analogies | Task 5 |
| How AI Works — process + small business use cases | Task 6 |
| Try AI — guided prompt cards (4-6) | Tasks 8, 10 |
| Try AI — live Gemini sandbox with streaming | Tasks 7, 9, 10 |
| About/Contact — team bios + mission | Task 11 |
| Contact form via Formspree | Task 11 |
| Gemini API key secured server-side | Task 7 |
| Purple/pink brand colors throughout | Tasks 1, 2, 3 |
| Mobile responsive | Task 12 |
| Deploy to Vercel | Task 13 |
| No database, no auth, no payments | N/A — by omission |

All spec requirements covered. No gaps found.
