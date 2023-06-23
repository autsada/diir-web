/**
 * For use in the `ViewModal` which is a carousel item as it has a layout issue on the modal so we cannot reuse the `Reactions` component that we already have.
 */

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { onSnapshot, doc } from "firebase/firestore"

import LikeReaction from "@/app/(watch)/watch/[id]/LikeReaction"
import TipReaction from "./TipReaction"
import ShareReaction from "./ShareReaction"
import SaveReaction from "./SaveReaction"
import ReportReaction from "./ReportReaction"
import CommentsReaction from "./CommentReaction"
import { db, publishesCollection } from "@/firebase/config"
import type { Publish } from "@/graphql/codegen/graphql"

interface Props {
  publish: Publish
  isAuthenticated: boolean
  handleStartTip: () => void
  onStartShare: () => void
  handleSavePublish: () => Promise<void>
  openReportModal: () => void
  commentAction: () => void
}

export default function ActionsForCarousel({
  publish,
  isAuthenticated,
  handleStartTip,
  onStartShare,
  handleSavePublish,
  openReportModal,
  commentAction,
}: Props) {
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

  return (
    <>
      <LikeReaction
        isAuthenticated={isAuthenticated}
        publishId={publish?.id}
        liked={!!publish?.liked}
        likesCount={publish?.likesCount}
        disLiked={!!publish?.disLiked}
        withDescription={false}
        verticalLayout={true}
        descriptionColor="text-white"
      />
      <TipReaction handleStartTip={handleStartTip} />
      <ShareReaction onStartShare={onStartShare} />
      <SaveReaction handleSavePublish={handleSavePublish} />
      <ReportReaction openReportModal={openReportModal} />
      <CommentsReaction
        commentAction={commentAction}
        commentsCount={publish?.commentsCount}
      />
    </>
  )
}
