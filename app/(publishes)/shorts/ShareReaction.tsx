import React from "react"
import { AiOutlineShareAlt } from "react-icons/ai"

import Reaction from "@/app/(watch)/watch/[id]/Reaction"

interface Props {
  onStartShare: () => void
}

export default function ShareReaction({ onStartShare }: Props) {
  return (
    <div className="h-[40px] flex items-center rounded-full overflow-hidden divide-x bg-gray-100">
      <Reaction
        IconOutline={AiOutlineShareAlt}
        IconFill={AiOutlineShareAlt}
        description="Share"
        withDescription={false}
        isActive={false}
        onClick={onStartShare}
      />
    </div>
  )
}
