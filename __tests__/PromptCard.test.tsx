import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PromptCard from '@/components/PromptCard'

const mockPrompt = {
  id: 'test',
  category: 'TEST CATEGORY',
  label: 'Test Label',
  text: 'This is the test prompt text.',
}

describe('PromptCard', () => {
  it('renders the category and label', () => {
    render(<PromptCard prompt={mockPrompt} onSelect={jest.fn()} />)
    expect(screen.getByText('TEST CATEGORY')).toBeInTheDocument()
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('calls onSelect with prompt text when clicked', async () => {
    const onSelect = jest.fn()
    render(<PromptCard prompt={mockPrompt} onSelect={onSelect} />)
    await userEvent.click(screen.getByRole('button'))
    expect(onSelect).toHaveBeenCalledWith('This is the test prompt text.')
  })
})
