import { Block, ContentData } from '@/types/content'

interface FeaturesBlockProps {
  block: Block
  content: ContentData
}

export default function FeaturesBlock({ block, content }: FeaturesBlockProps) {
  const features = block.content.features || content.features || []

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">
        {block.content.title || 'Nossos Recursos'}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature: any, index: number) => (
          <div key={index} className="text-center">
            {feature.icon && (
              <div className="text-4xl mb-4">
                <i className={feature.icon}></i>
              </div>
            )}
            <h3 className="text-xl font-semibold mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

