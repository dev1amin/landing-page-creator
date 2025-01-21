import { Block, ContentData } from '@/types/content'
import Image from 'next/image'

interface TestimonialsBlockProps {
  block: Block
  content: ContentData
}

export default function TestimonialsBlock({ block, content }: TestimonialsBlockProps) {
  const testimonials = block.content.testimonials || content.testimonials || []

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">
        {block.content.title || 'O que nossos clientes dizem'}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <p className="text-gray-600 mb-4">{testimonial.text}</p>
            <div className="flex items-center gap-3">
              {testimonial.image && (
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <p className="font-semibold">{testimonial.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

