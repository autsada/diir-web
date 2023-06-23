import React from "react"
import { MdComment, MdOutlineComment } from "react-icons/md"

import Reaction from "@/app/(watch)/watch/[id]/Reaction"

interface Props {
  openCommentsModal: () => void
}

export default function CommentsReaction({ openCommentsModal }: Props) {
  return (
    <div>
      <div className="h-[40px] flex items-center rounded-full overflow-hidden divide-x bg-gray-100">
        <Reaction
          IconOutline={MdComment}
          IconFill={MdOutlineComment}
          withDescription={false}
          onClick={openCommentsModal}
        />
      </div>
      <p className="text-white text-xs sm:text-sm">{1}</p>
    </div>
  )
}
