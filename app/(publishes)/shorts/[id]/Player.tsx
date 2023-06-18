import React from "react"

import VideoPlayer from "@/components/VideoPlayer"
import type { Publish } from "@/graphql/codegen/graphql"

interface Props {
  publish: Publish
}

export default function Player({ publish }: Props) {
  if (!publish.playback) return null

  return (
    <div className="h-full flex items-center justify-center">
      <VideoPlayer playback={publish.playback} playing loop />
    </div>
  )
}
