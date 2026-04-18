'use client'

import Link from 'next/link'
import { useState } from 'react'

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

  if (answers['after-hours'] >= 1)
    recs.push('Set up an AI chat widget to capture and respond to leads after hours')
  if (answers['repetitive-tasks'] >= 1)
    recs.push('Automate your most time-consuming tasks with AI workflows')
  if (answers['social-media'] >= 1)
    recs.push('Use AI to draft and schedule social media content in batches')
  if (answers['scheduling'] >= 1)
    recs.push('Replace phone scheduling with an AI-powered booking system')
  if (answers['challenge'] >= 1)
    recs.push('Build an AI-assisted lead follow-up sequence to convert more inquiries')

  const topRecs = recs.slice(0, 3)

  if (score <= 4) {
    return {
      tier: 'AI Explorer',
      tagline: "You're at the starting line — and that's perfectly fine. A few targeted automations could make a noticeable difference quickly.",
      color: 'bg-brand-purple',
      recommendations: topRecs.length > 0 ? topRecs : [
        'Start with a simple AI chatbot on your website',
        'Use AI writing tools for emails and social content',
        'Explore automated appointment reminders',
      ],
    }
  }

  if (score <= 8) {
    return {
      tier: 'AI Accelerator',
      tagline: "You have clear use cases and real time to reclaim. A structured AI plan will give you a significant competitive edge.",
      color: 'bg-brand-pink',
      recommendations: topRecs.length > 0 ? topRecs : [
        'Implement a full AI lead capture and follow-up system',
        'Automate your most repetitive weekly tasks',
        'Use AI data summaries to make faster business decisions',
      ],
    }
  }

  return {
    tier: 'AI Power User',
    tagline: "You're ready for full AI integration. With your openness to technology and clear pain points, AI can transform your operations.",
    color: 'bg-brand-navy',
    recommendations: topRecs.length > 0 ? topRecs : [
      'Build an end-to-end AI system from lead capture to follow-up',
      'Integrate AI into your team workflows and reporting',
      'Use AI analytics to track and optimize performance weekly',
    ],
  }
}

export default function QuizPage() {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [selected, setSelected] = useState<number | null>(null) // index, not score
  const [showResult, setShowResult] = useState(false)

  const q = questions[currentQ]
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0)
  const result = getResult(totalScore, answers)
  const progress = ((currentQ) / questions.length) * 100

  function handleSelect(index: number) {
    setSelected(index)
  }

  function handleNext() {
    if (selected === null) return
    const newAnswers = { ...answers, [q.id]: q.options[selected].score }
    setAnswers(newAnswers)
    setSelected(null)

    if (currentQ + 1 >= questions.length) {
      setShowResult(true)
    } else {
      setCurrentQ((c) => c + 1)
    }
  }

  function handleRestart() {
    setCurrentQ(0)
    setAnswers({})
    setSelected(null)
    setShowResult(false)
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-brand-lavender flex items-center justify-center px-6 py-20">
        <div className="max-w-xl w-full animate-fade-up">
          <div className="bg-white/60 backdrop-blur-xl border border-white/70 rounded-2xl shadow-xl overflow-hidden">
            <div className={`${result.color} px-8 py-10 text-center`}>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-2">Your Result</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">{result.tier}</h1>
              <div className="text-white/40 text-sm font-medium">Score: {totalScore} / 12</div>
            </div>

            <div className="px-8 py-8">
              <p className="text-gray-600 text-base leading-relaxed mb-8">{result.tagline}</p>

              <h3 className="font-display text-lg font-semibold text-brand-navy mb-4">Your Top AI Opportunities</h3>
              <ul className="space-y-3 mb-8">
                {result.recommendations.map((rec) => (
                  <li key={rec} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="text-brand-purple mt-0.5 flex-shrink-0 font-bold">→</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <Link
                  href="/about"
                  className="block text-center bg-brand-gradient text-green-600 font-semibold rounded-full py-4 hover:opacity-90 transition-opacity shadow-md"
                >
                  Book a Free AI Strategy Call
                </Link>
                <Link
                  href="/services"
                  className="block text-center border-2 border-brand-navy/20 text-brand-navy font-semibold rounded-full py-4 hover:border-brand-purple hover:text-brand-purple transition-colors"
                >
                  See Our Packages
                </Link>
                <button
                  onClick={handleRestart}
                  className="block w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors py-2"
                >
                  Retake the quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-lavender flex items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs font-semibold text-brand-purple/50 tracking-[0.2em] uppercase mb-2">
            Free Assessment
          </p>
          <h1 className="font-display text-3xl font-bold text-brand-navy">
            AI Readiness Quiz
          </h1>
          <p className="text-gray-500 text-sm mt-2">2 minutes · 6 questions · Free personalized plan</p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-brand-navy/10 rounded-full h-1.5 mb-8">
          <div
            className="bg-brand-gradient h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question card */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/70 rounded-2xl shadow-md p-8 animate-fade-up">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-semibold text-brand-purple/50 uppercase tracking-widest">
              Question {currentQ + 1} of {questions.length}
            </span>
          </div>

          <h2 className="font-display text-xl font-semibold text-brand-navy mb-6 leading-snug">
            {q.question}
          </h2>

          <div className="space-y-3 mb-8">
            {q.options.map(({ label }, index) => (
              <button
                key={label}
                onClick={() => handleSelect(index)}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 text-sm font-medium transition-all ${
                  selected === index
                    ? 'border-brand-purple bg-brand-purple/5 text-brand-navy'
                    : 'border-brand-navy/10 bg-white/50 text-gray-600 hover:border-brand-purple/40 hover:bg-white/80'
                }`}
              >
                <span className={`inline-block w-5 h-5 rounded-full border-2 mr-3 align-middle transition-all flex-shrink-0 ${
                  selected === index ? 'border-brand-purple bg-brand-purple' : 'border-gray-300'
                }`} />
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={selected === null}
            className="w-full bg-brand-gradient text-gray-400 font-semibold rounded-full py-4 hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
          >
            {currentQ + 1 === questions.length ? 'See My Results' : 'Next Question →'}
          </button>
        </div>
      </div>
    </div>
  )
}
