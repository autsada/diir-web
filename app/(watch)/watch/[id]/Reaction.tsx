import React from "react"
import type { IconType } from "react-icons"

interface Props {
  IconOutline: IconType
  IconFill: IconType
  size?: number
  description?: string
  withDescription: boolean
  isActive?: boolean
  onClick: () => void
}

export default function Reaction({
  IconOutline,
  IconFill,
  size = 22,
  description,
  withDescription,
  isActive,
  onClick,
}: Props) {
  return (
    <div
      className="relative h-full w-max px-4 flex items-center gap-x-2 cursor-pointer bg-gray-100 hover:bg-gray-200"
      onClick={onClick}
    >
      <div className="h-full flex items-center justify-center">
        {isActive ? <IconFill size={size} /> : <IconOutline size={size} />}
      </div>

      {description && withDescription && (
        <div className="h-full font-semibold text-sm sm:text-base flex items-center justify-center">
          {description}
        </div>
      )}
    </div>
  )
}
