import type { Block, ContentData } from "@/types/content"
import Image from "next/image"

interface HeroBlockProps {
  block: Block
  content: ContentData
}

export default function HeroBlock({ block, content }: HeroBlockProps) {
  // Get the image from block content first, fallback to content.images.hero
  const imageUrl = (block.content as any).image || content.images.hero || ""

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{block.content.title || content.title}</h1>
          <p className="text-xl">{block.content.subtitle || content.subtitle}</p>
          <button
            className="px-8 py-3 rounded-lg text-lg font-medium transition-colors"
            style={{
              backgroundColor: block.styles?.buttonBg || "#1E40AF",
              color: block.styles?.buttonText || "#FFFFFF",
            }}
          >
            {block.content.ctaText || content.ctaText}
          </button>
        </div>
        <div className="w-full lg:w-1/2">
          {imageUrl && (
            <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[16/9] max-h-[500px]">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={block.content.title || content.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

