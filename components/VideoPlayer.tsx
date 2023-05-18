"use client"

import Player from "react-player"

import { Playback } from "@/graphql/types"

interface Props {
  playback: Playback
  autoPlay?: boolean
}

export default function VideoPlayer({ playback, autoPlay = false }: Props) {
  return (
    <Player
      url={playback.hls}
      controls
      width="100%"
      height="100%"
      pip={true}
      playsinline={true}
      muted={true}
      playing={autoPlay}
    />
  )
}
