"use client"

import Player from "react-player"
import { JSXElementConstructor, ReactElement } from "react"

import type { Playback } from "@/graphql/types"

interface Props {
  playback: Playback
  playing?: boolean
  controls?: boolean
  thumbnail?: string
  playIcon?: ReactElement<any, string | JSXElementConstructor<any>> | undefined
}

export default function VideoPlayer({
  playback,
  playing = false,
  controls = true,
  thumbnail,
  playIcon,
}: Props) {
  if (!playback) return null

  return (
    <Player
      url={playback?.hls}
      controls={controls}
      light={playing ? undefined : thumbnail || undefined}
      width="100%"
      height="100%"
      pip={true}
      playsinline={true}
      muted={true}
      playing={playing}
      playIcon={playIcon}
    />
  )
}
