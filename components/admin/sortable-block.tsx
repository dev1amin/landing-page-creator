'use client'

import { Block } from '@/types/content'
import { Button } from '@/components/ui/button'
import { Copy, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SortableBlockProps {
  block: Block
  onDuplicate: () => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  onClick?: () => void
  isFirst: boolean
  isLast: boolean
}

export function SortableBlock({ 
  block, 
  onDuplicate, 
  onDelete,
  onMoveUp,
  onMoveDown,
  onClick,
  isFirst,
  isLast
}: SortableBlockProps) {
  const blockTypes = {
    hero: 'Hero',
    features: 'Recursos',
    testimonials: 'Depoimentos',
    video: 'Vídeo',
    about: 'Sobre',
    services: 'Serviços',
    pricing: 'Preços',
    cta: 'Chamada para Ação',
    whatsapp: 'WhatsApp',
    instagram: 'Instagram',
    facebook: 'Facebook',
    custom: 'Personalizado',
    footer: 'Rodapé'
  }

  return (
    <div
      className="flex items-center gap-2 p-4 bg-white border rounded-lg shadow-sm"
      onClick={onClick}
    >
      <div className="flex flex-col gap-0.5">
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            onMoveUp()
          }}
          disabled={isFirst}
          className="h-6 w-6 p-0 hover:text-blue-600 focus:outline-none"
          aria-label="Mover bloco para cima"
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            onMoveDown()
          }}
          disabled={isLast}
          className="h-6 w-6 p-0 hover:text-blue-600 focus:outline-none"
          aria-label="Mover bloco para baixo"
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1">
        <span className="font-medium">{blockTypes[block.type] || 'Bloco'}</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            onDuplicate()
          }}
          className="hover:text-blue-600"
        >
          <Copy className="h-4 w-4" />
          <span className="sr-only">Duplicar bloco</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Excluir bloco</span>
        </Button>
      </div>
    </div>
  )
}

