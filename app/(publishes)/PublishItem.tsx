import React, { useState, useCallback } from "react"
import Link from "next/link"
import { HiDotsVertical } from "react-icons/hi"

import VideoPlayer from "@/components/VideoPlayer"
import Avatar from "@/components/Avatar"
import {
  calculateTimeElapsed,
  getPostExcerpt,
  secondsToHourFormat,
} from "@/lib/client"
import type { Publish } from "@/graphql/codegen/graphql"

interface Props {
  publish: Publish | null | undefined
  onAction: (p: Publish) => void
  setPOS: (posX: number, posY: number, screenHeight: number) => void
}

export default function PublishItem({ publish, onAction, setPOS }: Props) {
  const [playing, setPlaying] = useState(false)

  function onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!publish) return
    onAction(publish)
    setPOS(e.clientX, e.clientY, window?.innerHeight)
  }

  const onMouseOn = useCallback(() => {
    setPlaying(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setPlaying(false)
  }, [])

  if (!publish) return null

  return (
    <div className="relative w-full bg-white cursor-pointer">
      <div className="relative z-0">
        <Link href={`/watch/${publish.id}`}>
          <div
            className="relative w-full h-[240px] sm:h-[220px] bg-neutral-600 rounded-none sm:rounded-xl overflow-hidden"
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

          <div className="flex items-start py-4 px-2 gap-x-5">
            <div>
              <Avatar profile={publish.creator} />
            </div>
            <div className="w-full text-left mr-8">
              <h6>{getPostExcerpt(publish.title || "", 60)}</h6>
              <p className="text-textLight">
                {publish.creator?.displayName}{" "}
                <span className="italic font-light text-textExtraLight">
                  @{publish.creator?.name}
                </span>
              </p>
              <div className="flex items-center gap-x-4 text-textLight">
                <p>{publish.views || 0} views</p>
                <p>{calculateTimeElapsed(publish.createdAt)}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div
        className="absolute top-[250px] sm:top-[230px] right-2 p-[10px]"
        onClick={onClick}
      >
        <HiDotsVertical />
      </div>
    </div>
  )
}
