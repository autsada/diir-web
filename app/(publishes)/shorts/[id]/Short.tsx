"use client"

import React, { useCallback } from "react"
import { useRouter } from "next/navigation"
import { MdKeyboardBackspace } from "react-icons/md"
import Player from "./PlayerSection"

export default function Short() {
  const router = useRouter()

  const goBack = useCallback(() => {
    router.back()
  }, [router])

  return (
    <div className="relative h-full w-full sm:w-[340px] sm:rounded-xl overflow-hidden">
      <div
        className="sm:hidden absolute top-2 left-4 p-2 cursor-pointer"
        onClick={goBack}
      >
        <MdKeyboardBackspace size={25} />
      </div>
      <Player />
    </div>
  )
}
