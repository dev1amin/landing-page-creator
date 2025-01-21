import { Block, ContentData } from '@/types/content'
import dynamic from 'next/dynamic'

const blocks = {
  hero: dynamic(() => import('./blocks/hero-block')),
  features: dynamic(() => import('./blocks/features-block')),
  testimonials: dynamic(() => import('./blocks/testimonials-block')),
  video: dynamic(() => import('./blocks/video-block')),
  about: dynamic(() => import('./blocks/about-block')),
  services: dynamic(() => import('./blocks/services-block')),
  cta: dynamic(() => import('./blocks/cta-block')),
  pricing: dynamic(() => import('./blocks/pricing-block')),
  whatsapp: dynamic(() => import('./blocks/whatsapp-block')),
  instagram: dynamic(() => import('./blocks/instagram-block')),
  facebook: dynamic(() => import('./blocks/facebook-block')),
  custom: dynamic(() => import('./blocks/custom-block')),
  footer: dynamic(() => import('./blocks/footer-block'))
}

interface BlockRendererProps {
  block: Block
  content: ContentData
}

export function BlockRenderer({ block, content }: BlockRendererProps) {
  if (!block || !block.type) {
    console.warn('Invalid block:', block)
    return null
  }

  const BlockComponent = blocks[block.type]

  if (!BlockComponent) {
    console.warn(`Block type ${block.type} not found`)
    return null
  }

  const styles = {
    backgroundColor: block.styles?.backgroundColor || content.styles?.backgroundColor || '#FFFFFF',
    color: block.styles?.textColor || content.styles?.textColor || '#000000',
    padding: block.styles?.padding || '4rem 0'
  }

  return (
    <div 
      className="block-wrapper" 
      style={styles}
    >
      <BlockComponent content={content} block={block} />
    </div>
  )
}

