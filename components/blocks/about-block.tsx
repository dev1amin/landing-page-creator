import { Block, ContentData } from '@/types/content'
import Image from 'next/image'
import { AlertCircle } from 'lucide-react'

interface AboutBlockProps {
  block: Block
  content: ContentData
}

export default function AboutBlock({ block, content }: AboutBlockProps) {
  const imagePath = block.content.image || ''
  const hasImage = imagePath !== ''

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          {block.content.title || 'Sobre Nós'}
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 order-2 md:order-1">
            <p className="text-gray-600 leading-relaxed">
              {block.content.description || content.description}
            </p>
          </div>
          <div className="order-1 md:order-2">
            {hasImage ? (
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={imagePath}
                  alt="Sobre nós"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  unoptimized
                />
              </div>
            ) : (
              <div className="w-full aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
                <div className="text-center p-4">
                  <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Imagem não disponível</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

