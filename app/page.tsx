import { getContent } from '@/lib/github'
import { DEFAULT_CONTENT } from '@/types/content'
import { BlockRenderer } from '@/components/block-renderer'

export default async function Home() {
  let content
  try {
    content = await getContent()
  } catch (error) {
    console.error('Failed to fetch content:', error)
    content = DEFAULT_CONTENT
  }

  // Ensure we have valid content with all required properties
  const safeContent = {
    ...DEFAULT_CONTENT,
    ...content,
    styles: {
      ...DEFAULT_CONTENT.styles,
      ...(content?.styles || {})
    },
    blocks: Array.isArray(content?.blocks) ? content.blocks : DEFAULT_CONTENT.blocks
  }

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundColor: safeContent.styles.backgroundColor,
        color: safeContent.styles.textColor,
        fontFamily: `var(--font-${safeContent.styles.bodyFont})`
      }}
    >
      <style jsx global>{`
        h1, h2, h3, h4, h5, h6 {
          font-family: var(--font-${safeContent.styles.headingFont});
        }
      `}</style>
      {safeContent.blocks.map((block) => (
        <BlockRenderer
          key={block.id}
          block={block}
          content={safeContent}
        />
      ))}
    </div>
  )
}

