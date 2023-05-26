import React from "react"
import { useRouter } from "next/navigation"

import Avatar from "@/components/Avatar"
import Online from "@/components/Online"
import type { Station } from "@/graphql/codegen/graphql"

interface Props {
  item: Station
  defaultId: string
  onRequestToSwitchStation: (id: string) => void
}

export default function StationItem({
  item,
  defaultId,
  onRequestToSwitchStation,
}: Props) {
  const router = useRouter()

  return (
    <div
      className="py-2 px-2 sm:px-4 flex items-center cursor-pointer rounded-lg hover:bg-gray-50"
      onClick={
        item.id === defaultId
          ? () => router.push(`/station/${defaultId}`)
          : onRequestToSwitchStation.bind(undefined, item.id)
      }
    >
      <div className="relative">
        <Avatar profile={item} width={50} height={50} />
        {defaultId === item?.id && <Online />}
      </div>
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
