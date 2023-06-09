import React, { useState } from "react"

import ModalWrapper from "@/components/ModalWrapper"
import CommentDetails from "./CommentDetails"
import CommentsHeader from "./CommentsHeader"
import CloseButton from "@/components/CloseButton"
import type {
  FetchCommentsResponse,
  Maybe,
  Station,
  Comment,
} from "@/graphql/codegen/graphql"
import type { OrderBy } from "@/graphql/types"

interface Props {
  isAuthenticated: boolean
  profile: Maybe<Station> | undefined
  commentsCount: number
  closeModal: () => void
  publishId: string
  commentsResult: Maybe<FetchCommentsResponse> | undefined
  subCommentsVisible: boolean
  openSubComments: (c: Comment) => void
  activeComment: Comment | undefined
  closeSubComments: () => void
  modalTop: number
}

export default function CommentsModal({
  isAuthenticated,
  profile,
  commentsCount,
  closeModal,
  publishId,
  commentsResult,
  subCommentsVisible,
  openSubComments,
  activeComment,
  closeSubComments,
  modalTop,
}: Props) {
  const [sortBy, setSortBy] = useState<OrderBy>("counts")
  const [commentsResponse, setCommentsResponse] = useState(commentsResult)

  return (
    <ModalWrapper visible>
      {/* 310px is from 270 for video player height plus 70 for navbar height */}
      <div
        className={`fixed bottom-0 w-[100%] text-left bg-white rounded-tl-xl rounded-tr-xl overflow-hidden`}
        style={{ top: modalTop }}
      >
        <div className="p-4 flex items-center justify-between border-b border-neutral-100">
          <CommentsHeader
            subCommentsVisible={subCommentsVisible}
            commentsCount={commentsCount}
            publishId={publishId}
            closeSubComments={closeSubComments}
            setCommentsResponse={setCommentsResponse}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          <div>
            <CloseButton onClick={closeModal} />
          </div>
        </div>
        <CommentDetails
          isAuthenticated={isAuthenticated}
          profile={profile}
          publishId={publishId}
          commentsResult={commentsResponse}
          subCommentsVisible={subCommentsVisible}
          openSubComments={openSubComments}
          activeComment={activeComment}
          fetchCommentsSortBy={sortBy}
        />
      </div>
    </ModalWrapper>
  )
}
