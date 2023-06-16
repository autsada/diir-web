"use client"

import React, { useCallback, useEffect, useState, useTransition } from "react"

import VideoPlayer from "@/components/VideoPlayer"
import { countPublishViews } from "./actions"
import type { PlaybackLink } from "@/graphql/codegen/graphql"

interface Props {
  publishId: string
  playback: PlaybackLink
}

export default function PlayerSection({ publishId, playback }: Props) {
  const duration = playback?.duration
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>()

  const [isPending, startTransition] = useTransition()

  // Clear interval when unmount
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [intervalId])

  const countViews = useCallback(() => {
    startTransition(() => countPublishViews(publishId))
  }, [publishId])

  const onStartWatching = useCallback(
    (video: HTMLVideoElement) => {
      let playedDuration = 0
      let id: NodeJS.Timer | undefined = undefined
      let isCounted = false

      const startTimer = () => {
        if (isCounted) return

        id = setInterval(() => {
          playedDuration += 1

          // Videos from 30 sec to 1 min
          if (duration >= 30 && duration <= 60) {
            if (playedDuration >= 30) {
              clearInterval(id)
              countViews()
              isCounted = true
            }
          }

          // Videos between 1-2 mins
          if (duration > 60 && duration <= 120) {
            if (playedDuration >= 45) {
              clearInterval(id)
              countViews()
              isCounted = true
            }
          }

          // Videos greater than 2 mins
          if (duration > 120) {
            // 2 min or longer videos
            if (playedDuration >= 60) {
              clearInterval(id)
              countViews()
              isCounted = true
            }
          }
        }, 1000)
        setIntervalId(id)
      }

      const pauseTimer = () => {
        if (id) {
          clearInterval(id)
        }
      }

      const endTimer = () => {
        pauseTimer()

        // Videos less than 30 secs, will only count view on end
        if (isCounted) return
        if (duration < 30) {
          countViews()
          isCounted = true
        }
      }

      if (video) {
        video.addEventListener("play", startTimer)
        video.addEventListener("pause", pauseTimer)
        video.addEventListener("ended", endTimer)
      }
    },
    [duration, countViews]
  )

  const onReady = useCallback(() => {
    const els = document?.getElementsByTagName("video")
    const video = els[0]
    onStartWatching(video)
  }, [onStartWatching])

  return <VideoPlayer playback={playback} playing={true} onReady={onReady} />
}
