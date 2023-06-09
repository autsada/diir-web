"use client"

import React, { useState, useCallback, useEffect } from "react"
import { isMobile } from "react-device-detect"
import { BsCaretDown } from "react-icons/bs"
import { useRouter } from "next/navigation"
import { onSnapshot, doc } from "firebase/firestore"

import CommentDetails from "./CommentDetails"
import CommentsModal from "./CommentsModal"
import CommentsHeader from "./CommentsHeader"
import Avatar from "@/components/Avatar"
import { db, publishesCollection } from "@/firebase/config"
import { getPostExcerpt } from "@/lib/client"
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
  // 310px is from 270 for video player height plus 70 for navbar height
  const [modalPOS, setModalPOS] = useState(310)

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
    // Get the player element to get its position for use to set comment modal position
    const el = document?.getElementById("player")
    if (el) {
      const { bottom } = el?.getBoundingClientRect()
      if (bottom >= 70) {
        setModalPOS(bottom)
      }
    }
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
    <div className="mt-4">
      {isMobile ? (
        <>
          <div
            className="flex items-center justify-between bg-neutral-100 px-4 rounded-md"
            onClick={openCommentsModal}
          >
            <div className="h-full flex-grow py-2 flex flex-col items-start justify-center gap-y-2">
              <h6 className="text-base">{publish.commentsCount} Comments</h6>
              <div className="w-full flex items-center gap-x-2">
                <div>
                  <Avatar
                    profile={publish.lastComment?.creator}
                    width={25}
                    height={25}
                  />
                </div>
                <div className="h-full w-full text-sm">
                  {getPostExcerpt(publish.lastComment?.content || "", 45)}
                </div>
              </div>
            </div>
            <div className="w-[30px] py-2 text-right flex items-center justify-end">
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
              modalTop={modalPOS}
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
