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
