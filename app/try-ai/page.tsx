'use client'

import { useState } from 'react'
import PromptCard from '@/components/PromptCard'
import ChatSandbox from '@/components/ChatSandbox'
import { GUIDED_PROMPTS } from '@/lib/prompts'

export default function TryAIPage() {
  const [selectedPrompt, setSelectedPrompt] = useState('')

  return (
    <div className="relative overflow-hidden" style={{ background: 'var(--grad-wash)' }}>
      <div className="blob blob-teal" style={{ width: 460, height: 460, top: -120, right: -120 }} />
      <div className="blob blob-peach" style={{ width: 400, height: 400, top: '50%', left: -160 }} />

      <div className="relative container" style={{ padding: '80px 24px 64px' }}>
        <div className="section-header animate-fade-up">
          <p className="t-eyebrow">Live Demo</p>
          <h1 className="t-h1">Try AI for Your Business</h1>
          <p className="t-lead" style={{ marginTop: 16 }}>See exactly what AI can do — right now. Pick a real business prompt below, or type your own.</p>
        </div>

        {/* Guided prompts */}
        <section style={{ marginBottom: 32 }}>
          <p className="t-eyebrow t-eyebrow--muted" style={{ marginBottom: 16 }}>Step 1 — Pick a starter prompt</p>
          <div className="grid-3" style={{ gap: 16 }}>
            {GUIDED_PROMPTS.map(prompt => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                onSelect={setSelectedPrompt}
              />
            ))}
          </div>
        </section>

        {/* Chat sandbox — keep existing component */}
        <section>
          <p className="t-eyebrow t-eyebrow--muted" style={{ marginBottom: 16 }}>Step 2 — Send it and see what happens</p>
          <ChatSandbox initialMessage={selectedPrompt} />
          <p className="t-fine" style={{ textAlign: 'center', marginTop: 12 }}>
            You can edit the prompt, ask follow-up questions, or start fresh anytime.
          </p>
        </section>
      </div>
    </div>
  )
}
