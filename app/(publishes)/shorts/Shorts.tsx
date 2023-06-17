"use client"

import React, { useCallback } from "react"
import { MdKeyboardBackspace } from "react-icons/md"
import { useRouter } from "next/navigation"
import PlayerSection from "./PlayerSection"

export default function Shorts() {
  const router = useRouter()

  const goBack = useCallback(() => {
    router.back()
  }, [router])

  return (
    <div className="fixed z-50 top-0 sm:top-[70px] bottom-0 right-0 left-0 sm:left-[100px]">
      <div className="h-full sm:py-5 flex flex-col items-center">
        <div className="relative h-full w-full sm:w-[340px] sm:rounded-xl overflow-hidden">
          <div
            className="sm:hidden absolute top-2 left-4 p-2 cursor-pointer"
            onClick={goBack}
          >
            <MdKeyboardBackspace size={25} />
          </div>
          <PlayerSection />
        </div>
      </div>
    </div>
  )
}
