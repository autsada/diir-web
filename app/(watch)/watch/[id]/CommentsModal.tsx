import React from "react"
import { MdArrowBack } from "react-icons/md"

import ModalWrapper from "@/components/ModalWrapper"
import CommentDetails from "./CommentDetails"
import CloseButton from "@/components/CloseButton"
import type {
  FetchCommentsResponse,
  Maybe,
  Station,
  Comment,
} from "@/graphql/codegen/graphql"

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
}: Props) {
  return (
    <ModalWrapper visible>
      <div className="fixed bottom-0 w-[100%] h-[80%] text-left bg-white rounded-tl-xl rounded-tr-xl overflow-hidden">
        <div className="p-4 flex items-center justify-between border-b border-neutral-100">
          <div
            className={`flex items-center ${
              subCommentsVisible ? "gap-x-4" : "gap-x-2"
            }`}
          >
            {!subCommentsVisible ? (
              <>
                <h6>{commentsCount}</h6>
                <h6>Comments</h6>
              </>
            ) : (
              <>
                <MdArrowBack
                  size={22}
                  className="cursor-pointer"
                  onClick={closeSubComments}
                />
                <h6>Replies</h6>
              </>
            )}
          </div>
          <div>
            <CloseButton onClick={closeModal} />
          </div>
        </div>
        <CommentDetails
          isAuthenticated={isAuthenticated}
          profile={profile}
          publishId={publishId}
          commentsResult={commentsResult}
          subCommentsVisible={subCommentsVisible}
          openSubComments={openSubComments}
          activeComment={activeComment}
        />
      </div>
    </ModalWrapper>
  )
}
