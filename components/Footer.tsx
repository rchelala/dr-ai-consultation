export default function Footer() {
  return (
    <footer className="bg-brand-navy text-purple-200 py-8 mt-auto">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="font-semibold text-white mb-1">D & R AI Consultation</p>
        <p className="text-sm opacity-75">
          Built to make AI accessible for everyone
        </p>
        <p className="text-xs opacity-50 mt-4">
          © {new Date().getFullYear()} D & R AI Consultation. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
