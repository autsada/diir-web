import React from "react"
import type { IconType } from "react-icons"

interface Props {
  width?: number
  IconOutline: IconType
  IconFill: IconType
  size?: number
  desc?: string
  isActive?: boolean
  onClick: () => void
}

export default function Reaction({
  width = 90,
  IconOutline,
  IconFill,
  size = 22,
  desc,
  isActive,
  onClick,
}: Props) {
  return (
    <div
      className="relative h-full px-4 flex items-center gap-x-2 cursor-pointer bg-gray-100 hover:bg-gray-200"
      style={{ width }}
      onClick={onClick}
    >
      <div className="h-full flex items-center justify-center">
        {isActive ? <IconFill size={size} /> : <IconOutline size={size} />}
      </div>

      {desc && (
        <div className="h-full font-semibold text-sm sm:text-base flex items-center justify-center">
          {desc}
        </div>
      )}
    </div>
  )
}
