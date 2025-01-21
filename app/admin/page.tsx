'use client'

import { useState, useEffect } from 'react'
import { ContentData, DEFAULT_CONTENT, DEFAULT_STYLES, TEMPLATE_DEFAULTS } from '@/types/content'
import { TemplateId, TEMPLATES } from '@/types/templates'
import { BlockManager } from '@/components/admin/block-manager'
import { ColorPicker } from '@/components/admin/color-picker'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Loader2, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

const FONT_OPTIONS = [
  { value: 'inter', label: 'Inter' },
  { value: 'montserrat', label: 'Montserrat' },
  { value: 'poppins', label: 'Poppins' },
  { value: 'roboto', label: 'Roboto' },
  { value: 'opensans', label: 'Open Sans' },
]

export default function AdminPage() {
  const [content, setContent] = useState<ContentData>(DEFAULT_CONTENT)
  const [localContent, setLocalContent] = useState<ContentData>(DEFAULT_CONTENT)
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(DEFAULT_CONTENT.templateId)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const { toast } = useToast()

  // Fetch initial content
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await fetch('/api/content', {
          cache: 'no-store'
        })
        
        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Failed to fetch content: ${response.status} ${response.statusText}\n${errorText}`)
        }

        let data
        try {
          data = await response.json()
        } catch (parseError) {
          console.error('Error parsing response:', parseError)
          throw new Error('Resposta inválida do servidor')
        }

        // Validate response data
        if (!data || typeof data !== 'object') {
          throw new Error('Formato de conteúdo inválido')
        }

        const validContent = {
          ...DEFAULT_CONTENT,
          ...data,
          styles: {
            ...DEFAULT_CONTENT.styles,
            ...(data.styles || {})
          },
          blocks: Array.isArray(data.blocks) ? data.blocks : DEFAULT_CONTENT.blocks,
          images: {
            ...DEFAULT_CONTENT.images,
            ...(data.images || {})
          }
        }

        setContent(validContent)
        setLocalContent(validContent)
        setSelectedTemplate(validContent.templateId)
      } catch (error) {
        console.error('Error fetching content:', {
          error,
          message: error instanceof Error ? error.message : 'Unknown error'
        })
        
        const errorMessage = error instanceof Error 
          ? error.message 
          : 'Erro ao carregar conteúdo'

        setError(errorMessage)
        
        // Set default content as fallback
        setContent(DEFAULT_CONTENT)
        setLocalContent(DEFAULT_CONTENT)
        setSelectedTemplate(DEFAULT_CONTENT.templateId)

        toast({
          title: 'Erro ao carregar conteúdo',
          description: 'Usando conteúdo padrão. Você pode fazer alterações e tentar salvar novamente.',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [toast])

  // Handle template selection with defaults
  const handleTemplateSelect = (templateId: TemplateId) => {
    try {
      // Validate template ID
      if (!templateId) {
        throw new Error('ID do template é obrigatório')
      }

      // Type guard to ensure templateId is valid
      if (!Object.keys(TEMPLATE_DEFAULTS).includes(templateId)) {
        throw new Error(`Template "${templateId}" não está disponível`)
      }

      // Get template defaults with type safety
      const templateDefaults = TEMPLATE_DEFAULTS[templateId]
      if (!templateDefaults) {
        throw new Error(`Configurações do template "${templateId}" não encontradas`)
      }

      // Create a backup of current content
      const previousContent = { ...localContent }
      
      try {
        // Update template with proper error handling
        setSelectedTemplate(templateId)
        setLocalContent((prev) => {
          // Validate required properties
          if (!templateDefaults.content || !templateDefaults.styles) {
            throw new Error(`Configurações inválidas para o template "${templateId}"`)
          }

          return {
            ...prev,
            templateId,
            blocks: Array.isArray(templateDefaults.blocks) ? templateDefaults.blocks : [],
            styles: {
              ...DEFAULT_STYLES,
              ...templateDefaults.styles
            },
            title: templateDefaults.content.title || prev.title,
            subtitle: templateDefaults.content.subtitle || prev.subtitle,
            description: templateDefaults.content.description || prev.description,
            ctaText: templateDefaults.content.ctaText || prev.ctaText
          }
        })
        setHasUnsavedChanges(true)

        // Show success message
        toast({
          title: 'Template selecionado',
          description: `O template ${TEMPLATES.find(t => t.id === templateId)?.name} foi carregado com sucesso.`
        })
      } catch (updateError) {
        // Rollback changes if something goes wrong
        setLocalContent(previousContent)
        setSelectedTemplate(previousContent.templateId)
        throw updateError
      }
    } catch (error) {
      console.error('Error selecting template:', {
        error,
        templateId,
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      })

      // Show error message to user
      toast({
        title: 'Erro ao selecionar template',
        description: error instanceof Error 
          ? error.message 
          : 'Não foi possível carregar o template selecionado. Tente novamente.',
        variant: 'destructive',
      })
    }
  }

  const handleContentChange = (newContent: Partial<ContentData>) => {
    setLocalContent((prev) => ({
      ...prev,
      ...newContent,
    }))
    setHasUnsavedChanges(true)
  }

  const handleStyleChange = (key: string, value: string) => {
    handleContentChange({
      styles: {
        ...localContent.styles,
        [key]: value,
      },
    })
  }

  // Save content with proper error handling
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)

    try {
      // Validate local content before sending
      if (!localContent || typeof localContent !== 'object') {
        throw new Error('Conteúdo inválido')
      }

      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(localContent),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao salvar conteúdo')
      }

      if (!data.success) {
        throw new Error(data.error || 'Falha ao salvar alterações')
      }

      // Update content state with the saved content
      if (data.content) {
        setContent(data.content)
        setLocalContent(data.content)
        setHasUnsavedChanges(false)
        
        toast({
          title: 'Alterações salvas',
          description: data.message || 'Suas alterações foram salvas com sucesso.',
        })
      } else {
        throw new Error('Resposta inválida do servidor')
      }
    } catch (error) {
      console.error('Error saving content:', {
        error,
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      })

      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Não foi possível salvar as alterações'

      setError(errorMessage)
      toast({
        title: 'Erro ao salvar',
        description: errorMessage,
        variant: 'destructive',
      })

      // If we got a response with default content, update the local state
      if (error instanceof Error && 'content' in error) {
        setLocalContent(error['content'] as ContentData)
      }
    } finally {
      setIsSaving(false)
    }
  }

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasUnsavedChanges])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-gray-600">Carregando painel administrativo...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <div className="flex gap-4">
            <a
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver site
            </a>
            <Button
              onClick={handleSubmit}
              disabled={isSaving || !hasUnsavedChanges}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : hasUnsavedChanges ? (
                'Salvar Alterações'
              ) : (
                'Salvo'
              )}
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Escolha do Template</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {TEMPLATES.map((template) => (
                  <div
                    key={template.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleTemplateSelect(template.id as TemplateId)}
                  >
                    <h3 className="font-medium mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-600">
                      {template.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Tabs defaultValue="blocks" className="space-y-6">
              <TabsList>
                <TabsTrigger value="blocks">Blocos</TabsTrigger>
                <TabsTrigger value="styles">Estilos</TabsTrigger>
              </TabsList>

              <TabsContent value="blocks">
                <BlockManager
                  blocks={localContent.blocks}
                  onChange={(blocks) => handleContentChange({ blocks })}
                />
              </TabsContent>

              <TabsContent value="styles">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Estilos Globais</h2>
                  
                  {/* Font Selection */}
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <div className="space-y-2">
                      <Label>Fonte dos Títulos</Label>
                      <Select
                        value={localContent.styles.headingFont}
                        onValueChange={(value) => handleStyleChange('headingFont', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Escolha uma fonte" />
                        </SelectTrigger>
                        <SelectContent>
                          {FONT_OPTIONS.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Fonte do Texto</Label>
                      <Select
                        value={localContent.styles.bodyFont}
                        onValueChange={(value) => handleStyleChange('bodyFont', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Escolha uma fonte" />
                        </SelectTrigger>
                        <SelectContent>
                          {FONT_OPTIONS.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ColorPicker
                      color={localContent.styles.primaryColor}
                      onChange={(color) => handleStyleChange('primaryColor', color)}
                      label="Cor Primária"
                    />
                    <ColorPicker
                      color={localContent.styles.secondaryColor}
                      onChange={(color) => handleStyleChange('secondaryColor', color)}
                      label="Cor Secundária"
                    />
                    <ColorPicker
                      color={localContent.styles.backgroundColor}
                      onChange={(color) => handleStyleChange('backgroundColor', color)}
                      label="Cor de Fundo"
                    />
                    <ColorPicker
                      color={localContent.styles.textColor}
                      onChange={(color) => handleStyleChange('textColor', color)}
                      label="Cor do Texto"
                    />
                    <ColorPicker
                      color={localContent.styles.testimonialsBg}
                      onChange={(color) => handleStyleChange('testimonialsBg', color)}
                      label="Cor de Fundo dos Depoimentos"
                    />
                    <ColorPicker
                      color={localContent.styles.footerBg}
                      onChange={(color) => handleStyleChange('footerBg', color)}
                      label="Cor de Fundo do Footer"
                    />
                    <ColorPicker
                      color={localContent.styles.headingColor}
                      onChange={(color) => handleStyleChange('headingColor', color)}
                      label="Cor dos Títulos"
                    />
                    <ColorPicker
                      color={localContent.styles.linkColor}
                      onChange={(color) => handleStyleChange('linkColor', color)}
                      label="Cor dos Links"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </div>
      </div>
    </div>
  )
}

