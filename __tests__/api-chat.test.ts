/**
 * @jest-environment node
 */
import { POST } from '@/app/api/chat/route'
import { NextRequest } from 'next/server'

// Mock the Gemini SDK
jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      startChat: jest.fn().mockReturnValue({
        sendMessageStream: jest.fn().mockResolvedValue({
          stream: (async function* () {
            yield { text: () => 'Hello from Gemini' }
          })(),
        }),
      }),
    }),
  })),
}))

process.env.GEMINI_API_KEY = 'test-key'

describe('POST /api/chat', () => {
  it('returns 400 when message is missing', async () => {
    const req = new NextRequest('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 when message is not a string', async () => {
    const req = new NextRequest('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 123 }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns a streaming response for valid message', async () => {
    const req = new NextRequest('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'Hello', history: [] }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toContain('text/plain')
  })
})
