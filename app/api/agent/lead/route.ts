import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'
import { NextRequest } from 'next/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const EXTRACTION_PROMPT = `Extract the following fields from this conversation transcript. Return only valid JSON matching the schema.

- name: The visitor's first name (or full name if given). Empty string if not found.
- email: The visitor's email address. Empty string if not found.
- summary: A 1–2 sentence summary of what the visitor is trying to accomplish or get help with.
- topic: A 3–5 word label for the main topic (e.g., "customer email automation", "AI audit inquiry").

Transcript:
`

export async function POST(req: NextRequest) {
  try {
    const { messages, pageUrl } = await req.json() as {
      messages: Array<{ role: string; text: string }>
      pageUrl?: string
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ ok: false, error: 'no_messages' }, { status: 400 })
    }

    const transcript = messages
      .map(m => `${m.role === 'user' ? 'Visitor' : 'Agent'}: ${m.text}`)
      .join('\n')

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            name:    { type: SchemaType.STRING },
            email:   { type: SchemaType.STRING },
            summary: { type: SchemaType.STRING },
            topic:   { type: SchemaType.STRING },
          },
          required: ['name', 'email', 'summary', 'topic'],
        },
      },
    })

    const result = await model.generateContent(EXTRACTION_PROMPT + transcript)
    const raw = result.response.text()
    const extracted = JSON.parse(raw) as {
      name: string; email: string; summary: string; topic: string
    }

    const missing: string[] = []
    if (!extracted.name?.trim()) missing.push('name')
    if (!extracted.email?.trim() || !EMAIL_RE.test(extracted.email.trim())) missing.push('email')
    if (!extracted.summary?.trim()) missing.push('summary')

    if (missing.length > 0) {
      return Response.json({ ok: false, missing })
    }

    const formspreeUrl = process.env.NEXT_PUBLIC_FORMSPREE_URL
    if (!formspreeUrl) {
      console.error('Agent lead route: NEXT_PUBLIC_FORMSPREE_URL is not set')
      return Response.json({ ok: false, error: 'delivery' })
    }

    const payload = {
      name: extracted.name.trim(),
      email: extracted.email.trim(),
      message: extracted.summary.trim(),
      topic: extracted.topic?.trim() ?? '',
      source: 'widget',
      pageUrl: pageUrl ?? '',
      _subject: `AI Agent lead — ${extracted.topic?.trim() ?? 'inquiry'}`,
      transcript,
    }

    const formspreeRes = await fetch(formspreeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!formspreeRes.ok) {
      console.error('Agent lead route: Formspree returned', formspreeRes.status)
      return Response.json({ ok: false, error: 'delivery' })
    }

    return Response.json({ ok: true })
  } catch (error) {
    console.error('Agent lead route error:', error)
    return Response.json({ ok: false, error: 'delivery' }, { status: 500 })
  }
}
