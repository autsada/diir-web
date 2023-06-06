import React, { useState, useCallback, useTransition, useMemo } from "react"
import {
  AiOutlineDislike,
  AiFillDislike,
  AiFillLike,
  AiOutlineLike,
} from "react-icons/ai"
import _ from "lodash"

import Avatar from "@/components/Avatar"
import CommentBox from "./CommentBox"
import { useExpandContent } from "@/hooks/useExpandContent"
import { useAuthContext } from "@/context/AuthContext"
import { calculateTimeElapsed } from "@/lib/client"
import {
  commentOnComment,
  disLikePublishComment,
  likePublishComment,
} from "./actions"
import type { Comment, Maybe, Station } from "@/graphql/codegen/graphql"
import StationName from "@/components/StationName"

interface Props {
  isAuthenticated: boolean
  profile: Maybe<Station> | undefined
  publishId: string
  parentComment?: Comment
  comment: Comment
  avatarSize?: number
}

export default function CommentItem({
  isAuthenticated,
  profile,
  parentComment,
  comment,
  publishId,
  avatarSize = 40,
}: Props) {
  const parentCommentId = parentComment?.id
  const commentId = comment?.id || ""
  const content = comment?.content || ""
  const initialDisplayed = 200
  const { displayedContent, expandContent, shrinkContent } = useExpandContent(
    content,
    initialDisplayed
  )

  const liked = !!comment?.liked
  const likesCount = comment?.likesCount || 0
  const disLiked = !!comment?.disLiked

  const [isReplying, setIsReplying] = useState(false)
  const [optimisticLiked, setOptimisticLiked] = useState(liked)
  const [optimisticLikesCount, setOptimisticLikesCount] = useState(likesCount)
  const [optimisticDisLiked, setOptimisticDisLiked] = useState(disLiked)

  const [isPending, startTransition] = useTransition()
  const { onVisible: openAuthModal } = useAuthContext()

  const toggleCommentBox = useCallback(() => {
    setIsReplying((prev) => !prev)
  }, [])

  const confirmReply = useCallback(() => {
    if (!publishId || !commentId) return null
    const el = document.getElementById(commentId) as HTMLTextAreaElement
    if (!el) return null

    const content = el.value
    if (!content) return null

    if (parentCommentId) {
      // Commenting on a sub-comment, we need to pass the id of the parent of the sub-comment.
      startTransition(() =>
        commentOnComment(content, publishId, parentCommentId)
      )
    } else {
      // Commenting to a comment
      startTransition(() => commentOnComment(content, publishId, commentId))
    }
    // Close input box
    setIsReplying(false)
    // Clear text input
    el.value = ""

    return "Ok"
  }, [publishId, parentCommentId, commentId])

  const clearComment = useCallback(() => {
    if (!commentId) return
    const el = document.getElementById(commentId) as HTMLTextAreaElement
    if (!el) return

    el.value = ""
  }, [commentId])

  const handleLikeComment = useCallback(() => {
    if (!publishId || !commentId) return

    if (!isAuthenticated) {
      openAuthModal()
    } else {
      setOptimisticLiked(!liked)
      if (!liked && disLiked) {
        setOptimisticDisLiked(!disLiked)
      }
      setOptimisticLikesCount(
        liked ? (likesCount > 0 ? likesCount - 1 : likesCount) : likesCount + 1
      )
      startTransition(() => likePublishComment(publishId, commentId))
    }
  }, [
    isAuthenticated,
    openAuthModal,
    publishId,
    commentId,
    liked,
    likesCount,
    disLiked,
  ])

  const likeDebounce = useMemo(
    () => _.debounce(handleLikeComment, 200),
    [handleLikeComment]
  )

  const handleDisLikeComment = useCallback(() => {
    if (!publishId || !commentId) return

    if (!isAuthenticated) {
      openAuthModal()
    } else {
      setOptimisticDisLiked(!disLiked)
      if (!disLiked && liked) {
        setOptimisticLiked(!liked)
        setOptimisticLikesCount(likesCount > 0 ? likesCount - 1 : likesCount)
      }
      startTransition(() => disLikePublishComment(publishId, commentId))
    }
  }, [
    isAuthenticated,
    openAuthModal,
    publishId,
    commentId,
    disLiked,
    liked,
    likesCount,
  ])

  const disLikeDebounce = useMemo(
    () => _.debounce(handleDisLikeComment, 200),
    [handleDisLikeComment]
  )

  return (
    <div className="w-full flex items-start gap-x-4">
      <div>
        <Avatar
          profile={comment.creator}
          width={avatarSize}
          height={avatarSize}
        />
      </div>

      <div className="flex-grow">
        {/* Comment owner */}
        <div className="flex items-center gap-x-4">
          <StationName profile={comment.creator} fontSize="sm" />
          <p className="italic text-xs text-textExtraLight">
            {calculateTimeElapsed(comment.createdAt)}
          </p>
        </div>

        {/* Content */}
        <div className="mt-1 text-sm">
          {displayedContent}{" "}
          {comment?.content.length > displayedContent.length && (
            <span
              className="ml-1 font-semibold cursor-pointer"
              onClick={expandContent}
            >
              Show more
            </span>
          )}
          {content.length > initialDisplayed &&
            content.length === displayedContent.length && (
              <p
                className="mt-2 font-semibold cursor-pointer text-sm"
                onClick={shrinkContent}
              >
                Show less
              </p>
            )}
        </div>

        {/* Like/Dislike */}
        <div className="mt-2 flex items-center gap-x-8">
          <div className="w-[100px] flex items-center">
            <div className="w-[60px] flex items-center gap-x-1">
              <div
                className="cursor-pointer p-1 flex items-center justify-center rounded-full hover:bg-neutral-100"
                onClick={likeDebounce}
              >
                {optimisticLiked ? (
                  <AiFillLike size={20} />
                ) : (
                  <AiOutlineLike size={20} />
                )}
              </div>
              <p className="text-sm text-textLight">{optimisticLikesCount}</p>
            </div>
            <div className="w-[40px]">
              <div
                className="cursor-pointer p-1 flex items-center justify-center rounded-full hover:bg-neutral-100"
                onClick={disLikeDebounce}
              >
                {optimisticDisLiked ? (
                  <AiFillDislike size={20} />
                ) : (
                  <AiOutlineDislike size={20} />
                )}
              </div>
            </div>
          </div>
          {isAuthenticated && (
            <button
              className="mx-0 font-semibold text-sm hover:bg-neutral-200 px-3 h-8 rounded-full"
              onClick={toggleCommentBox}
            >
              Reply
            </button>
          )}
        </div>

        {/* Reply box */}
        {isAuthenticated && isReplying && (
          <CommentBox
            inputId={commentId}
            profile={profile}
            avatarSize={avatarSize}
            replyTo={parentComment ? `@${comment.creator?.name}` : undefined}
            onSubmit={confirmReply}
            fontSize="sm"
            clearComment={clearComment}
          />
        )}
      </div>
    </div>
  )
}
