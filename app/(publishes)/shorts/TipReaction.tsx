import React from "react"
import { AiOutlineDollarCircle, AiFillDollarCircle } from "react-icons/ai"

import Reaction from "@/app/(watch)/watch/[id]/Reaction"

interface Props {
  handleStartTip: () => void
}

export default function TipReaction({ handleStartTip }: Props) {
  return (
    <div className="h-[40px] flex items-center rounded-full overflow-hidden divide-x bg-gray-100">
      <Reaction
        IconOutline={AiOutlineDollarCircle}
        IconFill={AiFillDollarCircle}
        withDescription={false}
        isActive={false}
        onClick={handleStartTip}
      />
    </div>
  )
}
