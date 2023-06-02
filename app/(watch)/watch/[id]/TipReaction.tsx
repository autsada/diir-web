import React from "react"
import { AiOutlineDollarCircle, AiFillDollarCircle } from "react-icons/ai"

import Reaction from "./ReactTion"

export default function TipReaction() {
  return (
    <div className="h-[40px] flex items-center rounded-full overflow-hidden divide-x bg-gray-100">
      <Reaction
        IconOutline={AiOutlineDollarCircle}
        IconFill={AiFillDollarCircle}
        desc="Tip"
        isActive={false}
        onClick={() => {}}
      />
    </div>
  )
}
