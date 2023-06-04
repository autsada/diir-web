"use client"

import React, { useState, useCallback } from "react"
import { isMobile } from "react-device-detect"
import { BsCaretDown } from "react-icons/bs"

import type { Maybe, Publish, Station } from "@/graphql/codegen/graphql"
import CommentDetails from "./CommentDetails"
import CommentsModal from "./CommentsModal"

interface Props {
  publish: Publish
  profile: Maybe<Station> | undefined
}

export default function Comments({ publish, profile }: Props) {
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
    <div className="mt-5">
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
              profile={profile}
              commentsCount={publish.commentsCount}
              closeModal={closeCommentsModal}
              publishId={publish?.id}
            />
          )}
        </>
      ) : (
        <CommentDetails
          profile={profile}
          commentsCount={publish.commentsCount}
          publishId={publish?.id}
        />
      )}
    </div>
  )
}
