import { Block, ContentData } from '@/types/content'
import { Instagram } from 'lucide-react'

interface InstagramBlockProps {
  block: Block
  content: ContentData
}

export default function InstagramBlock({ block, content }: InstagramBlockProps) {
  const username = block.content.username || ''
  const instagramUrl = `https://instagram.com/${username}`

  return (
    <a
      href={instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[96px] right-6 bg-[#E1306C] hover:bg-[#C13584] text-white rounded-full p-4 shadow-lg transition-transform hover:scale-110 z-50"
      aria-label="Siga-nos no Instagram"
    >
      <Instagram className="w-6 h-6" />
    </a>
  )
}

