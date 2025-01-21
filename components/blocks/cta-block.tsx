import type { Block, ContentData } from "@/types/content"
import { Button } from "@/components/ui/button"

interface CTABlockProps {
  block: Block
  content: ContentData
}

export default function CTABlock({ block, content }: CTABlockProps) {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold">{block.content.title || "Comece Agora"}</h2>
        <p className="text-xl text-gray-600">
          {block.content.description || "Entre em contato conosco e comece sua jornada hoje mesmo."}
        </p>
        <Button
          size="lg"
          className="px-8"
          style={{
            backgroundColor: block.styles?.buttonBg || "#1E40AF",
            color: block.styles?.buttonText || "#FFFFFF",
          }}
          asChild
        >
          <a
            href={
              block.content.buttonUrl?.startsWith("http")
                ? block.content.buttonUrl
                : `https://${block.content.buttonUrl}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {block.content.buttonText || content.ctaText || "Começar"}
          </a>
        </Button>
      </div>
    </div>
  )
}

