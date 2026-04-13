export interface Prompt {
  id: string
  category: string
  label: string
  text: string
}

export const GUIDED_PROMPTS: Prompt[] = [
  {
    id: 'email',
    category: 'WRITE AN EMAIL',
    label: 'Professional Follow-Up',
    text: 'Write a friendly but professional follow-up email to a potential client I met at a networking event last week. Keep it short and end by offering a free 30-minute consultation call.',
  },
  {
    id: 'summarize',
    category: 'EXPLAIN SIMPLY',
    label: 'What is AI in plain English?',
    text: "Explain what artificial intelligence is in 3 simple sentences, like you're talking to someone who has never heard of it before.",
  },
  {
    id: 'business',
    category: 'BUSINESS IDEAS',
    label: 'AI for My Business',
    text: 'Give me 5 practical ways a small business (like a bakery, salon, or retail shop) could use AI to save time or make more money each week.',
  },
  {
    id: 'social',
    category: 'SOCIAL MEDIA',
    label: 'Write an Instagram Caption',
    text: 'Write 3 different Instagram captions for a photo of a new product launch at a local small business. Make them friendly and engaging, and end each one with a call to action.',
  },
  {
    id: 'faq',
    category: 'CUSTOMER SERVICE',
    label: 'Answer Customer Questions',
    text: 'I run a small landscaping business. Write clear, friendly answers to these 3 common customer questions: What areas do you serve? How much do you charge? How do I get a quote?',
  },
  {
    id: 'plan',
    category: 'PLANNING',
    label: 'Start Using AI This Week',
    text: 'Help me create a simple 4-step plan to start using AI tools in my small business. I have no technical experience and just want to start with the basics.',
  },
]
