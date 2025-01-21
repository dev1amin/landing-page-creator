import { Block, ContentData } from '@/types/content'

interface VideoBlockProps {
  block: Block
  content: ContentData
}

export default function VideoBlock({ block, content }: VideoBlockProps) {
  // Ensure we have content with proper fallbacks
  const { title, description, videoUrl } = block.content || {}

  // Function to get proper embed URL
  const getEmbedUrl = (url: string) => {
    try {
      // Handle different YouTube URL formats
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        // Extract video ID
        let videoId = ''
        if (url.includes('v=')) {
          videoId = url.split('v=')[1].split('&')[0]
        } else if (url.includes('youtu.be/')) {
          videoId = url.split('youtu.be/')[1].split('?')[0]
        }
        
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`
        }
      }
      
      // If it's already an embed URL, return as is
      if (url.includes('/embed/')) {
        return url
      }
      
      return url
    } catch (error) {
      console.error('Error processing video URL:', error)
      return ''
    }
  }

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {title && (
          <h2 className="text-3xl font-bold text-center">
            {title}
          </h2>
        )}
        
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
          {videoUrl ? (
            <iframe
              src={getEmbedUrl(videoUrl)}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <p>Vídeo não disponível</p>
            </div>
          )}
        </div>

        {description && (
          <div className="prose max-w-none">
            <p className="text-gray-600 text-center">{description}</p>
          </div>
        )}
      </div>
    </div>
  )
}

