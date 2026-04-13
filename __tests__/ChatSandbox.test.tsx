import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChatSandbox from '@/components/ChatSandbox'

// Mock fetch
global.fetch = jest.fn()

// jsdom doesn't implement scrollIntoView
window.HTMLElement.prototype.scrollIntoView = jest.fn()

describe('ChatSandbox', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the input field and send button', () => {
    render(<ChatSandbox />)
    expect(screen.getByPlaceholderText(/ask anything/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })

  it('shows empty state message when no messages', () => {
    render(<ChatSandbox />)
    expect(screen.getByText(/pick a prompt/i)).toBeInTheDocument()
  })

  it('pre-fills input when initialMessage is provided', () => {
    render(<ChatSandbox initialMessage="Hello world" />)
    const input = screen.getByPlaceholderText(/ask anything/i) as HTMLTextAreaElement
    expect(input.value).toBe('Hello world')
  })

  it('disables send button when input is empty', () => {
    render(<ChatSandbox />)
    const btn = screen.getByRole('button', { name: /send/i })
    expect(btn).toBeDisabled()
  })
})
