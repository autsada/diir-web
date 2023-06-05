"use client"

import React, { useState, useCallback } from "react"
import { isMobile } from "react-device-detect"
import { BsCaretDown } from "react-icons/bs"

import CommentDetails from "./CommentDetails"
import CommentsModal from "./CommentsModal"
import type {
  Maybe,
  Publish,
  Station,
  FetchCommentsResponse,
} from "@/graphql/codegen/graphql"

interface Props {
  isAuthenticated: boolean
  publish: Publish
  profile: Maybe<Station> | undefined
  commentsResult: Maybe<FetchCommentsResponse> | undefined
}

export default function Comments({
  isAuthenticated,
  publish,
  profile,
  commentsResult,
}: Props) {
  const [commentsModalVisible, setCommentsModalVisible] = useState(false)

  const openCommentsModal = useCallback(() => {
    if (!isMobile) return
    setCommentsModalVisible(true)
  }, [])

  const closeCommentsModal = useCallback(() => {
    if (!isMobile) return
    setCommentsModalVisible(false)
  }, [])

  return (
    <div className="mt-8">
      {isMobile ? (
        <>
          <div
            className="flex items-center justify-between border-t border-b border-neutral-200 py-5"
            onClick={openCommentsModal}
          >
            <p>{publish.commentsCount} Comments</p>
            <div className="px-4 py-2">
              <BsCaretDown size={22} />
            </div>
          </div>
          {isMobile && commentsModalVisible && (
            <CommentsModal
              isAuthenticated={isAuthenticated}
              profile={profile}
              commentsCount={publish.commentsCount}
              closeModal={closeCommentsModal}
              publishId={publish?.id}
              commentsResult={commentsResult}
            />
          )}
        </>
      ) : (
        <>
          <h6 className="text-base">{publish.commentsCount} Comments</h6>
          <CommentDetails
            isAuthenticated={isAuthenticated}
            profile={profile}
            publishId={publish?.id}
            commentsResult={commentsResult}
          />
        </>
      )}
    </div>
  )
}
