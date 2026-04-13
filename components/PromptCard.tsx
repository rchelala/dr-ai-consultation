import { Prompt } from '@/lib/prompts'

interface PromptCardProps {
  prompt: Prompt
  onSelect: (text: string) => void
}

export default function PromptCard({ prompt, onSelect }: PromptCardProps) {
  return (
    <button
      onClick={() => onSelect(prompt.text)}
      className="text-left bg-white border border-purple-100 rounded-xl p-4 hover:border-brand-purple hover:shadow-md transition-all group w-full"
    >
      <p className="text-xs font-semibold text-brand-pink mb-1 tracking-wide">
        {prompt.category}
      </p>
      <p className="text-sm font-medium text-brand-navy group-hover:text-brand-purple transition-colors">
        {prompt.label}
      </p>
      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed line-clamp-2">
        {prompt.text}
      </p>
    </button>
  )
}
