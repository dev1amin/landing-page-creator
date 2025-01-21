'use client'

import { useState } from 'react'
import { Block } from '@/types/content'
import { SortableBlock } from './sortable-block'
import { BlockCreator } from './block-creator'
import { BlockEditorPopup } from './block-editor-popup'

interface BlockManagerProps {
  blocks: Block[]
  onChange: (blocks: Block[]) => void
}

export function BlockManager({ blocks = [], onChange }: BlockManagerProps) {
  const [selectedBlock, setSelectedBlock] = useState<Block | undefined>(undefined)
  const [isEditing, setIsEditing] = useState(false)

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks]
    const newIndex = direction === 'up' ? index - 1 : index + 1

    // Check if move is possible
    if (newIndex < 0 || newIndex >= blocks.length) return

    // Swap blocks
    [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]]
    onChange(newBlocks)
  }

  const handleCreateBlock = (newBlock: Block) => {
    onChange([...blocks, newBlock])
  }

  const handleDuplicate = (blockId: string) => {
    const blockToDuplicate = blocks.find((block) => block.id === blockId)
    if (!blockToDuplicate) return

    const newBlock = {
      ...blockToDuplicate,
      id: `${blockToDuplicate.type}-${Date.now()}`,
    }

    onChange([...blocks, newBlock])
  }

  const handleDelete = (blockId: string) => {
    onChange(blocks.filter((block) => block.id !== blockId))
  }

  const handleUpdateBlock = (updatedBlock: Block) => {
    onChange(
      blocks.map((block) =>
        block.id === updatedBlock.id ? updatedBlock : block
      )
    )
  }

  return (
    <div className="space-y-4">
      <BlockCreator onCreateBlock={handleCreateBlock} />

      <div className="space-y-2">
        {blocks.map((block, index) => (
          <SortableBlock
            key={block.id}
            block={block}
            onDuplicate={() => handleDuplicate(block.id)}
            onDelete={() => handleDelete(block.id)}
            onMoveUp={() => moveBlock(index, 'up')}
            onMoveDown={() => moveBlock(index, 'down')}
            onClick={() => {
              setSelectedBlock(block)
              setIsEditing(true)
            }}
            isFirst={index === 0}
            isLast={index === blocks.length - 1}
          />
        ))}
      </div>

      <BlockEditorPopup
        block={selectedBlock}
        isOpen={isEditing}
        onClose={() => {
          setIsEditing(false)
          setSelectedBlock(undefined)
        }}
        onChange={handleUpdateBlock}
      />
    </div>
  )
}

