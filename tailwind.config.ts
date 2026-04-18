import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Warm teal replaces purple — primary actions, links, highlights
          purple: '#2a6b70',
          // Warm peach replaces pink — accents, badges
          pink: '#e8916d',
          // Warm cream replaces lavender — page background
          lavender: '#faf7f2',
          // Deep charcoal replaces navy — headings, dark surfaces
          navy: '#1c2330',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #2a6b70 0%, #3d9ca3 100%)',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        sans:    ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        body:    ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
