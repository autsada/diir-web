"use client"

import React, { useState, useCallback, useEffect } from "react"
import { isMobile } from "react-device-detect"
import { BsCaretDown } from "react-icons/bs"
import { useRouter } from "next/navigation"
import { onSnapshot, doc } from "firebase/firestore"

import CommentDetails from "./CommentDetails"
import CommentsModal from "./CommentsModal"
import CommentsHeader from "./CommentsHeader"
import { db, publishesCollection } from "@/firebase/config"
import type {
  Maybe,
  Publish,
  Station,
  FetchCommentsResponse,
  Comment,
} from "@/graphql/codegen/graphql"
import type { OrderBy } from "@/graphql/types"

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
  const [subCommentsVisible, setSubCommentsVisible] = useState(false)
  const [activeComment, setActiveComment] = useState<Comment>()
  const [sortBy, setSortBy] = useState<OrderBy>("counts")
  const [commentsResponse, setCommentsResponse] = useState(commentsResult)

  const router = useRouter()

  // Listen to update in Firestore
  useEffect(() => {
    if (!publish?.id) return

    const unsubscribe = onSnapshot(
      doc(db, publishesCollection, publish?.id),
      (doc) => {
        // Reload data to get the most updated publish
        router.refresh()
      }
    )

    return unsubscribe
  }, [router, publish?.id])

  const openCommentsModal = useCallback(() => {
    if (!isMobile) return
    setCommentsModalVisible(true)
  }, [])

  const closeCommentsModal = useCallback(() => {
    if (!isMobile) return
    setCommentsModalVisible(false)
    setSubCommentsVisible(false)
    setActiveComment(undefined)
  }, [])

  const openSubComments = useCallback((c: Comment) => {
    setSubCommentsVisible(true)
    setActiveComment(c)
  }, [])

  const closeSubComments = useCallback(() => {
    setSubCommentsVisible(false)
    setActiveComment(undefined)
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
              subCommentsVisible={subCommentsVisible}
              openSubComments={openSubComments}
              activeComment={activeComment}
              closeSubComments={closeSubComments}
            />
          )}
        </>
      ) : (
        <>
          <CommentsHeader
            subCommentsVisible={subCommentsVisible}
            commentsCount={publish.commentsCount}
            publishId={publish.id}
            closeSubComments={closeSubComments}
            setCommentsResponse={setCommentsResponse}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          <CommentDetails
            isAuthenticated={isAuthenticated}
            profile={profile}
            publishId={publish?.id}
            commentsResult={commentsResponse}
            subCommentsVisible={subCommentsVisible}
            openSubComments={openSubComments}
            activeComment={activeComment}
            fetchCommentsSortBy={sortBy}
          />
        </>
      )}
    </div>
  )
}
