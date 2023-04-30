import React from "react"

import Avatar from "@/components/Avatar"
import type { Station } from "@/graphql/types"

interface Props {
  item: Station
}

export default function StationItem({ item }: Props) {
  return (
    <div className="py-2 px-2 sm:px-4 flex items-center cursor-pointer rounded-lg hover:bg-gray-50">
      <Avatar profile={item} width={50} height={50} />
      <div className="ml-5 flex-grow">
        <p>{item?.displayName}</p>
        <p className="text-textExtraLight">@{item?.name}</p>
        <div className="flex items-center gap-x-2 mt-1">
          <p className="font-light text-textExtraLight">
            <span className="text-textRegular">{item.followersCount}</span>{" "}
            Followers
          </p>
          <p className="font-light text-textExtraLight">
            <span className="text-textRegular">{item.followingCount}</span>{" "}
            Following
          </p>
          <p className="font-light text-textExtraLight">
            <span className="text-textRegular">{item.publishesCount}</span>{" "}
            Publishes
          </p>
        </div>
      </div>
    </div>
  )
}
