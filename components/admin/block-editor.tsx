'use client'

import { Block } from '@/types/content'
import { ColorPicker } from './color-picker'

interface BlockEditorProps {
  block: Block
  onChange: (block: Block) => void
}

export function BlockEditor({ block, onChange }: BlockEditorProps) {
  const handleContentChange = (key: string, value: any) => {
    onChange({
      ...block,
      content: {
        ...block.content,
        [key]: value
      }
    })
  }

  const handleStyleChange = (key: string, value: string) => {
    onChange({
      ...block,
      styles: {
        ...block.styles,
        [key]: value
      }
    })
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="font-medium text-lg mb-4">
        Editar Bloco: {block.type.charAt(0).toUpperCase() + block.type.slice(1)}
      </h3>

      {/* Content Fields */}
      <div className="space-y-4">
        {block.content.title !== undefined && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Título
            </label>
            <input
              type="text"
              value={block.content.title}
              onChange={(e) => handleContentChange('title', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        )}

        {block.content.subtitle !== undefined && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Subtítulo
            </label>
            <input
              type="text"
              value={block.content.subtitle}
              onChange={(e) => handleContentChange('subtitle', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        )}

        {block.content.description !== undefined && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Descrição
            </label>
            <textarea
              value={block.content.description}
              onChange={(e) => handleContentChange('description', e.target.value)}
              rows={4}
              className="w-full p-2 border rounded"
            />
          </div>
        )}

        {block.content.items && (
          <div className="space-y-4">
            <h4 className="font-medium">Itens</h4>
            {block.content.items.map((item, index) => (
              <div key={index} className="p-4 border rounded space-y-2">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => {
                    const newItems = [...block.content.items]
                    newItems[index] = { ...item, title: e.target.value }
                    handleContentChange('items', newItems)
                  }}
                  placeholder="Título"
                  className="w-full p-2 border rounded"
                />
                <textarea
                  value={item.description}
                  onChange={(e) => {
                    const newItems = [...block.content.items]
                    newItems[index] = { ...item, description: e.target.value }
                    handleContentChange('items', newItems)
                  }}
                  placeholder="Descrição"
                  rows={2}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                handleContentChange('items', [
                  ...block.content.items,
                  { title: '', description: '' }
                ])
              }}
              className="text-blue-600 hover:text-blue-700"
            >
              + Adicionar item
            </button>
          </div>
        )}
      </div>

      {/* Style Fields */}
      <div className="space-y-4 mt-6">
        <h4 className="font-medium">Estilos</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ColorPicker
            color={block.styles.backgroundColor || '#FFFFFF'}
            onChange={(color) => handleStyleChange('backgroundColor', color)}
            label="Cor de Fundo"
          />
          <ColorPicker
            color={block.styles.textColor || '#000000'}
            onChange={(color) => handleStyleChange('textColor', color)}
            label="Cor do Texto"
          />
          {block.type === 'hero' && (
            <>
              <ColorPicker
                color={block.styles.buttonColor || '#3B82F6'}
                onChange={(color) => handleStyleChange('buttonColor', color)}
                label="Cor do Botão"
              />
              <ColorPicker
                color={block.styles.buttonTextColor || '#FFFFFF'}
                onChange={(color) => handleStyleChange('buttonTextColor', color)}
                label="Cor do Texto do Botão"
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

