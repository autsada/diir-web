import React from "react"
import Image from "next/image"
import Link from "next/link"

import type { Station } from "@/graphql/codegen/graphql"

interface Props {
  profile: Station | null | undefined // Profile is a logged in station
  width?: number
  height?: number
  fontSize?:
    | "text-base"
    | "text-lg"
    | "text-xl"
    | "text-2xl"
    | "text-4xl"
    | "text-6xl"
  withLink?: boolean
}

export default function Avatar({
  profile,
  width = 40,
  height = 40,
  fontSize = "text-base",
  withLink = true,
}: Props) {
  const profileColor = profile?.defaultColor
  const bgColor = profileColor || "#f97316"

  return withLink ? (
    <Link href={`/@${profile?.name}`}>
      <div
        className={`flex items-center justify-center rounded-full overflow-hidden cursor-pointer`}
        style={{
          width,
          height,
        }}
      >
        {!profile || !profile.image ? (
          !profile ? (
            <div className="w-full h-full flex items-center justify-center bg-blueBase text-white text-xs">
              DiiR
            </div>
          ) : (
            <div
              className={`w-full h-full flex items-center justify-center text-white ${fontSize}`}
              style={{ backgroundColor: bgColor }}
            >
              {profile.displayName
                ? profile.displayName.slice(0, 1).toUpperCase()
                : "A"}
            </div>
          )
        ) : (
          <Image
            src={profile.image}
            alt={profile.displayName || ""}
            width={width}
            height={height}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </Link>
  ) : (
    <div
      className={`flex items-center justify-center rounded-full overflow-hidden cursor-pointer`}
      style={{
        width,
        height,
      }}
    >
      {!profile || !profile.image ? (
        !profile ? (
          <div className="w-full h-full flex items-center justify-center bg-blueBase text-white text-xs">
            DiiR
          </div>
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center text-white ${fontSize}`}
            style={{ backgroundColor: bgColor }}
          >
            {profile.displayName
              ? profile.displayName.slice(0, 1).toUpperCase()
              : "A"}
          </div>
        )
      ) : (
        <Image
          src={profile.image}
          alt={profile.displayName || ""}
          width={width}
          height={height}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  )
}
