'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Upload, Loader2, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface ImageUploaderProps {
  currentImage?: string
  onImageUpload: (imageUrl: string) => void
  label?: string
}

export function ImageUploader({ currentImage, onImageUpload, label = 'Imagem' }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null) // Added state for preview URL
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    await uploadFile(file)
  }

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione uma imagem válida')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('A imagem deve ter no máximo 5MB')
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer upload da imagem')
      }

      // Use the URL directly as both preview and final URL
      setPreviewUrl(data.url)
      onImageUpload(data.url)
    } catch (err) {
      console.error('Upload error:', err)
      setError(err instanceof Error ? err.message : 'Erro ao fazer upload da imagem')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      await uploadFile(file)
    }
  }

  // Use previewUrl if available, otherwise fall back to currentImage
  const displayImage = previewUrl || currentImage

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      
      <div
        className={`flex flex-col items-center gap-4 p-4 border-2 border-dashed rounded-lg transition-colors ${
          isDragging ? 'border-primary bg-primary/10' : 'border-border'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {displayImage && (
          <div className="relative w-full aspect-video">
            <Image
              src={displayImage}
              alt="Preview"
              fill
              className="object-contain"
              unoptimized // Add this to bypass image optimization for external URLs
            />
          </div>
        )}
        
        <div className="flex flex-col items-center gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={isUploading}
            onClick={() => inputRef.current?.click()}
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                {displayImage ? 'Trocar imagem' : 'Enviar imagem'}
              </>
            )}
          </Button>
          
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <p className="text-sm text-muted-foreground text-center">
            Arraste uma imagem aqui ou clique para selecionar
            <br />
            JPG, PNG, GIF ou WebP até 5MB
          </p>
        </div>
      </div>
    </div>
  )
}

