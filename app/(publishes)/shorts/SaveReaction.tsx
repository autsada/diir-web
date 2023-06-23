import React from "react"
import { AiOutlineFolderAdd, AiFillFolderAdd } from "react-icons/ai"

import Reaction from "@/app/(watch)/watch/[id]/Reaction"

interface Props {
  handleSavePublish: () => Promise<void>
}

export default function SaveReaction({ handleSavePublish }: Props) {
  return (
    <div className="h-[40px] flex items-center rounded-full overflow-hidden divide-x bg-gray-100">
      <Reaction
        IconOutline={AiOutlineFolderAdd}
        IconFill={AiFillFolderAdd}
        withDescription={false}
        isActive={false}
        onClick={handleSavePublish}
      />
    </div>
  )
}
