import { ContentData, DEFAULT_CONTENT } from '@/types/content'

const GITHUB_API_URL = 'https://api.github.com'
const OWNER = process.env.GITHUB_OWNER || 'dev1amin'
const REPO = process.env.GITHUB_REPO || 'rogerio'
const TOKEN = process.env.GITHUB_TOKEN || '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'

export async function getContent(): Promise<ContentData> {
  if (!TOKEN || !OWNER || !REPO) {
    console.error('GitHub configuration missing:', { OWNER, REPO, hasToken: !!TOKEN })
    return DEFAULT_CONTENT
  }

  try {
    const response = await fetch(
      `${GITHUB_API_URL}/repos/${OWNER}/${REPO}/contents/content.json`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
        cache: 'no-store'
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        console.log('Content file not found, creating with default content')
        // If file doesn't exist, create it with default content
        const success = await updateContent(DEFAULT_CONTENT)
        if (success) {
          return DEFAULT_CONTENT
        }
      }
      const errorText = await response.text()
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}\n${errorText}`)
    }

    const data = await response.json()
    
    if (!data || !data.content) {
      console.error('Invalid GitHub response:', data)
      return DEFAULT_CONTENT
    }

    try {
      const decodedContent = Buffer.from(data.content, 'base64').toString()
      const parsedContent = JSON.parse(decodedContent)
      
      // Ensure we have valid content with all required properties
      const validatedContent = {
        ...DEFAULT_CONTENT,
        ...parsedContent,
        styles: {
          ...DEFAULT_CONTENT.styles,
          ...(parsedContent.styles || {})
        },
        blocks: Array.isArray(parsedContent.blocks) ? parsedContent.blocks : DEFAULT_CONTENT.blocks,
        images: {
          ...DEFAULT_CONTENT.images,
          ...(parsedContent.images || {})
        }
      }

      return validatedContent
    } catch (parseError) {
      console.error('Error parsing content:', parseError)
      // Try to create the file with default content if parsing fails
      await updateContent(DEFAULT_CONTENT)
      return DEFAULT_CONTENT
    }
  } catch (error) {
    console.error('Error fetching content:', error)
    return DEFAULT_CONTENT
  }
}

export async function updateContent(content: ContentData): Promise<boolean> {
  if (!TOKEN || !OWNER || !REPO) {
    console.error('GitHub configuration missing:', { OWNER, REPO, hasToken: !!TOKEN })
    throw new Error('Configuração do GitHub ausente')
  }

  try {
    // Validate content before sending
    if (!content || typeof content !== 'object') {
      throw new Error('Conteúdo inválido')
    }

    // First, try to get the existing file to get its SHA
    const existingFileResponse = await fetch(
      `${GITHUB_API_URL}/repos/${OWNER}/${REPO}/contents/content.json`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        }
      }
    )

    let sha: string | undefined
    if (existingFileResponse.ok) {
      const existingData = await existingFileResponse.json()
      sha = existingData.sha
    }

    // Ensure content is properly formatted
    const contentToSave = {
      ...DEFAULT_CONTENT,
      ...content,
      styles: {
        ...DEFAULT_CONTENT.styles,
        ...(content.styles || {})
      },
      blocks: Array.isArray(content.blocks) ? content.blocks : DEFAULT_CONTENT.blocks,
      images: {
        ...DEFAULT_CONTENT.images,
        ...(content.images || {})
      }
    }

    const contentString = JSON.stringify(contentToSave, null, 2)
    const contentBase64 = Buffer.from(contentString).toString('base64')

    const response = await fetch(
      `${GITHUB_API_URL}/repos/${OWNER}/${REPO}/contents/content.json`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Update content.json',
          content: contentBase64,
          ...(sha ? { sha } : {})
        })
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        `Erro na API do GitHub: ${errorData.message || response.statusText}`
      )
    }

    return true
  } catch (error) {
    console.error('Error updating content:', error)
    throw error
  }
}

