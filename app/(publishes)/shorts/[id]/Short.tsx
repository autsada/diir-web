import React, { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MdKeyboardBackspace } from "react-icons/md"

import VideoPlayer from "@/components/VideoPlayer"
import type { Publish } from "@/graphql/codegen/graphql"

interface Props {
  item: Publish
}

export default function Short({ item }: Props) {
  const [playing, setPlaying] = useState(false)
  const [loop, setLoop] = useState(false)

  const router = useRouter()

  // Play on mounted
  useEffect(() => {
    setPlaying(true)
    setLoop(true)
  }, [])

  const goBack = useCallback(() => {
    router.back()
  }, [router])

  if (!item.playback) return null

  return (
    <>
      <div className="relative h-full md:h-[95%] lg:h-[90%] w-full sm:w-[90%] lg:w-[340px] xl:w-[300px] mx-auto bg-black sm:bg-white md:bg-black md:rounded-xl overflow-hidden">
        <div
          className="sm:hidden absolute top-4 left-4 px-2 cursor-pointer bg-neutral-500 opacity-60 rounded-full"
          onClick={goBack}
        >
          <MdKeyboardBackspace color="white" size={25} />
        </div>

        <VideoPlayer playback={item.playback} playing={playing} loop={loop} />
      </div>
      <div className="hidden sm:block w-full md:h-[3%] lg:h-[8%]"></div>
    </>
  )
}
