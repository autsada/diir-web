import React from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"

export default function Tag({
  tag,
  onClick,
}: {
  tag: string
  onClick: (t: string) => void
}) {
  return (
    <div className="px-2 lg:px-3 h-[30px] rounded-full bg-neutral-200 flex items-center justify-center gap-x-2 lg:gap-x-3">
      <span className="text-sm">{tag}</span>
      <AiOutlineCloseCircle
        size={16}
        className="cursor-pointer"
        onClick={onClick.bind(undefined, tag)}
      />
    </div>
  )
}
