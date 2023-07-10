import React from "react"
import { BsBookmarkFill, BsBookmark } from "react-icons/bs"

import Reaction from "../../watch/[id]/Reaction"

interface Props {
  bookmarked: boolean
  bookmark: () => void
}

export default function BookmarkReaction({ bookmarked, bookmark }: Props) {
  return (
    <div className="h-[40px] flex items-center rounded-full overflow-hidden divide-x bg-gray-100">
      <Reaction
        IconOutline={BsBookmark}
        IconFill={BsBookmarkFill}
        isActive={bookmarked}
        width="w-[70px]"
        onClick={bookmark}
        withDescription={false}
        size={18}
      />
    </div>
  )
}
