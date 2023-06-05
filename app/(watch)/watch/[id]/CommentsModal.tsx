import React from "react"

import ModalWrapper from "@/components/ModalWrapper"
import CommentDetails from "./CommentDetails"
import CloseButton from "@/components/CloseButton"
import type {
  FetchCommentsResponse,
  Maybe,
  Station,
} from "@/graphql/codegen/graphql"

interface Props {
  isAuthenticated: boolean
  profile: Maybe<Station> | undefined
  commentsCount: number
  closeModal: () => void
  publishId: string
  commentsResult: Maybe<FetchCommentsResponse> | undefined
}

export default function CommentsModal({
  isAuthenticated,
  profile,
  commentsCount,
  closeModal,
  publishId,
  commentsResult,
}: Props) {
  return (
    <ModalWrapper visible>
      <div className="fixed bottom-0 w-[100%] h-[80%] text-left bg-white rounded-tl-xl rounded-tr-xl overflow-hidden">
        <div className="p-4 flex items-center justify-between border-b border-neutral-100">
          <h6 className="text-base">{commentsCount} Comments</h6>
          <div>
            <CloseButton onClick={closeModal} />
          </div>
        </div>
        <CommentDetails
          isAuthenticated={isAuthenticated}
          profile={profile}
          publishId={publishId}
          commentsResult={commentsResult}
        />
      </div>
    </ModalWrapper>
  )
}
