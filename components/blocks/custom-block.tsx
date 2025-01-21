import { Block, ContentData } from '@/types/content'

interface CustomBlockProps {
  block: Block
  content: ContentData
}

export default function CustomBlock({ block, content }: CustomBlockProps) {
  return (
    <div className="container mx-auto px-4">
      <div 
        className="custom-block"
        dangerouslySetInnerHTML={{ __html: block.content.html || '' }}
      />
    </div>
  )
}

