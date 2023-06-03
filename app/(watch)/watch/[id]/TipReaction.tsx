import React, { useCallback } from "react"
import { AiOutlineDollarCircle, AiFillDollarCircle } from "react-icons/ai"

import Reaction from "./ReactTion"
import { useAuthContext } from "@/context/AuthContext"

interface Props {
  isAuthenticated: boolean
  publishId: string
}

export default function TipReaction({ isAuthenticated, publishId }: Props) {
  const { onVisible: openAuthModal } = useAuthContext()

  const handleTip = useCallback(() => {
    if (!publishId) return

    if (!isAuthenticated) {
      openAuthModal()
    }
  }, [publishId, isAuthenticated, openAuthModal])

  return (
    <div className="h-[40px] flex items-center rounded-full overflow-hidden divide-x bg-gray-100">
      <Reaction
        IconOutline={AiOutlineDollarCircle}
        IconFill={AiFillDollarCircle}
        desc="Tip"
        isActive={false}
        onClick={handleTip}
      />
    </div>
  )
}
