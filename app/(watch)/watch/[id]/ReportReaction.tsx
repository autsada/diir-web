import React from "react"
import { AiOutlineFlag, AiFillFlag } from "react-icons/ai"

import Reaction from "./ReactTion"

export default function ReportReaction() {
  return (
    <div className="h-[40px] flex items-center rounded-full overflow-hidden divide-x bg-gray-100">
      <Reaction
        width={120}
        IconOutline={AiOutlineFlag}
        IconFill={AiFillFlag}
        desc="Report"
        isActive={false}
        onClick={() => {}}
      />
    </div>
  )
}
