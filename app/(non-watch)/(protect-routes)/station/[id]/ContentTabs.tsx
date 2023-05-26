"use client"

import React from "react"
import { useParams } from "next/navigation"

import Tab from "@/components/Tab"
import type { Station } from "@/graphql/codegen/graphql"

interface Props {
  station: Station
}

export default function ContentTabs({ station }: Props) {
  const params = useParams()
  const tab = params?.tab

  return (
    <div className="flex gap-x-1 sm:gap-x-4">
      <Tab
        href={`/@${station.name}/featured`}
        name="HOME"
        isActive={!tab || tab === "featured"}
      />
      <Tab
        href={`/@${station.name}/videos`}
        name="VIDEOS"
        isActive={tab === "videos"}
      />
      <Tab
        href={`/@${station.name}/shorts`}
        name="SHORTS"
        isActive={tab === "shorts"}
      />
      <Tab
        href={`/@${station.name}/podcasts`}
        name="PODCASTS"
        isActive={tab === "podcasts"}
      />
      <Tab
        href={`/@${station.name}/blogs`}
        name="BLOGS"
        isActive={tab === "blogs"}
      />
    </div>
  )
}
