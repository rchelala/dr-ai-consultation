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
    <div className="flex flex-col h-[520px] bg-white/40 backdrop-blur-xl border border-white/60 rounded-xl shadow-md overflow-hidden">
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
      <div className="border-t border-white/60 p-3 flex gap-2 items-end bg-white/40 backdrop-blur-sm">
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
