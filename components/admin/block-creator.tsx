'use client'

import { useState } from 'react'
import { Block, BlockType } from '@/types/content'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { v4 as uuidv4 } from 'uuid'

interface BlockCreatorProps {
  onCreateBlock: (block: Block) => void
}

const BLOCK_TYPES = [
  { value: 'hero', label: 'Hero' },
  { value: 'features', label: 'Recursos' },
  { value: 'testimonials', label: 'Depoimentos' },
  { value: 'video', label: 'Vídeo' },
  { value: 'about', label: 'Sobre' },
  { value: 'services', label: 'Serviços' },
  { value: 'cta', label: 'Chamada para Ação' },
  { value: 'pricing', label: 'Preços' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'custom', label: 'Personalizado' },
  { value: 'footer', label: 'Rodapé' }
]

const getDefaultContent = (type: BlockType) => {
  switch (type) {
    case 'hero':
      return {
        title: 'Título Principal',
        subtitle: 'Subtítulo da seção hero',
        description: 'Descrição da seção hero',
        ctaText: 'Comece Agora',
        image: '/placeholder.svg?height=400&width=600'
      }
    case 'features':
      return {
        title: 'Nossos Recursos',
        subtitle: 'Conheça nossas principais funcionalidades',
        features: [
          {
            id: uuidv4(),
            title: 'Recurso 1',
            description: 'Descrição do recurso 1',
            icon: 'feature-icon'
          }
        ]
      }
    case 'testimonials':
      return {
        title: 'Depoimentos',
        subtitle: 'O que nossos clientes dizem',
        testimonials: [
          {
            id: uuidv4(),
            name: 'Nome do Cliente',
            role: 'Cargo',
            text: 'Depoimento do cliente',
            image: '/placeholder.svg?height=100&width=100'
          }
        ]
      }
    case 'video':
      return {
        title: 'Vídeo',
        subtitle: 'Assista nossa apresentação',
        videoUrl: '',
        description: 'Descrição do vídeo'
      }
    case 'about':
      return {
        title: 'Sobre Nós',
        subtitle: 'Nossa História',
        description: 'Descrição sobre a empresa',
        image: '/placeholder.svg?height=400&width=600'
      }
    case 'services':
      return {
        title: 'Nossos Serviços',
        subtitle: 'Conheça o que oferecemos',
        services: [
          {
            id: uuidv4(),
            title: 'Serviço 1',
            description: 'Descrição do serviço 1',
            icon: 'service-icon'
          }
        ]
      }
    case 'cta':
      return {
        title: 'Chamada para Ação',
        subtitle: 'Não perca tempo',
        description: 'Descrição da chamada para ação',
        buttonText: 'Comece Agora',
        buttonUrl: '#'
      }
    case 'pricing':
      return {
        title: 'Nossos Planos',
        subtitle: 'Escolha o melhor para você',
        plans: [
          {
            id: uuidv4(),
            name: 'Plano Básico',
            price: 'R$ 99',
            features: ['Recurso 1', 'Recurso 2'],
            buttonText: 'Escolher Plano',
            isHighlighted: false
          }
        ]
      }
    case 'contact':
      return {
        title: 'Contato',
        subtitle: 'Entre em contato conosco',
        description: 'Preencha o formulário abaixo',
        formFields: [
          {
            id: uuidv4(),
            type: 'text',
            label: 'Nome',
            required: true
          },
          {
            id: uuidv4(),
            type: 'email',
            label: 'Email',
            required: true
          }
        ],
        submitButtonText: 'Enviar Mensagem'
      }
    case 'whatsapp':
      return {
        phoneNumber: '',
        message: 'Olá! Gostaria de mais informações.'
      }
    case 'instagram':
      return {
        username: ''
      }
    case 'facebook':
      return {
        pageUrl: ''
      }
    case 'custom':
      return {
        html: '<div>Conteúdo personalizado</div>'
      }
    case 'footer':
      return {
        logo: '/placeholder.svg?height=60&width=200',
        description: 'Uma breve descrição sobre sua empresa',
        copyright: `© ${new Date().getFullYear()} Sua Empresa. Todos os direitos reservados.`
      }
    default:
      return {}
  }
}

export function BlockCreator({ onCreateBlock }: BlockCreatorProps) {
  const [selectedType, setSelectedType] = useState<BlockType>('hero')
  const [open, setOpen] = useState(false)

  const handleCreate = () => {
    const newBlock: Block = {
      id: `${selectedType}-${Date.now()}`,
      type: selectedType,
      content: getDefaultContent(selectedType),
      styles: {
        backgroundColor: 'transparent', // Changed from '#FFFFFF'
        textColor: '#111827',
        padding: '4rem 0'
      }
    }
    onCreateBlock(newBlock)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Novo Bloco
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Novo Bloco</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Tipo de Bloco
            </label>
            <Select value={selectedType} onValueChange={(value) => setSelectedType(value as BlockType)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um tipo" />
              </SelectTrigger>
              <SelectContent>
                {BLOCK_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleCreate} className="w-full">
            Criar Bloco
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

