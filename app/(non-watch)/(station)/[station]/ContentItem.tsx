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

export default function ContentItem({ publish, onOpenActions, setPOS }: Props) {
  const thumbnail =
    publish?.thumbSource === "custom" && publish?.thumbnail
      ? publish?.thumbnail
      : publish?.playback?.thumbnail
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
    <div className="relative w-full sm:w-[220px] cursor-pointer">
      <div className="relative z-0 flex sm:flex-col gap-x-2 sm:gap-x-0 sm:gap-y-2">
        <Link href={`/watch/${publish.id}`}>
          <div
            className="relative w-[180px] sm:w-full h-[100px] sm:h-[120px] bg-neutral-700 rounded-lg overflow-hidden"
            onMouseOver={onMouseOn}
            onMouseLeave={onMouseLeave}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnail || ""}
              alt={publish.title || ""}
              className={`${playing || !thumbnail ? "hidden" : "block"} ${
                publish?.kind === "Short" ? "object-contain" : "object-cover"
              }`}
            />
            <div
              className={`${
                !playing && thumbnail ? "hidden" : "block"
              } w-full h-full`}
            >
              <VideoPlayer
                playback={publish.playback || undefined}
                controls={playing}
                playing={playing}
                thumbnail={publish.kind === "Short" ? undefined : thumbnail}
                playIcon={<></>}
              />

              {publish.playback && (
                <div className="absolute bottom-2 right-2 px-[2px] rounded-sm bg-white font-thin text-xs flex items-center justify-center">
                  {secondsToHourFormat(publish.playback?.duration)}
                </div>
              )}
            </div>
          </div>
        </Link>

        <div className="flex-grow text-left mr-4">
          <Link href={`/watch/${publish.id}`}>
            <h6 className="text-sm sm:text-base">
              {getPostExcerpt(publish.title || "", 40)}
            </h6>
          </Link>
          <Link href={`/watch/${publish.id}`}>
            <div className="flex items-center gap-x-4">
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

      <div
        className="absolute top-0 sm:top-[135px] right-0 px-[2px]"
        onClick={onClick}
      >
        <HiDotsVertical />
      </div>
    </div>
  )
}
