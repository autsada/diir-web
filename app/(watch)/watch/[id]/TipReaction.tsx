import React, { useState, useCallback } from "react"
import { AiOutlineDollarCircle, AiFillDollarCircle } from "react-icons/ai"

import Reaction from "./Reaction"
import TipModal from "./TipModal"
import { useAuthContext } from "@/context/AuthContext"
import type { Publish } from "@/graphql/codegen/graphql"

interface Props {
  isAuthenticated: boolean
  publish: Publish
  withDescription?: boolean
}

export default function TipReaction({
  isAuthenticated,
  publish,
  withDescription = true,
}: Props) {
  const [tipModalVisible, setTipModalVisible] = useState(false)

  const { onVisible: openAuthModal } = useAuthContext()

  const handleStartTip = useCallback(() => {
    if (!publish?.id) return

    if (!isAuthenticated) {
      openAuthModal()
    } else {
      setTipModalVisible(true)
    }
  }, [publish, isAuthenticated, openAuthModal])

  const closeModal = useCallback(() => {
    setTipModalVisible(false)
  }, [])

  return (
    <>
      <div className="h-[40px] flex items-center rounded-full overflow-hidden divide-x bg-gray-100">
        <Reaction
          IconOutline={AiOutlineDollarCircle}
          IconFill={AiFillDollarCircle}
          description="Tip"
          withDescription={withDescription}
          isActive={false}
          onClick={handleStartTip}
        />
      </div>

      {tipModalVisible && publish && (
        <TipModal
          publishId={publish?.id}
          closeModal={closeModal}
          creator={publish.creator}
        />
      )}
    </>
  )
}
