import React, { useState, useCallback } from "react"
import Link from "next/link"
import { HiDotsVertical } from "react-icons/hi"

import VideoPlayer from "@/components/VideoPlayer"
import Avatar from "@/components/Avatar"
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

export default function WLIItem({ publish, setPOS, onOpenActions }: Props) {
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
    <div className="relative w-full mb-4 sm:mb-2 bg-white">
      <div className="relative z-0 flex flex-col sm:flex-row gap-y-2 sm:gap-x-2 sm:gap-y-0">
        <div className="w-full sm:w-1/2 sm:max-w-[240px]">
          <Link href={`/watch/${publish.id}`}>
            <div
              className="relative w-full h-[200px] sm:h-[130px] bg-neutral-600 rounded-xl overflow-hidden"
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
        </div>

        <div className="w-full sm:w-1/2 flex sm:flex-col gap-x-2 sm:gap-x-0 px-4 sm:px-0 py-2 sm:py-0">
          <div className="sm:hidden">
            <Avatar profile={publish.creator} />
          </div>
          <div className="pr-4">
            <Link href={`/watch/${publish.id}`}>
              <h6 className="text-base">
                {getPostExcerpt(publish.title || "", 100)}
              </h6>
            </Link>
            <div className="mt-1">
              <StationName profile={publish.creator} fontSize="sm" />
              <Link href={`/watch/${publish.id}`}>
                <div className="flex items-center gap-x-4 text-textExtraLight">
                  <p className="text-xs">{publish.views || 0} views</p>
                  <p className="text-xs">
                    {calculateTimeElapsed(publish.createdAt)}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute top-[205px] sm:-top-1 right-3 sm:right-0 cursor-pointer py-2 px-1"
        onClick={openActionsModal}
      >
        <HiDotsVertical />
      </div>
    </div>
  )
}
