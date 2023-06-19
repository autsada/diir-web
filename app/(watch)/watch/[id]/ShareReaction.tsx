import React, { useState, useCallback } from "react"
import { AiOutlineShareAlt } from "react-icons/ai"

import Reaction from "./Reaction"
import ShareModal from "@/app/(publishes)/ShareModal"

interface Props {
  publishId: string
  title: string
  withDescription?: boolean
}

export default function ShareReaction({
  publishId,
  title,
  withDescription = true,
}: Props) {
  const [shareModalVisible, setShareModalVisible] = useState(false)

  const openShareModal = useCallback(() => {
    setShareModalVisible(true)
  }, [])

  const closeShareModal = useCallback(() => {
    setShareModalVisible(false)
  }, [])

  const onStartShare = useCallback(async () => {
    if (typeof window === "undefined" || !publishId) return

    const shareData = {
      title: title || "",
      text: title || "",
      url: `https://4c04-2405-9800-b961-39d-98db-d99c-fb3e-5d9b.ngrok-free.app/watch/${publishId}`,
    }

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.error(error)
      }
    } else {
      openShareModal()
    }
  }, [publishId, title, openShareModal])

  return (
    <>
      <div className="h-[40px] flex items-center rounded-full overflow-hidden divide-x bg-gray-100">
        <Reaction
          IconOutline={AiOutlineShareAlt}
          IconFill={AiOutlineShareAlt}
          description="Share"
          withDescription={withDescription}
          isActive={false}
          onClick={onStartShare}
        />
      </div>

      {shareModalVisible && (
        <ShareModal
          publishId={publishId}
          title={title}
          closeModal={closeShareModal}
        />
      )}
    </>
  )
}
