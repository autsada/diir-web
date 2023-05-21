"use client"

import Player from "react-player"
import { JSXElementConstructor, ReactElement } from "react"

import type { Playback } from "@/graphql/types"

interface Props {
  playback: Playback
  autoPlay?: boolean
  controls?: boolean
  thumbnail?: string
  playIcon?: ReactElement<any, string | JSXElementConstructor<any>> | undefined
}

export default function VideoPlayer({
  playback,
  autoPlay = false,
  controls = true,
  thumbnail,
  playIcon,
}: Props) {
  if (!playback) return null

  return (
    <Player
      url={playback?.hls}
      controls={controls}
      light={thumbnail || undefined}
      width="100%"
      height="100%"
      pip={true}
      playsinline={true}
      muted={true}
      playing={autoPlay}
      playIcon={playIcon}
    />
  )
}
