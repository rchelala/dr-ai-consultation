'use client'

import Link from 'next/link'
import { useState } from 'react'
import Icon from '@/components/Icon'

interface Question {
  id: string
  question: string
  options: { label: string; score: number }[]
}

const questions: Question[] = [
  {
    id: 'after-hours',
    question: 'How do you currently handle customer inquiries after hours?',
    options: [
      { label: 'We respond the next business day', score: 0 },
      { label: 'We have a voicemail or auto-reply', score: 1 },
      { label: 'We have some automation in place', score: 2 },
    ],
  },
  {
    id: 'repetitive-tasks',
    question: 'How much time per week do you spend on repetitive tasks (emails, scheduling, data entry)?',
    options: [
      { label: 'Less than 2 hours', score: 0 },
      { label: '2–5 hours', score: 1 },
      { label: 'More than 5 hours', score: 2 },
    ],
  },
  {
    id: 'social-media',
    question: 'Do you have a social media presence you need to maintain?',
    options: [
      { label: "No, we don't use social media", score: 0 },
      { label: "Yes, but we struggle to keep up with it", score: 2 },
      { label: "We want to start but don't know how", score: 1 },
    ],
  },
  {
    id: 'scheduling',
    question: 'How do you handle appointment scheduling?',
    options: [
      { label: 'Phone calls only', score: 2 },
      { label: 'Online form or email', score: 1 },
      { label: 'Software like Calendly or similar', score: 0 },
    ],
  },
  {
    id: 'challenge',
    question: "What's your biggest business challenge right now?",
    options: [
      { label: 'Finding and converting new customers', score: 2 },
      { label: 'Saving time on day-to-day operations', score: 2 },
      { label: 'Staying organized and on top of everything', score: 1 },
    ],
  },
  {
    id: 'tech-comfort',
    question: 'How comfortable are you with adopting new technology?',
    options: [
      { label: "Not very — I prefer to keep things simple", score: 0 },
      { label: "Somewhat — I'm open if it's easy to use", score: 1 },
      { label: "Very — I love trying new tools", score: 2 },
    ],
  },
]

interface Result {
  tier: string
  tagline: string
  color: string
  recommendations: string[]
}

function getResult(score: number, answers: Record<string, number>): Result {
  const recs: string[] = []
  if (answers['after-hours'] >= 1) recs.push('Set up an AI chat widget to capture and respond to leads after hours')
  if (answers['repetitive-tasks'] >= 1) recs.push('Automate your most time-consuming tasks with AI workflows')
  if (answers['social-media'] >= 1) recs.push('Use AI to draft and schedule social media content in batches')
  if (answers['scheduling'] >= 1) recs.push('Replace phone scheduling with an AI-powered booking system')
  if (answers['challenge'] >= 1) recs.push('Build an AI-assisted lead follow-up sequence to convert more inquiries')
  const topRecs = recs.slice(0, 3)

  if (score <= 4) return {
    tier: 'AI Explorer',
    tagline: "You're at the starting line — and that's perfectly fine. A few targeted automations could make a noticeable difference quickly.",
    color: 'var(--brand-teal)',
    recommendations: topRecs.length > 0 ? topRecs : ['Start with a simple AI chatbot on your website', 'Use AI writing tools for emails and social content', 'Explore automated appointment reminders'],
  }
  if (score <= 8) return {
    tier: 'AI Accelerator',
    tagline: "You have clear use cases and real time to reclaim. A structured AI plan will give you a significant competitive edge.",
    color: 'var(--brand-peach-2)',
    recommendations: topRecs.length > 0 ? topRecs : ['Implement a full AI lead capture and follow-up system', 'Automate your most repetitive weekly tasks', 'Use AI data summaries to make faster business decisions'],
  }
  return {
    tier: 'AI Power User',
    tagline: "You're ready for full AI integration. With your openness to technology and clear pain points, AI can transform your operations.",
    color: 'var(--brand-ink)',
    recommendations: topRecs.length > 0 ? topRecs : ['Build an end-to-end AI system from lead capture to follow-up', 'Integrate AI into your team workflows and reporting', 'Use AI analytics to track and optimize performance weekly'],
  }
}

export default function QuizPage() {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const q = questions[currentQ]
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0)
  const result = getResult(totalScore, answers)
  const progress = (currentQ / questions.length) * 100

  function handleNext() {
    if (selected === null) return
    const newAnswers = { ...answers, [q.id]: q.options[selected].score }
    setAnswers(newAnswers)
    setSelected(null)
    if (currentQ + 1 >= questions.length) setShowResult(true)
    else setCurrentQ((c) => c + 1)
  }

  function handleRestart() {
    setCurrentQ(0); setAnswers({}); setSelected(null); setShowResult(false)
  }

  if (showResult) {
    return (
      <section className="section section--cream" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 560, width: '100%' }} className="animate-fade-up">
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ background: result.color, padding: '48px 32px', textAlign: 'center' }}>
              <p className="t-eyebrow" style={{ color: 'rgba(255,255,255,0.65)' }}>Your Result</p>
              <h1 className="t-h1" style={{ color: '#fff', marginTop: 12 }}>{result.tier}</h1>
              <p className="t-small" style={{ color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>Score: {totalScore} / 12</p>
            </div>
            <div style={{ padding: 32 }}>
              <p className="t-body" style={{ marginBottom: 32 }}>{result.tagline}</p>
              <h3 className="t-h4" style={{ marginBottom: 16 }}>Your Top AI Opportunities</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12, marginBottom: 32 }}>
                {result.recommendations.map((rec) => (
                  <li key={rec} style={{ display: 'flex', gap: 10 }}>
                    <Icon name="arrowRight" size={18} style={{ color: 'var(--brand-teal)', flexShrink: 0, marginTop: 2 }} />
                    <span className="t-small" style={{ color: 'var(--ink-80)' }}>{rec}</span>
                  </li>
                ))}
              </ul>
              <div style={{ display: 'grid', gap: 10 }}>
                <Link href="/about" className="btn btn-primary btn--lg" style={{ width: '100%', display: 'flex' }}>
                  Book a Free AI Strategy Call
                </Link>
                <Link href="/services" className="btn btn-secondary btn--lg" style={{ width: '100%', display: 'flex' }}>
                  See Our Packages
                </Link>
                <button onClick={handleRestart} className="btn" style={{ color: 'var(--ink-40)', background: 'transparent', width: '100%' }}>
                  Retake the quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section section--cream" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 560, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <p className="t-eyebrow t-eyebrow--muted">Free Assessment</p>
          <h1 className="t-h1" style={{ marginTop: 12 }}>AI Readiness Quiz</h1>
          <p className="t-small" style={{ marginTop: 8 }}>2 minutes · 6 questions · Free personalized plan</p>
        </div>

        {/* Progress bar */}
        <div style={{ height: 6, background: 'rgba(28,35,48,0.08)', borderRadius: 3, overflow: 'hidden', marginBottom: 32 }}>
          <div style={{ height: '100%', background: 'var(--grad-brand)', width: `${progress}%`, transition: 'width 0.5s var(--ease-out)' }} />
        </div>

        <div className="card animate-fade-up">
          <p className="t-eyebrow t-eyebrow--muted" style={{ marginBottom: 20 }}>Question {currentQ + 1} of {questions.length}</p>
          <h2 className="t-h3" style={{ marginBottom: 24 }}>{q.question}</h2>
          <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
            {q.options.map(({ label }, index) => (
              <button
                key={label}
                onClick={() => setSelected(index)}
                className={`quiz-option ${selected === index ? 'is-on' : ''}`}
              >
                <span className={`quiz-radio ${selected === index ? 'is-on' : ''}`} />
                <span className="t-small" style={{ color: 'var(--ink-80)', fontWeight: 500 }}>{label}</span>
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={selected === null}
            className="btn btn-primary btn--lg"
            style={{ width: '100%', display: 'flex', opacity: selected === null ? 0.35 : 1 }}
          >
            {currentQ + 1 === questions.length ? 'See My Results' : 'Next Question'}
            <Icon name="arrowRight" size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
