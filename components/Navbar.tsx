'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Icon from '@/components/Icon'

const links = [
  { href: '/what-is-ai', label: 'What is AI?' },
  { href: '/try-ai', label: 'Try AI' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 90,
      background: 'rgba(250,247,242,0.92)',
      backdropFilter: 'blur(14px)',
      borderBottom: '1px solid rgba(28,35,48,0.06)',
    }}>
      <div style={{
        maxWidth: 'var(--container)', margin: '0 auto',
        padding: '16px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 24,
      }}>
        {/* Brand */}
        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'baseline', gap: 8,
          fontFamily: 'var(--font-display)',
          color: 'var(--ink-100)',
          textDecoration: 'none',
        }}>
          <span style={{ fontSize: 22, fontWeight: 700, fontStyle: 'italic', letterSpacing: '-0.02em' }}>
            D<span style={{ color: 'var(--brand-teal)', padding: '0 2px' }}>&amp;</span>R
          </span>
          <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: '-0.01em' }}>AI Consultation</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 28 }}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 14, fontWeight: 500,
                color: pathname === href ? 'var(--brand-teal)' : 'var(--ink-60)',
                textDecoration: 'none',
                transition: 'color var(--dur-fast) var(--ease-out)',
              }}
            >
              {label}
            </Link>
          ))}
          <Link href="/quiz" className="btn btn-primary btn--sm">
            Take the Quiz
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          style={{ background: 'transparent', border: 0, color: 'var(--ink-60)', padding: 8 }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <Icon name={menuOpen ? 'x' : 'menu'} size={22} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className="md:hidden"
        style={{
          overflow: 'hidden',
          maxHeight: menuOpen ? 260 : 0,
          transition: 'max-height 200ms ease-in-out',
          borderTop: menuOpen ? '1px solid rgba(28,35,48,0.06)' : 'none',
        }}
      >
        <div style={{ padding: '16px 24px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 14, fontWeight: 500,
                color: pathname === href ? 'var(--brand-teal)' : 'var(--ink-60)',
                textDecoration: 'none',
              }}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/quiz"
            style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'var(--brand-peach-2)' }}
            onClick={() => setMenuOpen(false)}
          >
            Take the Quiz
          </Link>
        </div>
      </div>
    </nav>
  )
}
