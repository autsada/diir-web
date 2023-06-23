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
  width?: string // w-[100px] for exp
}

export default function Reaction({
  IconOutline,
  IconFill,
  size = 22,
  description,
  withDescription,
  isActive,
  onClick,
  width,
}: Props) {
  return (
    <div
      className={`relative h-full ${
        !width ? "w-max" : width
      } px-4 flex items-center justify-center gap-x-2 cursor-pointer bg-gray-100 hover:bg-gray-200`}
      onClick={onClick}
    >
      <div className="h-full flex items-center justify-center">
        {isActive ? <IconFill size={size} /> : <IconOutline size={size} />}
      </div>

      {description && withDescription && (
        <div className="h-full text-xs sm:text-sm flex items-center justify-center">
          {description}
        </div>
      )}
    </div>
  )
}
