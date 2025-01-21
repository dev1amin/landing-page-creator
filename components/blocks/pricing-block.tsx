import type { Block, ContentData } from "@/types/content"
import { Button } from "@/components/ui/button"

interface PricingBlockProps {
  block: Block
  content: ContentData
}

export default function PricingBlock({ block, content }: PricingBlockProps) {
  const plans = block.content.plans || []

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">{block.content.title || "Nossos Planos"}</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map(
          (
            plan: {
              name: string
              price: string | number
              features: string[]
              buttonText: string
              buttonUrl?: string
              featured?: boolean
            },
            index: number,
          ) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-lg ${plan.featured ? "bg-primary text-primary-foreground" : "bg-card"}`}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold mb-6">
                {typeof plan.price === "number" ? `R$ ${plan.price.toFixed(2)}` : plan.price}
              </p>
              <ul className="space-y-4 mb-8">
                {plan.features?.map((feature: string, i: number) => (
                  <li key={i} className="flex items-center">
                    <span className="mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${plan.featured ? "bg-white text-primary" : ""}`}
                style={{
                  backgroundColor: plan.featured ? "#FFFFFF" : block.styles?.buttonBg || "#1E40AF",
                  color: plan.featured ? block.styles?.buttonBg || "#1E40AF" : block.styles?.buttonText || "#FFFFFF",
                }}
                size="lg"
                asChild
              >
                <a
                  href={plan.buttonUrl?.startsWith("http") ? plan.buttonUrl : `https://${plan.buttonUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {plan.buttonText || "Escolher Plano"}
                </a>
              </Button>
            </div>
          ),
        )}
      </div>
    </div>
  )
}

