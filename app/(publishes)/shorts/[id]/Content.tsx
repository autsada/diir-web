"use client"

import React, { useCallback, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { MdKeyboardBackspace } from "react-icons/md"

interface Props {
  id: string
  fetchedResult: any
}

export default function Content({ id, fetchedResult }: Props) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  // Register scroll event
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!containerRef?.current) return

    const container = containerRef.current
    let isScrolling = false
    let timeoutId: NodeJS.Timer | undefined = undefined

    function onScroll(e: WheelEvent) {
      if (!isScrolling) {
        if (e.deltaY < 0) {
          console.log("up -->")
        } else if (e.deltaY > 0) {
          console.log("down -->")
        }

        isScrolling = true
      }

      // Clear the timeout on each scroll event
      if (timeoutId) clearTimeout(timeoutId)

      // Set a timeout to detect scroll end
      const id = setTimeout(() => {
        isScrolling = false
      }, 200)
      timeoutId = id
    }

    container.addEventListener("wheel", onScroll)

    return () => {
      container.removeEventListener("wheel", onScroll)
    }
  }, [])

  const goBack = useCallback(() => {
    router.back()
  }, [router])

  return (
    <div className="fixed z-50 inset-0 h-screen bg-black">
      <div
        className="fixed z-50 top-8 left-4 p-2 cursor-pointer bg-neutral-400 rounded-full"
        onClick={goBack}
      >
        <MdKeyboardBackspace color="white" size={25} />
      </div>
      <div ref={containerRef} className="w-full h-full flex">
        <div
          className="w-[60%] min-w-[600px] h-full bg-white overflow-y-auto scrollbar-hide"
          // onWheel={(e) => {
          //   if (e.deltaY < 0) {
          //     console.log("up")
          //   } else if (e.deltaY > 0) {
          //     console.log("down")
          //   }
          // }}
        >
          Player
        </div>
        <div className="w-[40%] h-full bg-red-300">Comment</div>
      </div>
    </div>
  )
}
