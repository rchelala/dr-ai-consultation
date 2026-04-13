import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How AI Works | D & R AI Consultation',
  description: 'Learn how AI processes information and how small businesses are using it to save time and serve customers better.',
}

const steps = [
  {
    number: '01',
    heading: 'You ask a question or give a task',
    body: `When you type something to an AI — like "write me an email" or "what are my hours?" — that's called a "prompt." Think of it like texting a very knowledgeable assistant.

The clearer your request, the better the answer. But don't stress about getting it perfect — AI is good at figuring out what you mean.`,
  },
  {
    number: '02',
    heading: 'AI reads your message and thinks through an answer',
    body: `The AI has been trained on an enormous amount of text — think billions of books, articles, and websites. When you ask something, it uses patterns from all that reading to figure out the best response.

It doesn't look things up in real time like a search engine. It draws on what it already knows. That's why it's so fast — and also why it can occasionally get something wrong.`,
  },
  {
    number: '03',
    heading: 'It writes a response, word by word',
    body: `AI generates its answer one word at a time, which is why you sometimes see text appearing as it "types." It's not pulling an answer from a database — it's constructing a response in real time, based on what word is most likely to come next given everything you've said.

This is why AI can write in so many styles: formal, casual, detailed, or brief — it adapts to what you ask for.`,
  },
  {
    number: '04',
    heading: 'You can keep the conversation going',
    body: `Unlike a search engine where each search starts fresh, AI remembers the full conversation while you're chatting. You can say "make it shorter" or "add a more friendly tone" and it will adjust.

This back-and-forth is where AI really shines — you can refine and improve the output until it's exactly what you need.`,
  },
]

const useCases = [
  {
    emoji: '📧',
    title: 'Write emails and messages',
    detail: 'Draft professional emails in seconds. Great for follow-ups, proposals, and customer responses.',
  },
  {
    emoji: '📋',
    title: 'Answer customer FAQs',
    detail: 'Give AI your business info and have it write answers to your most common questions.',
  },
  {
    emoji: '📱',
    title: 'Create social media posts',
    detail: 'Describe your product or special and let AI write engaging captions ready to post.',
  },
  {
    emoji: '📄',
    title: 'Summarize long documents',
    detail: 'Paste in a long article, report, or email thread — AI will give you the key points.',
  },
  {
    emoji: '💡',
    title: 'Brainstorm ideas',
    detail: 'Stuck on a promotion, product name, or event theme? AI can generate dozens of ideas instantly.',
  },
  {
    emoji: '🗓️',
    title: 'Write a plan or checklist',
    detail: 'Ask AI to help you build a weekly task list, onboarding guide, or step-by-step process.',
  },
]

export default function HowItWorksPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <p className="text-xs font-semibold text-brand-purple tracking-widest uppercase mb-3">
          Under the Hood
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
          How AI Works
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          No technical jargon — just a clear picture of what's actually happening when you talk to AI.
        </p>
      </div>

      {/* Step-by-step */}
      <div className="space-y-6 mb-14">
        {steps.map(({ number, heading, body }) => (
          <div key={number} className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-purple-50 flex gap-5">
            <div className="text-3xl font-bold text-purple-200 shrink-0 leading-none pt-1">
              {number}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-brand-navy mb-2">{heading}</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm">{body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Small business use cases */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-brand-navy text-center mb-2">
          How small businesses use AI
        </h2>
        <p className="text-gray-500 text-center text-sm mb-8">
          Real things real business owners do with AI every day.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {useCases.map(({ emoji, title, detail }) => (
            <div key={title} className="bg-white rounded-xl p-5 shadow-sm border border-purple-50 flex gap-4">
              <span className="text-2xl shrink-0">{emoji}</span>
              <div>
                <h3 className="font-semibold text-brand-navy text-sm mb-1">{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-brand-gradient rounded-xl p-8 text-white text-center">
        <h2 className="text-xl font-bold mb-2">See it for yourself</h2>
        <p className="opacity-90 mb-5 text-sm">
          The best way to understand AI is to try it. Pick a guided prompt and send your first message.
        </p>
        <Link
          href="/try-ai"
          className="inline-block bg-white text-brand-purple font-semibold rounded-lg px-8 py-2.5 hover:opacity-90 transition-opacity text-sm"
        >
          Try AI Now →
        </Link>
      </div>
    </div>
  )
}
