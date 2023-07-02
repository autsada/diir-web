"use client"

import React from "react"
import { useParams } from "next/navigation"

import Tab from "@/components/Tab"
import type { Station } from "@/graphql/codegen/graphql"
import { publishKinds } from "@/lib/helpers"

interface Props {
  station: Station
}

export default function PublishTabs({ station }: Props) {
  const isOwner = station?.isOwner
  const params = useParams()
  const tab = params?.kind

  return (
    <div className="flex gap-x-1 sm:gap-x-4">
      <Tab href={`/upload/publishes`} name="HOME" isActive={!tab} />
      {publishKinds.map((k) =>
        k === "ads" && !isOwner ? null : (
          <Tab
            key={k}
            href={`/upload/publishes/${k.toLowerCase()}`}
            name={k.toUpperCase()}
            isActive={tab === k.toLowerCase()}
          />
        )
      )}
    </div>
  )
}
