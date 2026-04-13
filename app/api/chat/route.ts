import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest } from 'next/server'

const SYSTEM_INSTRUCTION = `You are a friendly AI assistant on the D & R AI Consultation website.
You help small business owners and adults who are brand new to AI understand and explore what AI can do.
Keep your responses clear, encouraging, and free of technical jargon.
Use simple, everyday language. If someone asks something completely unrelated to AI or business topics,
gently redirect them back to AI-related questions.`

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
    console.error('Chat API error:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
