"use client"

import React, { useState, useCallback, useTransition } from "react"
import { useRouter } from "next/navigation"
import type { IconType } from "react-icons"

import LikeReaction from "../../watch/[id]/LikeReaction"
import BookmarkReaction from "./BookmarkReaction"
import TipReaction from "../../watch/[id]/TipReaction"
import ShareReaction from "../../watch/[id]/ShareReaction"
import ReportReaction from "../../watch/[id]/ReportReaction"
import { useAuthContext } from "@/context/AuthContext"
import { bookmarkPost } from "@/app/(publishes)/blogs/actions"
import type { Publish } from "@/graphql/codegen/graphql"

interface Props {
  isAuthenticated: boolean
  publish: Publish
}

export default function BlogReactions({ isAuthenticated, publish }: Props) {
  const publishId = publish.id
  const liked = !!publish.liked
  const likesCount = publish.likesCount
  const disLiked = !!publish.disLiked

  const [optimisticBookmarked, setOptimisticBookmarked] = useState(
    !!publish.bookmarked
  )

  const [isPending, startTransition] = useTransition()
  const { onVisible: openAuthModal } = useAuthContext()
  const router = useRouter()

  const bookmark = useCallback(() => {
    if (!isAuthenticated) {
      openAuthModal("Sign in to bookmark the blog.")
    } else {
      setOptimisticBookmarked((prev) => !prev)
      startTransition(() => bookmarkPost(publishId))
      // Refresh to update the UIs
      router.refresh()
    }
  }, [isAuthenticated, publishId, openAuthModal, router])

  return (
    <div className="w-max flex items-center gap-x-2 sm:gap-x-3 xl:gap-x-4">
      <LikeReaction
        isAuthenticated={isAuthenticated}
        publishId={publishId}
        liked={liked}
        likesCount={likesCount}
        disLiked={disLiked}
        buttonWith="w-[80px]"
      />
      <BookmarkReaction bookmarked={optimisticBookmarked} bookmark={bookmark} />
      <TipReaction isAuthenticated={isAuthenticated} publish={publish} />
      <ShareReaction
        publishId={publish.id}
        title={publish.title || "ViewWit blog"}
      />
      <ReportReaction title="Report blog" publishId={publish?.id} />
    </div>
  )
}

interface ReactionProps {
  IconOutline: IconType
  description?: string
  width?: string // w-[100px] for exp
}

function Reaction({ IconOutline, description, width }: ReactionProps) {
  return (
    <div
      className={`relative h-full ${
        !width ? "w-max" : width
      } px-4 flex items-center justify-center gap-x-2 cursor-pointer bg-gray-100 hover:bg-gray-200`}
    >
      <div className="h-full flex items-center justify-center">
        <IconOutline className="text-2xl" />
      </div>

      {description && (
        <div className="h-full font-semibold text-xs sm:text-sm flex items-center justify-center">
          {description}
        </div>
      )}
    </div>
  )
}
