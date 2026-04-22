'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Icon from '@/components/Icon'

interface Message {
  role: 'user' | 'model'
  text: string
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

const STORAGE_KEY = 'dr-agent-chat'

const WELCOME: Message = {
  role: 'model',
  text: "Hi! I'm the D&R AI helper. Ask me anything about AI, or about how Robert and Devin can help your business.",
}

function loadMessages(): Message[] {
  if (typeof window === 'undefined') return [WELCOME]
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return [WELCOME]
    const parsed = JSON.parse(raw) as Message[]
    return parsed.length > 0 ? parsed : [WELCOME]
  } catch {
    return [WELCOME]
  }
}

function saveMessages(msgs: Message[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(msgs))
  } catch { /* storage unavailable */ }
}

export default function AgentWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [submitError, setSubmitError] = useState(false)
  const [hasHadReply, setHasHadReply] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Restore from sessionStorage on mount
  useEffect(() => {
    const stored = loadMessages()
    setMessages(stored)
    const hadReply = stored.some(m => m.role === 'model' && m !== WELCOME)
    setHasHadReply(hadReply || stored.length > 1)
  }, [])

  // Save on change
  useEffect(() => {
    if (submitState !== 'success') {
      saveMessages(messages)
    }
  }, [messages, submitState])

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 120) + 'px'
  }, [input])

  // Esc to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  async function sendMessage() {
    const text = input.trim()
    if (!text || isLoading) return

    const userMsg: Message = { role: 'user', text }
    const history = messages.filter(m => m !== WELCOME)
    const withUser = [...messages, userMsg]
    setMessages(withUser)
    setInput('')
    setIsLoading(true)

    const withPlaceholder = [...withUser, { role: 'model' as const, text: '' }]
    setMessages(withPlaceholder)

    try {
      const res = await fetch('/api/agent', {
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

      setHasHadReply(true)
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

  const handleShare = useCallback(async () => {
    setSubmitState('submitting')
    setSubmitError(false)
    try {
      const res = await fetch('/api/agent/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.filter(m => m !== WELCOME),
          pageUrl: window.location.pathname,
        }),
      })
      const data = await res.json() as { ok: boolean; missing?: string[]; error?: string }

      if (data.ok) {
        setSubmitState('success')
        sessionStorage.removeItem(STORAGE_KEY)
        return
      }

      if (data.missing && data.missing.length > 0) {
        const needs = data.missing.join(' and ')
        const prompt = `Before I pass this along, could you share your ${needs}?`
        setMessages(prev => [...prev, { role: 'model', text: prompt }])
        setSubmitState('idle')
      } else {
        setSubmitState('error')
        setSubmitError(true)
      }
    } catch {
      setSubmitState('error')
      setSubmitError(true)
    }
  }, [messages])

  const bubbleStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 20,
    right: 20,
    zIndex: 80,
    width: 56,
    height: 56,
    borderRadius: 'var(--radius-pill)',
    background: 'var(--grad-brand)',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow-lg)',
    transition: `transform var(--dur-base) var(--ease-spring), opacity var(--dur-base) var(--ease-out)`,
  }

  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 88,
    right: 20,
    zIndex: 80,
    width: 360,
    height: 560,
    maxHeight: 'calc(100dvh - 108px)',
    borderRadius: 'var(--radius-lg)',
    background: 'var(--surface-raised)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid var(--surface-raised-border)',
    boxShadow: 'var(--shadow-xl)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: `opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-spring)`,
    opacity: open ? 1 : 0,
    pointerEvents: open ? 'auto' : 'none',
    transform: open ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.97)',
    transformOrigin: 'bottom right',
  }

  return (
    <>
      {/* Panel */}
      <div ref={panelRef} style={panelStyle} aria-hidden={!open} data-agent-panel="true">
        {/* Header */}
        <div style={{
          padding: '14px 16px',
          borderBottom: '1px solid var(--surface-raised-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.5)',
          flexShrink: 0,
        }}>
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--ink-100)', margin: 0 }}>
              Ask D&amp;R
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--ink-40)', margin: 0, marginTop: 2 }}>
              We usually reply within 1–2 days
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-40)', padding: 4, borderRadius: 'var(--radius-sm)', display: 'flex' }}
            aria-label="Close chat"
          >
            <Icon name="x" size={18} />
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '82%',
                borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                padding: '9px 13px',
                fontSize: 'var(--text-sm)',
                lineHeight: 'var(--lh-relaxed)',
                whiteSpace: 'pre-wrap',
                background: msg.role === 'user' ? 'var(--brand-teal)' : 'rgba(255,255,255,0.7)',
                color: msg.role === 'user' ? '#fff' : 'var(--ink-100)',
                boxShadow: 'var(--shadow-sm)',
              }}>
                {msg.text || (isLoading && i === messages.length - 1 ? (
                  <span style={{ display: 'flex', gap: 3 }}>
                    <span style={{ animation: 'bounce 1s infinite' }}>•</span>
                    <span style={{ animation: 'bounce 1s 0.1s infinite' }}>•</span>
                    <span style={{ animation: 'bounce 1s 0.2s infinite' }}>•</span>
                  </span>
                ) : null)}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Footer */}
        {submitState === 'success' ? (
          <div style={{
            padding: 16,
            borderTop: '1px solid var(--surface-raised-border)',
            background: 'rgba(42,107,112,0.07)',
            flexShrink: 0,
          }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--brand-teal)', fontWeight: 600, margin: 0 }}>
              We&apos;ve got it!
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--ink-60)', margin: '4px 0 0' }}>
              Robert or Devin will reach out within 1–2 business days.
            </p>
          </div>
        ) : (
          <div style={{ borderTop: '1px solid var(--surface-raised-border)', flexShrink: 0 }}>
            {/* Share button — shown after first real reply */}
            {hasHadReply && submitState !== 'submitting' && (
              <div style={{ padding: '8px 14px 0' }}>
                {submitError ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: '#e53e3e', margin: 0, flex: 1 }}>
                      Something went wrong sending.
                    </p>
                    <button onClick={() => { setSubmitState('idle'); setSubmitError(false) }}
                      style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--brand-teal)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 600 }}>
                      Retry
                    </button>
                  </div>
                ) : (
                  <button onClick={handleShare}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--brand-teal)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      fontWeight: 500,
                      textDecoration: 'underline',
                      textDecorationStyle: 'dotted',
                      textUnderlineOffset: 3,
                    }}>
                    Share your question with Robert &amp; Devin →
                  </button>
                )}
              </div>
            )}

            {/* Input row */}
            <div style={{ padding: '8px 12px 12px', display: 'flex', gap: 8, alignItems: 'flex-end' }}>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading || submitState === 'submitting'}
                rows={1}
                placeholder="Ask a question… (Enter to send)"
                style={{
                  flex: 1,
                  resize: 'none',
                  border: '1px solid var(--ink-20)',
                  borderRadius: 'var(--radius-md)',
                  padding: '8px 12px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--ink-100)',
                  background: 'rgba(255,255,255,0.8)',
                  outline: 'none',
                  minHeight: 40,
                  overflowY: 'auto',
                  lineHeight: 'var(--lh-normal)',
                }}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim() || submitState === 'submitting'}
                style={{
                  background: 'var(--grad-brand)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  opacity: (isLoading || !input.trim()) ? 0.4 : 1,
                  transition: 'opacity var(--dur-fast) var(--ease-out)',
                }}
                aria-label="Send message"
              >
                <Icon name="send" size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Launcher bubble */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          ...bubbleStyle,
          opacity: open ? 0 : 1,
          transform: open ? 'scale(0.85)' : 'scale(1)',
          pointerEvents: open ? 'none' : 'auto',
        }}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        <Icon name="chat" size={24} />
      </button>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @media (max-width: 639px) {
          [data-agent-panel] {
            bottom: 0 !important;
            right: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100dvh !important;
            max-height: 100dvh !important;
            border-radius: 0 !important;
          }
        }
      `}</style>
    </>
  )
}
