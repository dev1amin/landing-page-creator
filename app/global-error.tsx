'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to help with debugging
    console.error('Global error:', {
      message: error?.message,
      stack: error?.stack,
      digest: error?.digest,
      error
    })
  }, [error])

  // Handle empty error objects and provide meaningful messages
  let errorMessage = 'Ocorreu um erro crítico. Por favor, tente novamente.'
  let errorDetails = 'Detalhes do erro não disponíveis'

  if (error) {
    if (typeof error === 'string') {
      errorMessage = error
      errorDetails = error
    } else if (error instanceof Error) {
      errorMessage = error.message || errorMessage
      errorDetails = error.stack || errorDetails
    } else if (typeof error === 'object') {
      if (Object.keys(error).length === 0) {
        errorMessage = 'Erro crítico desconhecido'
        errorDetails = 'Um erro crítico ocorreu ao processar sua solicitação'
      } else {
        errorMessage = JSON.stringify(error)
        errorDetails = JSON.stringify(error, null, 2)
      }
    }
  }

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="flex justify-center mb-4">
                <AlertCircle className="h-12 w-12 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Erro Crítico
              </h2>
              <p className="text-gray-600 mb-6">
                {errorMessage}
              </p>
              <div className="space-y-2">
                <Button
                  onClick={() => {
                    // Clear any cached data that might be causing the error
                    window.sessionStorage.clear()
                    localStorage.clear()
                    // Reset any error boundaries
                    reset()
                  }}
                  className="w-full"
                >
                  Tentar novamente
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="w-full"
                >
                  Recarregar página
                </Button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

