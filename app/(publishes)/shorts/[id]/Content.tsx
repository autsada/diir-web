"use client"

import React, { useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MdKeyboardBackspace } from "react-icons/md"

interface Props {
  id: string
}

export default function Content({ id }: Props) {
  const router = useRouter()

  const goBack = useCallback(() => {
    router.back()
  }, [router])

  return (
    <div className="fixed z-50 inset-0 bg-black">
      <div
        className="fixed z-50 top-8 left-4 p-2 cursor-pointer bg-neutral-400 rounded-full"
        onClick={goBack}
      >
        <MdKeyboardBackspace color="white" size={25} />
      </div>
      <div className="w-full h-full flex">
        <div></div>
      </div>
    </div>
  )
}
