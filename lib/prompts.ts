export interface Prompt {
  id: string
  category: string
  label: string
  text: string
}

export const GUIDED_PROMPTS: Prompt[] = [
  {
    id: 'instagram',
    category: 'SOCIAL MEDIA',
    label: 'Write Instagram Posts',
    text: 'Write 3 engaging Instagram posts for a local [replace with your business type, e.g. "landscaping company" or "hair salon"] to attract new customers. Make them feel authentic, not salesy. Include a call to action and suggest relevant hashtags.',
  },
  {
    id: 'complaint',
    category: 'CUSTOMER SERVICE',
    label: 'Handle a Customer Complaint',
    text: 'Write a professional, empathetic response to this customer complaint: "I booked an appointment for 2pm but nobody showed up and I never got a call. This is unacceptable." The response should apologize, take responsibility, and offer a solution.',
  },
  {
    id: 'email-sequence',
    category: 'EMAIL MARKETING',
    label: 'Follow-Up Email Sequence',
    text: 'Write a 3-email follow-up sequence for leads who requested a quote but never booked. Email 1: gentle check-in (2 days after). Email 2: value add with a tip or insight (5 days after). Email 3: final offer with a limited-time incentive (10 days after). Keep each email short and conversational.',
  },
  {
    id: 'faq',
    category: 'WEBSITE CONTENT',
    label: 'Create a Business FAQ Page',
    text: 'Create an FAQ page for a [replace with your business type]. Write 8 questions and clear, friendly answers covering: pricing, how to get started, what to expect, turnaround time, service area, and guarantees. Format it so it can go straight onto a website.',
  },
  {
    id: 'audit',
    category: 'BUSINESS STRATEGY',
    label: 'Find AI Opportunities',
    text: 'I run a [replace with your business type, e.g. "dental office" or "gym"]. List 5 specific, practical ways AI could save me time or money each week. For each one, explain what task it automates, roughly how much time it saves, and what tool or approach I would use.',
  },
  {
    id: 'report',
    category: 'DATA & ANALYTICS',
    label: 'Summarize Business Data',
    text: 'Here is my business data for this week: [paste your numbers here — sales, appointments, leads, etc.]. Summarize this into a clear 1-page report that shows trends, highlights what is going well, flags any concerns, and suggests 2-3 actions I should take next week.',
  },
]
