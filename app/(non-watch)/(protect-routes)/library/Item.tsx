import React, { useState, useCallback } from "react"
import Link from "next/link"
import { HiDotsVertical } from "react-icons/hi"

import VideoPlayer from "@/components/VideoPlayer"
import {
  calculateTimeElapsed,
  getPostExcerpt,
  secondsToHourFormat,
} from "@/lib/client"
import type { Publish } from "@/graphql/codegen/graphql"

interface Props {
  publish: Publish | null | undefined
  onOpenActions: (p: Publish) => void
  setPOS: (
    posX: number,
    posY: number,
    screenHeight: number,
    screenWidth: number
  ) => void
}

export default function Item({ publish, onOpenActions, setPOS }: Props) {
  const [playing, setPlaying] = useState(false)

  function onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!publish) return
    onOpenActions(publish)
    setPOS(e.clientX, e.clientY, window?.innerHeight, window?.innerWidth)
  }

  const onMouseOn = useCallback(() => {
    setPlaying(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setPlaying(false)
  }, [])

  if (!publish) return null

  return (
    <div className="relative w-[180px] sm:w-[240px] cursor-pointer">
      <div className="relative z-0">
        <Link href={`/watch/${publish.id}`}>
          <div
            className="relative h-[100px] sm:h-[140px] bg-neutral-600 rounded-none sm:rounded-lg overflow-hidden"
            onMouseOver={onMouseOn}
            onMouseLeave={onMouseLeave}
          >
            <VideoPlayer
              playback={publish.playback || undefined}
              controls={playing}
              playing={playing}
              thumbnail={
                publish.kind === "Short"
                  ? undefined
                  : publish.thumbSource === "custom" && publish.thumbnail
                  ? publish.thumbnail
                  : publish.playback?.thumbnail
              }
              playIcon={<></>}
            />

            {publish.playback && (
              <div className="absolute bottom-2 right-2 px-[2px] rounded-sm bg-white font-thin text-xs flex items-center justify-center">
                {secondsToHourFormat(publish.playback?.duration)}
              </div>
            )}
          </div>
        </Link>

        <div className="mt-2 text-left mr-4">
          <Link href={`/watch/${publish.id}`}>
            <h6 className="text-sm sm:text-base">
              {getPostExcerpt(publish.title || "", 40)}
            </h6>
          </Link>
          <Link href={`/@${publish.creator?.name}`}>
            <div className="flex items-center gap-x-2">
              <h6 className="text-xs sm:text-sm">
                {publish.creator?.displayName || ""}
              </h6>
              <span className="text-thin text-xs">|</span>
              <p className="font-light text-textLight text-xs sm:text-sm">
                @{publish.creator?.name || ""}
              </p>
            </div>
          </Link>
          <Link href={`/watch/${publish.id}`}>
            <div className="flex items-center gap-x-4">
              <p className="font-light text-textExtraLight text-xs sm:text-sm">
                {publish.views || 0} views
              </p>
              <p className="font-light text-textExtraLight text-xs sm:text-sm">
                {calculateTimeElapsed(publish.createdAt)}
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div
        className="absolute top-[100px] sm:top-[140px] right-0 py-[8px] px-[2px]"
        onClick={onClick}
      >
        <HiDotsVertical />
      </div>
    </div>
  )
}
