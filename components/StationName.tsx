"use client"

import React from "react"
import Link from "next/link"

import { getPostExcerpt } from "@/lib/client"
import type { Station } from "@/graphql/codegen/graphql"

interface Props {
  profile: Station
  fontSize?: "sm" | "base" | "lg"
}

export default function StationName({ profile, fontSize = "base" }: Props) {
  return (
    <Link href={`/@${profile.name}`}>
      <div className="flex items-center gap-x-2">
        <h6
          className={
            fontSize === "sm"
              ? "text-xs sm:text-sm"
              : fontSize === "base"
              ? "text-sm sm:text-base"
              : "text-base sm:text-lg"
          }
        >
          {getPostExcerpt(profile?.displayName || "", 8)}
        </h6>
        <span className="text-thin text-xs">|</span>
        <p
          className={`font-light text-textLight ${
            fontSize === "sm"
              ? "text-xs"
              : fontSize === "base"
              ? "text-base"
              : "text-lg"
          }`}
        >
          @{getPostExcerpt(profile?.name || "", 8)}
        </p>
      </div>
    </Link>
  )
}
