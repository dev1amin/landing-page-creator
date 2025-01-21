import { Block, ContentData } from '@/types/content'
import Image from 'next/image'

interface ServicesBlockProps {
  block: Block
  content: ContentData
}

export default function ServicesBlock({ block, content }: ServicesBlockProps) {
  const services = block.content.services || []

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">
        {block.content.title || 'Nossos Serviços'}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service: any, index: number) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
            {service.image && (
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title || `Serviço ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                />
              </div>
            )}
            {service.icon && (
              <div className="text-primary text-3xl mb-4">
                <i className={service.icon}></i>
              </div>
            )}
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

