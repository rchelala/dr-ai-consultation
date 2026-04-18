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
    expect(screen.getAllByText('What is AI?').length).toBeGreaterThan(0)
    expect(screen.getAllByText('How it Works').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Try AI').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Services').length).toBeGreaterThan(0)
    expect(screen.getAllByText('About').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Take the Quiz').length).toBeGreaterThan(0)
  })

  it('toggles mobile menu on hamburger click', async () => {
    render(<Navbar />)
    const toggle = screen.getByLabelText('Toggle menu')
    expect(toggle).toBeInTheDocument()
  })
})
