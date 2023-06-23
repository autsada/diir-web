"use client"

import React, { useCallback } from "react"
import { useRouter } from "next/navigation"
import { MdKeyboardBackspace } from "react-icons/md"

export default function ContentSection() {
  const router = useRouter()

  const goBack = useCallback(() => {
    router.back()
  }, [router])

  return (
    <div className="relative">
      <div
        className="absolute top-4 left-4 px-2 cursor-pointer"
        onClick={goBack}
      >
        <MdKeyboardBackspace color="white" size={25} />
      </div>
    </div>
  )
}
