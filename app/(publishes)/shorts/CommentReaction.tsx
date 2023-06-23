import React from "react"
import { MdComment, MdOutlineComment } from "react-icons/md"

import Reaction from "@/app/(watch)/watch/[id]/Reaction"

interface Props {
  commentAction: () => void
  commentsCount: number
}

export default function CommentsReaction({
  commentAction,
  commentsCount,
}: Props) {
  return (
    <div>
      <div className="h-[40px] flex items-center rounded-full overflow-hidden divide-x bg-gray-100">
        <Reaction
          IconOutline={MdComment}
          IconFill={MdOutlineComment}
          withDescription={false}
          onClick={commentAction}
        />
      </div>
      <p className="text-white text-xs sm:text-sm">
        {commentsCount ? commentsCount : <>&nbsp;</>}
      </p>
    </div>
  )
}
