"use client"

import React from "react"
import { useParams } from "next/navigation"

import LinkTab from "@/components/LinkTab"
import { publishKinds } from "@/lib/helpers"
import type { Station } from "@/graphql/codegen/graphql"

interface Props {
  station: Station
}

export default function ContentTabs({ station }: Props) {
  const isOwner = station.isOwner
  const params = useParams()
  const tab = params?.tab

  return (
    <div className="flex gap-x-1 sm:gap-x-4">
      <LinkTab href={`/@${station.name}`} name="HOME" isActive={!tab} />
      {publishKinds.map((k) =>
        k === "ads" && !isOwner ? null : (
          <LinkTab
            key={k}
            href={`/@${station.name}/${k.toLowerCase()}`}
            name={k.toUpperCase()}
            isActive={tab === k.toLowerCase()}
          />
        )
      )}
    </div>
  )
}
