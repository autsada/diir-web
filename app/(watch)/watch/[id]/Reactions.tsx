"use client"

import React from "react"
import {
  AiOutlineDislike,
  AiFillDislike,
  AiFillLike,
  AiOutlineLike,
  AiOutlineDollarCircle,
  AiFillDollarCircle,
  AiOutlineShareAlt,
  AiOutlineFlag,
  AiFillFlag,
  AiOutlineFolderAdd,
  AiFillFolderAdd,
} from "react-icons/ai"
import type { IconType } from "react-icons"

export default function Reactions() {
  return (
    <>
      <div className="h-[40px] flex items-center rounded-full overflow-hidden divide-x">
        <Reaction
          IconOutline={AiOutlineLike}
          IconFill={AiFillLike}
          desc="0"
          isActive={false}
        />
        <Reaction
          IconOutline={AiOutlineDislike}
          IconFill={AiFillDislike}
          isActive={false}
        />
      </div>

      <div className="h-[40px] flex items-center rounded-full overflow-hidden divide-x bg-gray-100">
        <Reaction
          IconOutline={AiOutlineDollarCircle}
          IconFill={AiFillDollarCircle}
          desc="Tip"
          isActive={false}
        />
      </div>

      <div className="h-[40px] flex items-center rounded-full overflow-hidden divide-x bg-gray-100">
        <Reaction
          IconOutline={AiOutlineShareAlt}
          IconFill={AiOutlineShareAlt}
          desc="Share"
          isActive={false}
        />
      </div>

      <div className="h-[40px] flex items-center rounded-full overflow-hidden divide-x bg-gray-100">
        <Reaction
          IconOutline={AiOutlineFolderAdd}
          IconFill={AiFillFolderAdd}
          desc="Save"
          isActive={false}
        />
      </div>

      <div className="h-[40px] flex items-center rounded-full overflow-hidden divide-x bg-gray-100">
        <Reaction
          IconOutline={AiOutlineFlag}
          IconFill={AiFillFlag}
          desc="Report"
          isActive={false}
        />
      </div>
    </>
  )
}

function Reaction({
  IconOutline,
  IconFill,
  size = 22,
  desc,
  isActive,
}: {
  IconOutline: IconType
  IconFill: IconType
  size?: number
  desc?: string
  isActive: boolean
}) {
  return (
    <div className="h-full px-5 flex items-center gap-x-2 cursor-pointer bg-gray-100 hover:bg-gray-200">
      <div className="h-full flex items-center justify-center">
        {isActive ? <IconFill size={size} /> : <IconOutline size={size} />}
      </div>

      {desc && (
        <div className="h-full text-sm sm:text-base flex items-center justify-center">
          {desc}
        </div>
      )}
    </div>
  )
}
