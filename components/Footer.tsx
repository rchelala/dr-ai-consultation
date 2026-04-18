import Link from 'next/link'

const links = [
  { href: '/what-is-ai', label: 'What is AI?' },
  { href: '/try-ai', label: 'Try AI' },
  { href: '/services', label: 'Services' },
  { href: '/quiz', label: 'Take the Quiz' },
  { href: '/about', label: 'About' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--surface-dark)', color: '#fff', padding: '64px 24px 32px', marginTop: 'auto' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 48, flexWrap: 'wrap', marginBottom: 48 }}>
          <div style={{ maxWidth: 320 }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, fontStyle: 'italic', color: '#fff', marginBottom: 12 }}>
              D &amp; R AI Consultation
            </p>
            <p className="t-small" style={{ color: 'rgba(250,247,242,0.55)' }}>
              Built to make AI accessible for everyone — no tech background needed.
            </p>
          </div>
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 36px' }}>
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14,
                  color: 'rgba(250,247,242,0.55)',
                  textDecoration: 'none',
                  transition: 'color var(--dur-fast) var(--ease-out)',
                }}
                className="footer-link"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, textAlign: 'center', fontSize: 12, color: 'rgba(250,247,242,0.35)' }}>
          © {new Date().getFullYear()} D &amp; R AI Consultation. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
