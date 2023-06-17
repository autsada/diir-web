import React, { useState, useCallback } from "react"
import Link from "next/link"
import { HiDotsVertical } from "react-icons/hi"

import VideoPlayer from "@/components/VideoPlayer"
import Avatar from "@/components/Avatar"
import { getPostExcerpt } from "@/lib/client"
import type { Publish } from "@/graphql/codegen/graphql"

interface Props {
  publish: Publish
  onOpenActions: (p: Publish) => void
  setPOS: (
    posX: number,
    posY: number,
    screenHeight: number,
    screenWidth: number
  ) => void
}

export default function ShortItem({ publish, onOpenActions, setPOS }: Props) {
  const thumbnail =
    publish?.thumbSource === "custom" && publish?.thumbnail
      ? publish?.thumbnail
      : publish?.playback?.thumbnail
  const creator = publish.creator
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
    <div className="relative w-full max-w-[200px] sm:max-w-[220px] md:max-w-[240px]">
      <Link href={`/shorts/${publish.id}`}>
        <div
          className="relative h-[300px] md:h-[340px] lg:h-[380px] flex items-center justify-center rounded-xl overflow-hidden bg-neutral-700 cursor-pointer"
          onMouseOver={onMouseOn}
          onMouseLeave={onMouseLeave}
        >
          <VideoPlayer
            playback={publish.playback || undefined}
            controls={playing}
            playing={playing}
            thumbnail={thumbnail}
            playIcon={<></>}
          />
          <div className="absolute bottom-0 w-full py-1 px-2">
            <div className="flex items-end gap-x-2">
              <Avatar
                profile={publish.creator}
                width={30}
                height={30}
                withLink={false}
              />
              <div className="flex items-center gap-x-1">
                <h6 className="text-sm text-white">
                  {creator?.displayName || ""}
                </h6>
                <span className="text-thin text-xs text-white">|</span>
                <p className="text-sm text-white">@{creator?.name || ""}</p>
              </div>
            </div>
            <h6 className="mt-1 text-base sm:text-lg text-white">
              {getPostExcerpt(publish.title || "", 40)}
            </h6>
            <p className="font-light text-sm sm:text-base text-white">
              {publish.views || 0} view{publish.views === 1 ? "" : "s"}
            </p>
          </div>
        </div>
      </Link>

      <div
        className="absolute top-0 right-0 px-1 py-2 cursor-pointer bg-neutral-600 opacity-50 rounded-md rounded-tr-xl"
        onClick={onClick}
      >
        <HiDotsVertical color="white" />
      </div>
    </div>
  )
}
