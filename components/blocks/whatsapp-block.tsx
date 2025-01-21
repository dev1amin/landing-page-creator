import { Block, ContentData } from '@/types/content'
import { MessageCircle } from 'lucide-react'

interface WhatsAppBlockProps {
  block: Block
  content: ContentData
}

export default function WhatsAppBlock({ block, content }: WhatsAppBlockProps) {
  const phoneNumber = block.content.phoneNumber || ''
  const message = encodeURIComponent(block.content.message || 'Olá! Gostaria de mais informações.')
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#1EA952] text-white rounded-full p-4 shadow-lg transition-transform hover:scale-110 z-50"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  )
}

