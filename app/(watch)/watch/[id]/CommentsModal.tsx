import React from "react"

import type { Maybe, Station } from "@/graphql/codegen/graphql"
import ModalWrapper from "@/components/ModalWrapper"
import CommentDetails from "./CommentDetails"
import CloseButton from "@/components/CloseButton"

interface Props {
  profile: Maybe<Station> | undefined
  commentsCount: number
  closeModal: () => void
  publishId: string
}

export default function CommentsModal({
  profile,
  commentsCount,
  closeModal,
  publishId,
}: Props) {
  return (
    <ModalWrapper visible>
      <div className="fixed z-20 bottom-0 py-6 w-[100%] h-[70%] text-left bg-white rounded-tl-xl rounded-tr-xl overflow-hidden">
        <CloseButton onClick={closeModal} className="absolute right-6 top-3" />
        <CommentDetails
          profile={profile}
          commentsCount={commentsCount}
          publishId={publishId}
        />
      </div>
    </ModalWrapper>
  )
}
