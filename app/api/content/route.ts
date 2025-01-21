import { NextResponse } from 'next/server'
import { getContent, updateContent } from '@/lib/github'
import { ContentData, DEFAULT_CONTENT } from '@/types/content'

export async function GET() {
  try {
    const content = await getContent()
    return NextResponse.json(content)
  } catch (error) {
    console.error('Error in GET /api/content:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to fetch content',
        ...DEFAULT_CONTENT // Include default content as fallback
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    let content: ContentData
    try {
      content = await request.json()
    } catch (parseError) {
      throw new Error('Conteúdo inválido: não foi possível processar o JSON')
    }
    
    // Validate content structure
    if (!content || typeof content !== 'object') {
      throw new Error('Conteúdo inválido: formato incorreto')
    }

    // Validate required fields
    const requiredFields = ['templateId', 'title', 'subtitle', 'description', 'ctaText', 'blocks', 'styles']
    const missingFields = requiredFields.filter(field => !(field in content))
    
    if (missingFields.length > 0) {
      throw new Error(`Campos obrigatórios ausentes: ${missingFields.join(', ')}`)
    }

    // Validate blocks array
    if (!Array.isArray(content.blocks)) {
      throw new Error('O campo "blocks" deve ser um array')
    }

    // Validate styles object
    if (!content.styles || typeof content.styles !== 'object') {
      throw new Error('O campo "styles" deve ser um objeto')
    }

    const success = await updateContent(content)

    if (!success) {
      throw new Error('Não foi possível atualizar o conteúdo')
    }

    return NextResponse.json({
      success: true,
      message: 'Conteúdo atualizado com sucesso',
      content
    })
  } catch (error) {
    console.error('Error in POST /api/content:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao atualizar conteúdo',
        content: DEFAULT_CONTENT // Include default content as fallback
      },
      { status: 500 }
    )
  }
}

