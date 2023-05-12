import React from "react"

import type { UploadedPublish } from "@/graphql/types"

interface Props {
  publish: UploadedPublish
}

export default function PublishItem({ publish }: Props) {
  return (
    <tr className="text-sm h-[100px] cursor-pointer bg-gray-50 hover:bg-gray-100">
      <th className="w-[35%] sm:w-[15%] font-normal py-2 break-words">
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              publish.thumbnail && publish.thumbSource === "custom"
                ? publish.thumbnail
                : publish.playback.thumbnail
            }
            alt={publish.title || ""}
            className="w-full h-full max-h-[84px] object-cover"
          />
          <span className="absolute bottom-0 right-0 text-white">
            {publish.playback.duration}
          </span>
        </div>
      </th>
      <th className="w-[25%] sm:w-[10%] font-normal py-2 break-words">
        {publish.title}
      </th>
      <th className="w-[20%] sm:w-[15%] font-normal py-2 hidden sm:table-cell break-words">
        {publish.description || "-"}
      </th>
      <th className="w-[20%] sm:w-[15%] font-normal py-2 break-words">
        {publish.visibility}
      </th>
      <th className="w-[20%] sm:w-[10%] font-normal py-2 break-words">
        {publish.createdAt}
      </th>
      <th className="w-[20%] sm:w-[7%] font-normal py-2 hidden sm:table-cell break-words">
        {publish.views}
      </th>
      <th className="w-[20%] sm:w-[7%] font-normal py-2 hidden sm:table-cell break-words">
        {publish.tipsCount}
      </th>
      <th className="w-[20%] sm:w-[7%] font-normal py-2 hidden sm:table-cell break-words">
        {publish.commentsCount}
      </th>
      <th className="w-[20%] sm:w-[7%] font-normal py-2 hidden sm:table-cell break-words">
        {publish.likesCount}
      </th>
      <th className="w-[20%] sm:w-[7%] font-normal py-2 hidden sm:table-cell break-words">
        {publish.disLikesCount}
      </th>
    </tr>
  )
}
