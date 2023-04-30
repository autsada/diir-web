import React from "react"

import Avatar from "../Avatar"
import type { Station } from "@/graphql/types"

interface Props {
  item: Station
}

export default function StationItem({ item }: Props) {
  return (
    <div className="p-2 flex items-center cursor-pointer rounded-lg hover:bg-gray-50">
      <Avatar profile={item} width={50} height={50} />
      <div className="ml-5 flex-grow">
        <p className="text-sm text-textLight">{item?.displayName}</p>
        <p className="text-sm text-textLight">@{item?.name}</p>
        <div className="flex items-center">
          <p className="text-sm font-thin text-textExtraLight">
            {item.followersCount} Followers
          </p>
          <p className="text-sm font-thin text-textExtraLight ml-2">
            {item.publishesCount} Publishes
          </p>
        </div>
      </div>
    </div>
  )
}
