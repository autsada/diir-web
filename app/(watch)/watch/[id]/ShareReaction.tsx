import React from "react"
import { AiOutlineShareAlt } from "react-icons/ai"

import Reaction from "./ReactTion"

export default function ShareReaction() {
  return (
    <div className="h-[40px] flex items-center rounded-full overflow-hidden divide-x bg-gray-100">
      <Reaction
        width={110}
        IconOutline={AiOutlineShareAlt}
        IconFill={AiOutlineShareAlt}
        desc="Share"
        isActive={false}
        onClick={() => {}}
      />
    </div>
  )
}
