import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

const IMGUR_CLIENT_ID = '13b845189b038c8'

if (!IMGUR_CLIENT_ID) {
  console.error('Missing required environment variable: IMGUR_CLIENT_ID')
}

export async function POST(request: Request) {
  try {
    if (!IMGUR_CLIENT_ID) {
      throw new Error('Configuração do Imgur incompleta. Entre em contato com o suporte.')
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo enviado' },
        { status: 400 }
      )
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de arquivo não permitido. Use JPG, PNG, GIF ou WebP.' },
        { status: 400 }
      )
    }

    if (file.size > 10 * 1024 * 1024) { // Imgur permite até 10MB
      return NextResponse.json(
        { error: 'Arquivo muito grande. O tamanho máximo é 10MB.' },
        { status: 400 }
      )
    }

    // Converter o arquivo para base64
    const buffer = await file.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')

    // Upload para o Imgur
    const imgurResponse = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64,
        type: 'base64',
      }),
    })

    const imgurData = await imgurResponse.json()

    if (!imgurResponse.ok) {
      console.error('Imgur API error:', imgurData)
      throw new Error(imgurData.data.error || 'Erro ao fazer upload para o Imgur')
    }

    // Retornar a URL direta da imagem
    return NextResponse.json({ 
      url: imgurData.data.link,
      success: true,
      message: 'Imagem enviada com sucesso'
    })

  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { 
        error: 'Erro ao fazer upload da imagem. Por favor, tente novamente.',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}

export const config = {
  api: {
    bodyParser: false
  }
}

