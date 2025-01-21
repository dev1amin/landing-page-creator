import { Block, ContentData } from '@/types/content'
import { Facebook } from 'lucide-react'

interface FacebookBlockProps {
  block: Block
  content: ContentData
}

export default function FacebookBlock({ block, content }: FacebookBlockProps) {
  const pageUrl = block.content.pageUrl || ''
  const facebookUrl = pageUrl.startsWith('http') ? pageUrl : `https://facebook.com/${pageUrl}`

  return (
    <a
      href={facebookUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[168px] right-6 bg-[#1877F2] hover:bg-[#0E5FCB] text-white rounded-full p-4 shadow-lg transition-transform hover:scale-110 z-50"
      aria-label="Siga-nos no Facebook"
    >
      <Facebook className="w-6 h-6" />
    </a>
  )
}

