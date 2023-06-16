"use client"

import type { JSXElementConstructor, ReactElement } from "react"
import Player from "react-player"

import type { PlaybackLink } from "@/graphql/codegen/graphql"

interface Props {
  playback: PlaybackLink | undefined
  playing?: boolean
  controls?: boolean
  thumbnail?: string
  playIcon?: ReactElement<any, string | JSXElementConstructor<any>> | undefined
  onReady?: () => void
}

export default function VideoPlayer({
  playback,
  playing = false,
  controls = true,
  thumbnail,
  playIcon,
  onReady,
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
      onReady={onReady}
    />
  )
}
