"use client"

import { useState, useEffect } from "react"
import { type Block, BlockType, BlockContent } from "@/types/content"
import { ColorPicker } from "./color-picker"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { ImageUploader } from "./image-uploader"

interface BlockEditorPopupProps {
  block?: Block
  isOpen: boolean
  onClose: () => void
  onChange: (block: Block) => void
}

const DEFAULT_BLOCK: Block = {
  id: "",
  type: "custom",
  content: {
    html: "<div>Conteúdo personalizado</div>",
  },
  styles: {
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    padding: "4rem 0",
  },
}

export function BlockEditorPopup({ block = DEFAULT_BLOCK, isOpen, onClose, onChange }: BlockEditorPopupProps) {
  const [localBlock, setLocalBlock] = useState<Block>(block)

  useEffect(() => {
    if (block) {
      setLocalBlock(block)
    }
  }, [block])

  const handleContentChange = (key: string, value: any) => {
    setLocalBlock((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [key]: value,
      },
    }))
  }

  const handleStyleChange = (key: string, value: string) => {
    setLocalBlock((prev) => ({
      ...prev,
      styles: {
        ...prev.styles,
        [key]: value,
      },
    }))
  }

  const handleSave = () => {
    onChange(localBlock)
    onClose()
  }

  const renderVideoEditor = () => {
    const content = localBlock.content
    return (
      <div className="space-y-4">
        <div>
          <Label>Título</Label>
          <Input value={content.title || ""} onChange={(e) => handleContentChange("title", e.target.value)} />
        </div>
        <div>
          <Label>URL do Vídeo</Label>
          <Input
            value={content.videoUrl || ""}
            onChange={(e) => handleContentChange("videoUrl", e.target.value)}
            placeholder="Ex: https://www.youtube.com/embed/..."
          />
        </div>
        <div>
          <Label>Descrição</Label>
          <Textarea
            value={content.description || ""}
            onChange={(e) => handleContentChange("description", e.target.value)}
          />
        </div>
      </div>
    )
  }

  const renderAboutEditor = () => {
    const content = localBlock.content
    return (
      <div className="space-y-4">
        <div>
          <Label>Título</Label>
          <Input value={content.title || ""} onChange={(e) => handleContentChange("title", e.target.value)} />
        </div>
        <div>
          <Label>Descrição</Label>
          <Textarea
            value={content.description || ""}
            onChange={(e) => handleContentChange("description", e.target.value)}
            rows={4}
          />
        </div>
        <ImageUploader
          currentImage={content.image}
          onImageUpload={(url) => handleContentChange("image", url)}
          label="Imagem"
        />
      </div>
    )
  }

  const renderServicesEditor = () => {
    const content = localBlock.content
    return (
      <div className="space-y-4">
        <div>
          <Label>Título</Label>
          <Input value={content.title || ""} onChange={(e) => handleContentChange("title", e.target.value)} />
        </div>
        <div className="space-y-4">
          <Label>Serviços</Label>
          {(content.services || []).map((service: any, index: number) => (
            <div key={service.id} className="p-4 border rounded-lg space-y-2">
              <Input
                placeholder="Título do serviço"
                value={service.title}
                onChange={(e) => {
                  const newServices = [...content.services]
                  newServices[index] = { ...service, title: e.target.value }
                  handleContentChange("services", newServices)
                }}
              />
              <Textarea
                placeholder="Descrição do serviço"
                value={service.description}
                onChange={(e) => {
                  const newServices = [...content.services]
                  newServices[index] = { ...service, description: e.target.value }
                  handleContentChange("services", newServices)
                }}
              />
              <ImageUploader
                currentImage={service.image}
                onImageUpload={(url) => {
                  const newServices = [...content.services]
                  newServices[index] = { ...service, image: url }
                  handleContentChange("services", newServices)
                }}
                label="Imagem do Serviço"
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  const newServices = content.services.filter((_, i) => i !== index)
                  handleContentChange("services", newServices)
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            onClick={() => {
              const newService = {
                id: uuidv4(),
                title: "",
                description: "",
                image: "",
              }
              handleContentChange("services", [...(content.services || []), newService])
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Serviço
          </Button>
        </div>
      </div>
    )
  }

  const renderCtaEditor = () => {
    const content = localBlock.content
    return (
      <div className="space-y-4">
        <div>
          <Label>Título</Label>
          <Input value={content.title || ""} onChange={(e) => handleContentChange("title", e.target.value)} />
        </div>
        <div>
          <Label>Descrição</Label>
          <Textarea
            value={content.description || ""}
            onChange={(e) => handleContentChange("description", e.target.value)}
          />
        </div>
        <div>
          <Label>Texto do Botão</Label>
          <Input value={content.buttonText || ""} onChange={(e) => handleContentChange("buttonText", e.target.value)} />
        </div>
        <div>
          <Label>URL do Botão</Label>
          <Input
            value={content.buttonUrl || ""}
            onChange={(e) => handleContentChange("buttonUrl", e.target.value)}
            placeholder="Ex: /contato"
          />
        </div>
      </div>
    )
  }

  const renderPricingEditor = () => {
    const content = localBlock.content
    return (
      <div className="space-y-4">
        <div>
          <Label>Título</Label>
          <Input value={content.title || ""} onChange={(e) => handleContentChange("title", e.target.value)} />
        </div>
        <div className="space-y-4">
          <Label>Planos</Label>
          {(content.plans || []).map((plan: any, index: number) => (
            <div key={plan.id} className="p-4 border rounded-lg space-y-2">
              <Input
                placeholder="Nome do plano"
                value={plan.name}
                onChange={(e) => {
                  const newPlans = [...content.plans]
                  newPlans[index] = { ...plan, name: e.target.value }
                  handleContentChange("plans", newPlans)
                }}
              />
              <Input
                placeholder="Preço"
                value={plan.price}
                onChange={(e) => {
                  const newPlans = [...content.plans]
                  newPlans[index] = { ...plan, price: e.target.value }
                  handleContentChange("plans", newPlans)
                }}
              />
              <div className="space-y-2">
                <Label>Recursos</Label>
                {plan.features.map((feature: string, featureIndex: number) => (
                  <div key={featureIndex} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => {
                        const newPlans = [...content.plans]
                        const newFeatures = [...plan.features]
                        newFeatures[featureIndex] = e.target.value
                        newPlans[index] = { ...plan, features: newFeatures }
                        handleContentChange("plans", newPlans)
                      }}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const newPlans = [...content.plans]
                        const newFeatures = plan.features.filter((_: any, i: number) => i !== featureIndex)
                        newPlans[index] = { ...plan, features: newFeatures }
                        handleContentChange("plans", newPlans)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newPlans = [...content.plans]
                    const newFeatures = [...plan.features, ""]
                    newPlans[index] = { ...plan, features: newFeatures }
                    handleContentChange("plans", newPlans)
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Recurso
                </Button>
              </div>
              <Input
                placeholder="Texto do botão"
                value={plan.buttonText}
                onChange={(e) => {
                  const newPlans = [...content.plans]
                  newPlans[index] = { ...plan, buttonText: e.target.value }
                  handleContentChange("plans", newPlans)
                }}
              />
              <Input
                placeholder="URL do botão"
                value={plan.buttonUrl || ""}
                onChange={(e) => {
                  const newPlans = [...content.plans]
                  newPlans[index] = { ...plan, buttonUrl: e.target.value }
                  handleContentChange("plans", newPlans)
                }}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  const newPlans = content.plans.filter((_, i) => i !== index)
                  handleContentChange("plans", newPlans)
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            onClick={() => {
              const newPlan = {
                id: uuidv4(),
                name: "Novo Plano",
                price: "R$ 0",
                features: ["Recurso 1"],
                buttonText: "Escolher Plano",
                buttonUrl: "",
              }
              handleContentChange("plans", [...(content.plans || []), newPlan])
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Plano
          </Button>
        </div>
      </div>
    )
  }

  const renderContactEditor = () => {
    const content = localBlock.content
    return (
      <div className="space-y-4">
        <div>
          <Label>Título</Label>
          <Input value={content.title || ""} onChange={(e) => handleContentChange("title", e.target.value)} />
        </div>
        <div>
          <Label>Descrição</Label>
          <Textarea
            value={content.description || ""}
            onChange={(e) => handleContentChange("description", e.target.value)}
          />
        </div>
        <div>
          <Label>Email para recebimento</Label>
          <Input
            type="email"
            value={content.email || ""}
            onChange={(e) => handleContentChange("email", e.target.value)}
            placeholder="Ex: contato@empresa.com"
          />
        </div>
        <div>
          <Label>Texto do botão de envio</Label>
          <Input
            value={content.submitButtonText || ""}
            onChange={(e) => handleContentChange("submitButtonText", e.target.value)}
          />
        </div>
      </div>
    )
  }

  const renderCustomEditor = () => {
    const content = localBlock.content
    return (
      <div className="space-y-4">
        <div>
          <Label>Conteúdo HTML</Label>
          <Textarea
            value={content.html || ""}
            onChange={(e) => handleContentChange("html", e.target.value)}
            rows={10}
            placeholder="Digite seu HTML personalizado aqui..."
          />
        </div>
      </div>
    )
  }

  const renderHeroEditor = () => {
    const content = localBlock.content
    return (
      <div className="space-y-4">
        <div>
          <Label>Título</Label>
          <Input value={content.title || ""} onChange={(e) => handleContentChange("title", e.target.value)} />
        </div>
        <div>
          <Label>Subtítulo</Label>
          <Input value={content.subtitle || ""} onChange={(e) => handleContentChange("subtitle", e.target.value)} />
        </div>
        <div>
          <Label>Descrição</Label>
          <Textarea
            value={content.description || ""}
            onChange={(e) => handleContentChange("description", e.target.value)}
          />
        </div>
        <div>
          <Label>Texto do Botão</Label>
          <Input value={content.ctaText || ""} onChange={(e) => handleContentChange("ctaText", e.target.value)} />
        </div>
        <ImageUploader
          currentImage={content.image}
          onImageUpload={(url) => handleContentChange("image", url)}
          label="Imagem Principal"
        />
      </div>
    )
  }

  const renderFeaturesEditor = () => {
    const content = localBlock.content
    return (
      <div className="space-y-4">
        <div>
          <Label>Título da Seção</Label>
          <Input value={content.title || ""} onChange={(e) => handleContentChange("title", e.target.value)} />
        </div>
        <div>
          <Label>Subtítulo da Seção</Label>
          <Input value={content.subtitle || ""} onChange={(e) => handleContentChange("subtitle", e.target.value)} />
        </div>
        <div className="space-y-4">
          <Label>Recursos</Label>
          {(content.features || []).map((feature: any, index: number) => (
            <div key={feature.id} className="p-4 border rounded-lg space-y-2">
              <Input
                placeholder="Título do recurso"
                value={feature.title || ""}
                onChange={(e) => {
                  const newFeatures = [...(content.features || [])]
                  newFeatures[index] = { ...feature, title: e.target.value }
                  handleContentChange("features", newFeatures)
                }}
              />
              <Textarea
                placeholder="Descrição do recurso"
                value={feature.description || ""}
                onChange={(e) => {
                  const newFeatures = [...(content.features || [])]
                  newFeatures[index] = { ...feature, description: e.target.value }
                  handleContentChange("features", newFeatures)
                }}
              />
              <Input
                placeholder="Ícone (opcional)"
                value={feature.icon || ""}
                onChange={(e) => {
                  const newFeatures = [...(content.features || [])]
                  newFeatures[index] = { ...feature, icon: e.target.value }
                  handleContentChange("features", newFeatures)
                }}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  const newFeatures = (content.features || []).filter((_, i) => i !== index)
                  handleContentChange("features", newFeatures)
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            onClick={() => {
              const newFeature = {
                id: uuidv4(),
                title: "",
                description: "",
                icon: "",
              }
              handleContentChange("features", [...(content.features || []), newFeature])
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Recurso
          </Button>
        </div>
      </div>
    )
  }

  const renderTestimonialsEditor = () => {
    const content = localBlock.content
    return (
      <div className="space-y-4">
        <div>
          <Label>Título da Seção</Label>
          <Input value={content.title || ""} onChange={(e) => handleContentChange("title", e.target.value)} />
        </div>
        <div className="space-y-4">
          <Label>Depoimentos</Label>
          {(content.testimonials || []).map((testimonial: any, index: number) => (
            <div key={testimonial.id} className="p-4 border rounded-lg space-y-2">
              <Input
                placeholder="Nome"
                value={testimonial.name || ""}
                onChange={(e) => {
                  const newTestimonials = [...(content.testimonials || [])]
                  newTestimonials[index] = { ...testimonial, name: e.target.value }
                  handleContentChange("testimonials", newTestimonials)
                }}
              />
              <Input
                placeholder="Cargo/Função"
                value={testimonial.role || ""}
                onChange={(e) => {
                  const newTestimonials = [...(content.testimonials || [])]
                  newTestimonials[index] = { ...testimonial, role: e.target.value }
                  handleContentChange("testimonials", newTestimonials)
                }}
              />
              <Textarea
                placeholder="Depoimento"
                value={testimonial.text || ""}
                onChange={(e) => {
                  const newTestimonials = [...(content.testimonials || [])]
                  newTestimonials[index] = { ...testimonial, text: e.target.value }
                  handleContentChange("testimonials", newTestimonials)
                }}
              />
              <ImageUploader
                currentImage={testimonial.image}
                onImageUpload={(url) => {
                  const newTestimonials = [...content.testimonials]
                  newTestimonials[index] = { ...testimonial, image: url }
                  handleContentChange("testimonials", newTestimonials)
                }}
                label="Foto do Cliente"
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  const newTestimonials = (content.testimonials || []).filter((_, i) => i !== index)
                  handleContentChange("testimonials", newTestimonials)
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            onClick={() => {
              const newTestimonial = {
                id: uuidv4(),
                name: "",
                role: "",
                text: "",
                image: "",
              }
              handleContentChange("testimonials", [...(content.testimonials || []), newTestimonial])
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Depoimento
          </Button>
        </div>
      </div>
    )
  }

  const renderWhatsAppEditor = () => {
    const content = localBlock.content
    return (
      <div className="space-y-4">
        <div>
          <Label>Número do WhatsApp</Label>
          <Input
            value={content.phoneNumber || ""}
            onChange={(e) => handleContentChange("phoneNumber", e.target.value)}
            placeholder="Ex: 5511999999999 (apenas números)"
          />
          <p className="text-sm text-gray-500 mt-1">
            Digite o número com código do país e DDD, sem espaços ou caracteres especiais
          </p>
        </div>
        <div>
          <Label>Mensagem Padrão</Label>
          <Textarea
            value={content.message || ""}
            onChange={(e) => handleContentChange("message", e.target.value)}
            placeholder="Mensagem que será pré-preenchida no WhatsApp"
          />
        </div>
      </div>
    )
  }

  const renderInstagramEditor = () => {
    const content = localBlock.content
    return (
      <div className="space-y-4">
        <div>
          <Label>Nome de Usuário do Instagram</Label>
          <Input
            value={content.username || ""}
            onChange={(e) => handleContentChange("username", e.target.value)}
            placeholder="Ex: seu.perfil (sem @)"
          />
          <p className="text-sm text-gray-500 mt-1">Digite apenas seu nome de usuário, sem @ ou URL completa</p>
        </div>
      </div>
    )
  }

  const renderFacebookEditor = () => {
    const content = localBlock.content
    return (
      <div className="space-y-4">
        <div>
          <Label>URL da Página do Facebook</Label>
          <Input
            value={content.pageUrl || ""}
            onChange={(e) => handleContentChange("pageUrl", e.target.value)}
            placeholder="Ex: sua.pagina ou URL completa"
          />
          <p className="text-sm text-gray-500 mt-1">Digite o nome da sua página ou a URL completa do Facebook</p>
        </div>
      </div>
    )
  }

  const renderFooterEditor = () => {
    const content = localBlock.content
    return (
      <div className="space-y-4">
        <ImageUploader
          currentImage={content.logo}
          onImageUpload={(url) => handleContentChange("logo", url)}
          label="Logo do Rodapé"
        />
        <div>
          <Label>Descrição da Empresa</Label>
          <Textarea
            value={content.description || ""}
            onChange={(e) => handleContentChange("description", e.target.value)}
            placeholder="Uma breve descrição sobre sua empresa..."
          />
        </div>

        <div>
          <Label>Texto de Copyright</Label>
          <Input
            value={content.copyright || ""}
            onChange={(e) => handleContentChange("copyright", e.target.value)}
            placeholder="© 2024 Sua Empresa. Todos os direitos reservados."
          />
        </div>

        <div>
          <Label>Texto Adicional do Rodapé</Label>
          <Input
            value={content.bottomText || ""}
            onChange={(e) => handleContentChange("bottomText", e.target.value)}
            placeholder="Texto adicional para o rodapé..."
          />
        </div>
        <div>
          <Label>Cor da Borda Separadora</Label>
          <ColorPicker
            color={content.borderColor || "#374151"}
            onChange={(color) => handleContentChange("borderColor", color)}
            label="Cor da Borda"
          />
        </div>
      </div>
    )
  }

  const renderBlockEditor = () => {
    switch (localBlock.type) {
      case "video":
        return renderVideoEditor()
      case "about":
        return renderAboutEditor()
      case "services":
        return renderServicesEditor()
      case "cta":
        return renderCtaEditor()
      case "pricing":
        return renderPricingEditor()
      case "contact":
        return renderContactEditor()
      case "custom":
        return renderCustomEditor()
      case "hero":
        return renderHeroEditor()
      case "features":
        return renderFeaturesEditor()
      case "testimonials":
        return renderTestimonialsEditor()
      case "whatsapp":
        return renderWhatsAppEditor()
      case "instagram":
        return renderInstagramEditor()
      case "facebook":
        return renderFacebookEditor()
      case "footer":
        return renderFooterEditor()
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Bloco: {localBlock.type.charAt(0).toUpperCase() + localBlock.type.slice(1)}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {renderBlockEditor()}

          <div className="space-y-4">
            <h4 className="font-medium">Estilos</h4>
            <div className="grid grid-cols-2 gap-4">
              <ColorPicker
                color={localBlock.styles?.backgroundColor || "#FFFFFF"}
                onChange={(color) => handleStyleChange("backgroundColor", color)}
                label="Cor de Fundo"
              />
              <ColorPicker
                color={localBlock.styles?.textColor || "#000000"}
                onChange={(color) => handleStyleChange("textColor", color)}
                label="Cor do Texto"
              />
            </div>
            {(localBlock.type === "hero" || localBlock.type === "cta" || localBlock.type === "pricing") && (
              <>
                <ColorPicker
                  color={localBlock.styles?.buttonBg || "#1E40AF"}
                  onChange={(color) => handleStyleChange("buttonBg", color)}
                  label="Cor do Botão"
                />
                <ColorPicker
                  color={localBlock.styles?.buttonText || "#FFFFFF"}
                  onChange={(color) => handleStyleChange("buttonText", color)}
                  label="Cor do Texto do Botão"
                />
              </>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Aplicar Alterações</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

