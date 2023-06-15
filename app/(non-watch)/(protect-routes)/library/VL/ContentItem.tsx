import React, { useState, useCallback } from "react"
import Link from "next/link"
import { HiDotsVertical } from "react-icons/hi"

import VideoPlayer from "@/components/VideoPlayer"
import StationName from "@/components/StationName"
import {
  calculateTimeElapsed,
  getPostExcerpt,
  secondsToHourFormat,
} from "@/lib/client"
import type { Publish } from "@/graphql/codegen/graphql"

interface Props {
  publish: Publish
  setPOS: (posX: number, posY: number, screenHeight: number) => void
  onOpenActions: (p: Publish) => void
}

export default function ContentItem({ publish, setPOS, onOpenActions }: Props) {
  const [playing, setPlaying] = useState(false)

  const onMouseOn = useCallback(() => {
    setPlaying(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setPlaying(false)
  }, [])

  const openActionsModal = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onOpenActions(publish)
      setPOS(e.clientX, e.clientY, window?.innerHeight)
    },
    [publish, setPOS, onOpenActions]
  )

  if (!publish) return null

  return (
    <div className="relative w-full bg-white">
      <div className="relative z-0 flex gap-x-2 sm:gap-x-4">
        <Link href={`/watch/${publish.id}`}>
          <div
            className="relative w-[180px] sm:w-[200px] lg:w-[240px] h-[110px] lg:h-[130px] bg-neutral-700 rounded-xl overflow-hidden"
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

        <div className="flex-grow mr-4">
          <div>
            <Link href={`/watch/${publish.id}`}>
              <h6 className="text-base">
                {getPostExcerpt(publish.title || "", 50)}
              </h6>
            </Link>
            <div className="mt-1">
              <StationName profile={publish.creator} fontSize="base" />
              <Link href={`/watch/${publish.id}`}>
                <div className="flex items-center gap-x-4 text-textExtraLight">
                  <p className="text-textLight text-sm sm:text-base">
                    {publish.views || 0} views
                  </p>
                  <p className="text-textLight text-sm sm:text-base">
                    {calculateTimeElapsed(publish.createdAt)}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute -top-1 right-0 cursor-pointer py-2 px-1"
        onClick={openActionsModal}
      >
        <HiDotsVertical />
      </div>
    </div>
  )
}
