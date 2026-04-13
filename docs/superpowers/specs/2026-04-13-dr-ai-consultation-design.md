# D & R AI Consultation — Design Spec
**Date:** 2026-04-13
**Authors:** Robert & Devin
**Status:** Approved

---

## Overview

D & R AI Consultation is a client-facing educational web app that helps people who know nothing about AI — specifically adults 40+ and small business owners — understand what AI is, how it works, and practice using it in a safe, guided environment. The product is free to access and built to establish D & R as trusted AI consultants. Future paid tiers are possible but not in scope for this version.

---

## Target Audience

- Adults 40+ with no technical background
- Small business owners curious about how AI can help them
- Anyone intimidated by AI who wants a jargon-free starting point

**Design principle:** Every word, layout, and interaction should assume zero prior knowledge of AI. No jargon, no assumptions.

---

## Site Structure

5 pages, all accessible from a persistent navigation bar:

| Page | Path | Purpose |
|---|---|---|
| Home | `/` | Hero, tagline, intro to D & R, CTAs to the 3 main sections |
| What is AI? | `/what-is-ai` | Plain-English explanation of AI using everyday analogies |
| How AI Works | `/how-it-works` | How AI processes info, learns, and generates responses; small business use cases |
| Try AI | `/try-ai` | Guided prompt cards + live Gemini-powered chat sandbox |
| About / Contact | `/about` | Who D & R are, their mission, and a contact form |

All pages share a navigation bar and a footer with contact info.

---

## Page Details

### Home (`/`)
- **Hero section:** Gradient purple-to-pink background, tagline "AI Doesn't Have to Be Complicated", 1–2 sentence description of D & R's mission
- **Two CTAs:** "Start Learning →" (links to What is AI?) and "Try AI Now" (links to Try AI)
- **Three feature cards:** Brief descriptions of What is AI?, How it Works, and Try AI Live sections
- **Footer:** Dark navy background, copyright, tagline

### What is AI? (`/what-is-ai`)
- Short, scannable sections with clear headings
- Everyday analogies (no technical terms)
- Optional: simple illustrations or icons to break up text

### How AI Works (`/how-it-works`)
- Explains how AI processes input and generates output
- Focuses on practical small business applications (e.g., writing emails, answering FAQs, summarizing documents)
- Avoids deep technical explanation — stays at the "what can this do for me" level

### Try AI (`/try-ai`)
- **Guided prompt cards (4–6 cards):** Pre-written real-world prompts users can click to load. Categories: Write an Email, Summarize Text, Business Ideas, Social Media, etc.
- **Live chat sandbox:** Clicking a prompt card loads it into the input field. User can send as-is or edit. Gemini 2.5 Flash responds in real time. User can continue the conversation freely after.
- **Tone:** Encouraging, low-pressure. Copy like "No experience needed — just click and see what happens."

### About / Contact (`/about`)
- Brief bios of Robert and Devin
- Mission statement
- Contact form (name, email, message) — submissions handled via Formspree (free tier), which emails the submission directly to D & R's inbox. No database required.

---

## Visual Design

- **Style:** Warm & Approachable (Option B)
- **Primary colors:** Purple (`#7c3aed`) → Pink (`#db2777`) gradient
- **Background:** Soft lavender tints (`#fdf4ff`)
- **Cards/surfaces:** White with subtle purple-tinted shadows
- **Footer:** Dark navy (`#1e1b4b`)
- **Typography:** Clean, readable sans-serif (Inter or system font)
- **Buttons:** Rounded, gradient or solid purple, clear hover states
- **Tone of voice:** Friendly, encouraging, jargon-free

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 15 (React) |
| Styling | Tailwind CSS |
| AI Integration | Google Gemini 2.5 Flash API |
| Hosting | Vercel (free tier) |
| Language | TypeScript |

**API Security:** The Gemini API key is stored as a server-side environment variable. All AI requests are routed through a Next.js API route (`/api/chat`) — the key is never exposed to the browser.

**Deployment:** Vercel auto-deploys on every code push. Initial live URL will be `*.vercel.app`; a custom domain can be connected later.

---

## Key Constraints

- No user accounts or login in this version
- No database in this version
- No payment processing in this version (free product)
- Must work on mobile and desktop
- Must be maintainable by Claude Code (no manual coding by Robert or Devin)

---

## Future Considerations (out of scope now)

- Paid subscription tiers for premium content or unlimited AI usage
- User accounts with progress tracking
- Additional tutorial modules added over time
- Blog or resources section
- Analytics to track which prompts are most popular

---

## Success Criteria

- A visitor with zero AI knowledge can navigate the site, understand the content, and successfully send a message to the AI sandbox without any help
- D & R can share the URL with potential clients and use it as a credibility-building tool
- The site is live on Vercel and accessible from any device
