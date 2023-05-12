"use client"

import React from "react"
import { useParams } from "next/navigation"

import Tab from "@/components/Tab"
import type { Station } from "@/graphql/types"

interface Props {
  station: Station
}

export default function PublishTabs({ station }: Props) {
  const params = useParams()
  const kind = params?.kind

  return (
    <div className="flex gap-x-1 sm:gap-x-4">
      <Tab
        href="/upload/publishes/all"
        name="ALL"
        isActive={!kind || kind === "all"}
      />
      <Tab
        href="/upload/publishes/videos"
        name="VIDEOS"
        isActive={kind === "videos"}
      />
      <Tab
        href="/upload/publishes/podcasts"
        name="PODCASTS"
        isActive={kind === "podcasts"}
      />
      <Tab
        href="/upload/publishes/blogs"
        name="BLOGS"
        isActive={kind === "blogs"}
      />
    </div>
  )
}
