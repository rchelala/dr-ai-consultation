'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/what-is-ai', label: 'What is AI?' },
  { href: '/try-ai', label: 'Try AI' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-brand-lavender border-b border-brand-navy/10 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl italic font-bold text-brand-navy hover:text-brand-purple transition-colors"
        >
          D & R AI Consultation
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 text-sm">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`transition-colors font-medium ${
                pathname === href
                  ? 'text-brand-purple'
                  : 'text-brand-navy/60 hover:text-brand-navy'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-brand-navy/60 hover:text-brand-navy transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden border-brand-navy/10 bg-brand-lavender overflow-hidden transition-all duration-200 ease-in-out ${
          menuOpen ? 'max-h-64 border-t' : 'max-h-0'
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium ${
                pathname === href ? 'text-brand-purple' : 'text-brand-navy/60'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
