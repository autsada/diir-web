import React, { useEffect } from "react"

import Backdrop from "@/components/Backdrop"

interface Props {
  visible: boolean
  children: React.ReactNode
  closeModal?: () => void
}

export default function CustomModalWrapper({
  visible,
  children,
  closeModal,
}: Props) {
  // Disable body scroll when actions modal openned
  useEffect(() => {
    const els = document?.getElementsByTagName("body")

    if (visible) {
      if (els[0]) {
        els[0].style.overflow = "hidden"
      }
    } else {
      if (els[0]) {
        els[0].style.overflow = "auto"
      }
    }

    return () => {
      if (els[0]) {
        els[0].style.overflow = "auto"
      }
    }
  }, [visible])

  if (!visible) return null

  return (
    <>
      <div className="absolute inset-0 flex flex-col justify-start sm:justify-center md:justify-center items-center z-[100] pt-20 sm:pt-0 md:pt-0">
        {children}
      </div>
      <Backdrop visible />
    </>
  )
}
