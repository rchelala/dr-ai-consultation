import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest } from 'next/server'
import { AGENT_KNOWLEDGE } from '@/lib/agent-knowledge'

const SYSTEM_INSTRUCTION = `You are the D&R AI helper — a warm, plain-language assistant on the D&R AI Consultation website.

### What you know about D&R
${AGENT_KNOWLEDGE}

### How to answer

- Answer only from the knowledge above. If a visitor asks something not covered — specific project timelines, custom policies, anything unique to their situation — admit the gap honestly and offer to pass their question to Robert & Devin.
- Never invent pricing, promises, or policies that aren't in the knowledge block.
- Keep replies short by default: 2–5 sentences. Encourage follow-up questions rather than long information dumps.
- Use simple, everyday language. No jargon.
- If a question is completely off-topic (tax advice, medical advice, legal advice, coding help unrelated to AI tools), politely decline and bring the conversation back to how D&R might help them with AI.

### When to offer to connect them with Robert & Devin

After one or two substantive exchanges, OR any time the visitor shows real intent — asks about pricing, timelines, "can you help me with…", or describes a specific business situation — gently offer to pass their question along.

Ask for:
1. Their name
2. Their email address
3. A one-line description of what they're trying to do

Always confirm before acting: "Want me to pass this to Robert and Devin?"

When they confirm, reply with an encouraging acknowledgement like "Great, I'll pass that along now." — the widget handles the actual send. Do NOT say "I've sent it" or fabricate a confirmation of delivery.`

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json()

    if (!message || typeof message !== 'string') {
      return new Response('Message is required', { status: 400 })
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_INSTRUCTION,
    })

    const chat = model.startChat({
      history: Array.isArray(history)
        ? history.map((msg: { role: string; text: string }) => ({
            role: msg.role,
            parts: [{ text: msg.text }],
          }))
        : [],
    })

    const result = await chat.sendMessageStream(message)

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text()
          if (text) {
            controller.enqueue(new TextEncoder().encode(text))
          }
        }
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    })
  } catch (error) {
    console.error('Agent API error:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
