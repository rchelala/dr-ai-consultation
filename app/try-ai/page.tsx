'use client'

import { useState } from 'react'
import PromptCard from '@/components/PromptCard'
import ChatSandbox from '@/components/ChatSandbox'
import { GUIDED_PROMPTS } from '@/lib/prompts'

export default function TryAIPage() {
  const [selectedPrompt, setSelectedPrompt] = useState('')

  return (
    <div className="relative overflow-hidden" style={{ background: 'linear-gradient(145deg, rgba(72,185,187,0.18) 0%, #faf7f2 45%, rgba(140,197,184,0.15) 100%)' }}>
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-[460px] h-[460px] rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(72,185,187,0.28)' }} />
      <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(255,179,107,0.22)' }} />
      <div className="absolute -bottom-24 right-1/3 w-[340px] h-[340px] rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(140,197,184,0.2)' }} />

      <div className="relative max-w-4xl mx-auto px-4 pt-20 pb-12">
        <div className="text-center mb-10 animate-fade-up">
          <p className="text-xs font-semibold text-brand-purple tracking-[0.2em] uppercase mb-3">
            Live Demo
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-4">
            Try AI for Your Business
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            See exactly what AI can do — right now. Pick a real business prompt below, or type your own.
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
    </div>
  )
}
