import React from "react"
import Image from "next/image"

import type { Station } from "@/graphql/types"

interface Props {
  profile: Station | null | undefined // Profile is a logged in station
  width?: number
  height?: number
}

export default function Avatar({ profile, width = 40, height = 40 }: Props) {
  return (
    <div
      className={`flex items-center justify-center rounded-full overflow-hidden cursor-pointer`}
      style={{
        width,
        height,
      }}
    >
      {!profile || !profile.image ? (
        !profile ? (
          <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-xs">
            DiiR
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-orange-500 text-white">
            {profile.displayName.slice(0, 1).toUpperCase()}
          </div>
        )
      ) : (
        <Image
          src={profile.image}
          alt={profile.displayName}
          className="w-full h-full"
        />
      )}
    </div>
  )
}
