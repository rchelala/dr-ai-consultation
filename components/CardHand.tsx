'use client'

import { useState, useEffect, useRef } from 'react'

export interface HandCard {
  badge: string
  badgeIsNumber?: boolean
  heading: string
  body: string
}

interface CardHandProps {
  cards: HandCard[]
  hint?: string
}

const CARD_W = 272
const GAP = 16

export default function CardHand({ cards, hint = 'tap to explore' }: CardHandProps) {
  const [expanded, setExpanded] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const directionRef = useRef(1)

  // Auto-advance carousel with ping-pong direction
  useEffect(() => {
    if (!expanded || paused) return
    const id = setInterval(() => {
      setActiveIdx(prev => {
        const next = prev + directionRef.current
        if (next >= cards.length) {
          directionRef.current = -1
          return prev - 1
        }
        if (next < 0) {
          directionRef.current = 1
          return prev + 1
        }
        return next
      })
    }, 2800)
    return () => clearInterval(id)
  }, [expanded, paused, cards.length])

  // Reset state when collapsed
  useEffect(() => {
    if (!expanded) {
      setActiveIdx(0)
      setPaused(false)
      setHoveredIdx(null)
      directionRef.current = 1
    }
  }, [expanded])

  return (
    <div className="w-full">

      {/* ── STACKED / POKER HAND ── */}
      <div className={expanded ? 'hidden' : 'block'}>
        <div
          className="card-hand relative mx-auto cursor-pointer select-none"
          style={{ width: 'min(320px, 92vw)', height: 270 }}
          onClick={() => setExpanded(true)}
          role="button"
          tabIndex={0}
          aria-label={`${hint} — click to expand`}
          onKeyDown={(e) => e.key === 'Enter' && setExpanded(true)}
        >
          {cards.slice(0, 4).map((card, i) => (
            <div
              key={i}
              className={`card-fan card-fan-${i} absolute`}
              style={{
                width: 160,
                height: 215,
                bottom: 20,
                left: '50%',
                marginLeft: -80,
                zIndex: i + 1,
              }}
            >
              <div className="w-full h-full bg-white/80 backdrop-blur-xl border border-white/90 rounded-2xl shadow-lg p-4 flex flex-col overflow-hidden">
                {card.badgeIsNumber ? (
                  <span className="font-display text-4xl font-bold leading-none mb-2" style={{ color: 'rgba(42,107,112,0.15)' }}>
                    {card.badge}
                  </span>
                ) : (
                  <span className="text-3xl mb-2">{card.badge}</span>
                )}
                <h3 className="font-display text-xs font-semibold text-brand-navy leading-snug mb-2 line-clamp-3">
                  {card.heading}
                </h3>
                <p className="text-gray-400 text-[11px] leading-relaxed line-clamp-3 flex-1">
                  {card.body.split('\n\n')[0].replace(/^[•\-] /gm, '').trim()}
                </p>
              </div>
            </div>
          ))}

          <div className="absolute bottom-0 left-0 right-0 text-center pb-0.5">
            <span className="text-[10px] text-brand-purple/40 tracking-[0.18em] uppercase">
              {hint} →
            </span>
          </div>
        </div>
      </div>

      {/* ── CAROUSEL ── */}
      <div className={expanded ? 'block' : 'hidden'}>

        {/* Sliding track */}
        <div className="overflow-hidden -mx-4">
          <div
            className="flex"
            style={{
              gap: GAP,
              paddingLeft: 16,
              paddingRight: 16,
              transform: `translateX(calc(-${activeIdx} * (${CARD_W}px + ${GAP}px)))`,
              transition: 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          >
            {cards.map((card, i) => (
              <div
                key={i}
                style={{
                  width: CARD_W,
                  flexShrink: 0,
                  transform: hoveredIdx === i ? 'translateY(-10px)' : 'translateY(0)',
                  transition: 'transform 0.35s cubic-bezier(0.34, 1.5, 0.64, 1)',
                }}
                onMouseEnter={() => { setPaused(true); setHoveredIdx(i) }}
                onMouseLeave={() => { setPaused(false); setHoveredIdx(null) }}
              >
                <div
                  className="bg-white/50 backdrop-blur-xl border rounded-xl p-5 h-full transition-all duration-300"
                  style={{
                    borderColor: hoveredIdx === i ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.7)',
                    boxShadow: hoveredIdx === i
                      ? '0 20px 40px -8px rgba(42,107,112,0.18), 0 4px 12px -2px rgba(0,0,0,0.08)'
                      : '0 4px 12px -2px rgba(0,0,0,0.06)',
                  }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    {card.badgeIsNumber ? (
                      <span className="font-display text-3xl font-bold shrink-0 leading-none" style={{ color: 'rgba(42,107,112,0.2)' }}>
                        {card.badge}
                      </span>
                    ) : (
                      <span className="text-2xl shrink-0 mt-0.5">{card.badge}</span>
                    )}
                    <h3 className="font-display text-sm font-semibold text-brand-navy leading-snug">
                      {card.heading}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed whitespace-pre-line">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators + collapse */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActiveIdx(i); directionRef.current = i > activeIdx ? 1 : -1 }}
              aria-label={`Go to card ${i + 1}`}
              style={{
                height: 6,
                borderRadius: 3,
                background: activeIdx === i ? 'rgba(42,107,112,0.65)' : 'rgba(42,107,112,0.18)',
                width: activeIdx === i ? 22 : 6,
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          ))}
        </div>

        <div className="text-center mt-3">
          <button
            onClick={() => setExpanded(false)}
            className="text-[11px] text-gray-400 hover:text-brand-purple transition-colors tracking-wide"
          >
            ← collapse
          </button>
        </div>
      </div>

    </div>
  )
}
