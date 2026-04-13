import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navbar from '@/components/Navbar'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Navbar', () => {
  it('renders the brand name', () => {
    render(<Navbar />)
    expect(screen.getByText('D & R AI Consultation')).toBeInTheDocument()
  })

  it('renders all nav links', () => {
    render(<Navbar />)
    expect(screen.getByText('What is AI?')).toBeInTheDocument()
    expect(screen.getByText('How it Works')).toBeInTheDocument()
    expect(screen.getByText('Try AI')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('toggles mobile menu on hamburger click', async () => {
    render(<Navbar />)
    const toggle = screen.getByLabelText('Toggle menu')
    expect(toggle).toBeInTheDocument()
  })
})
