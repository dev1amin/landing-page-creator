'use client'

import { useState, useRef, useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'
import { useClickAway } from 'react-use'
import { Button } from '@/components/ui/button'

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  label: string
}

export function ColorPicker({ color, onChange, label }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const popover = useRef<HTMLDivElement>(null)

  useClickAway(popover, () => setIsOpen(false))

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={() => setIsOpen(true)}
        >
          <div
            className="w-4 h-4 rounded border"
            style={{ backgroundColor: color }}
          />
          {color}
        </Button>
      </div>

      {isOpen && (
        <div
          ref={popover}
          className="absolute z-50 top-full mt-2 bg-white rounded-lg shadow-lg p-4"
        >
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  )
}

