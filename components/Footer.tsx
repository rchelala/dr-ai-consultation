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
    <footer className="bg-brand-navy text-brand-lavender py-14 mt-auto">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">
          <div className="max-w-xs">
            <p className="font-display text-2xl italic font-bold text-white mb-3">
              D & R AI Consultation
            </p>
            <p className="text-sm text-brand-lavender/50 leading-relaxed">
              Built to make AI accessible for everyone — no tech background needed.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-brand-lavender/50 hover:text-brand-lavender transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t border-white/10 pt-6 text-xs text-brand-lavender/30 text-center">
          © {new Date().getFullYear()} D & R AI Consultation. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
