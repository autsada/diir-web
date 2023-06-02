import React from "react"
import { AiOutlineFolderAdd, AiFillFolderAdd } from "react-icons/ai"

import Reaction from "./ReactTion"

export default function SaveReaction() {
  return (
    <div className="h-[40px] flex items-center rounded-full overflow-hidden divide-x bg-gray-100">
      <Reaction
        width={100}
        IconOutline={AiOutlineFolderAdd}
        IconFill={AiFillFolderAdd}
        desc="Save"
        isActive={false}
        onClick={() => {}}
      />
    </div>
  )
}
