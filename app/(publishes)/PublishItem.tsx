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
  publish: Publish | null | undefined
  onOpenActions: (p: Publish) => void
  setPOS: (posX: number, posY: number, screenHeight: number) => void
}

export default function PublishItem({ publish, onOpenActions, setPOS }: Props) {
  const thumbnail =
    publish?.thumbSource === "custom" && publish?.thumbnail
      ? publish?.thumbnail
      : publish?.playback?.thumbnail
  const [playing, setPlaying] = useState(false)

  function onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!publish) return
    onOpenActions(publish)
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
    <div className="relative w-full sm:w-[340px] md:w-full lg:max-w-[380px] bg-white cursor-pointer">
      <div className="relative z-0">
        <Link href={`/watch/${publish.id}`}>
          <div
            className="relative h-[240px] sm:h-[200px] md:h-[180px] lg:h-[220px] xl:h-[200px] bg-neutral-700 rounded-none sm:rounded-xl overflow-hidden"
            onMouseOver={onMouseOn}
            onMouseLeave={onMouseLeave}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnail || ""}
              alt={publish.title || ""}
              className={`${
                playing || !thumbnail ? "hidden" : "block"
              } w-full h-full ${
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
            </div>
            {publish.playback && (
              <div className="absolute bottom-2 right-2 px-[2px] rounded-sm bg-white font-thin text-xs flex items-center justify-center">
                {secondsToHourFormat(publish.playback?.duration)}
              </div>
            )}
          </div>
        </Link>

        <div className="flex items-start py-4 px-2 gap-x-5">
          <Avatar profile={publish.creator} />
          <div className="w-full text-left mr-8">
            <Link href={`/watch/${publish.id}`}>
              <h6 className="text-base sm:text-lg">
                {getPostExcerpt(publish.title || "", 60)}
              </h6>
            </Link>
            <StationName profile={publish.creator} />
            <Link href={`/watch/${publish.id}`}>
              <div className="flex items-center gap-x-4">
                <p className="font-light text-textLight text-sm sm:text-base">
                  {publish.views || 0} view{publish.views === 1 ? "" : "s"}
                </p>
                <p className="font-light text-textLight text-sm sm:text-base">
                  {calculateTimeElapsed(publish.createdAt)}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div
        className="absolute top-[250px] sm:top-[210px] md:top-[190px] lg:top-[230px] xl:top-[210px] right-2 p-[10px]"
        onClick={onClick}
      >
        <HiDotsVertical />
      </div>
    </div>
  )
}
