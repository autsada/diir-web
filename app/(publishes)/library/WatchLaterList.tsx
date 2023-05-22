"use client"

import React from "react"
import Link from "next/link"
import { AiOutlineClockCircle } from "react-icons/ai"

export default function WatchLaterList() {
  return (
    <div className="w-full sm:w-[50%] flex items-center justify-between">
      <Link href="/library/WL">
        <div className="flex items-start gap-x-4 cursor-pointer">
          <AiOutlineClockCircle size={22} />
          <h6>Watch later</h6>
        </div>
      </Link>

      <Link href="/library/WL">
        <div>
          <button className="text-blueBase px-6 rounded-full hover:bg-neutral-100">
            See all
          </button>
        </div>
      </Link>
    </div>
  )
}
