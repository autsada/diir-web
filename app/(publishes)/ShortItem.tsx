import React, { useState, useCallback } from "react"
import Link from "next/link"

import VideoPlayer from "@/components/VideoPlayer"
import { getPostExcerpt } from "@/lib/client"
import type { Publish } from "@/graphql/codegen/graphql"

interface Props {
  publish: Publish
}

export default function ShortItem({ publish }: Props) {
  const thumbnail =
    publish?.thumbSource === "custom" && publish?.thumbnail
      ? publish?.thumbnail
      : publish?.playback?.thumbnail
  const [playing, setPlaying] = useState(false)

  const onMouseOn = useCallback(() => {
    setPlaying(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setPlaying(false)
  }, [])

  return (
    <Link href={`/shorts`}>
      <div
        className="h-[250px] w-[150px] sm:h-[300px] sm:w-[180px] md:h-[380px] md:w-[220px] flex items-center justify-center rounded-xl overflow-hidden bg-neutral-700 cursor-pointer"
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
      </div>
      <div className="mt-2 w-full">
        <h6 className="text-base sm:text-lg">
          {getPostExcerpt(publish.title || "", 60)}
        </h6>
        <p className="font-light text-textLight text-sm sm:text-base">
          {publish.views || 0} view{publish.views === 1 ? "" : "s"}
        </p>
      </div>
    </Link>
  )
}
