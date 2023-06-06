import React, { useState, useCallback, useTransition } from "react"
import {
  AiOutlineDislike,
  AiFillDislike,
  AiFillLike,
  AiOutlineLike,
} from "react-icons/ai"

import Avatar from "@/components/Avatar"
import CommentBox from "./CommentBox"
import { useExpandContent } from "@/hooks/useExpandContent"
import { calculateTimeElapsed } from "@/lib/client"
import { commentOnComment } from "./actions"
import type { Comment, Maybe, Station } from "@/graphql/codegen/graphql"

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

  const [isPending, startTransition] = useTransition()

  const toggleCommentBox = useCallback(() => {
    setIsReplying((prev) => !prev)
  }, [])

  const confirmReply = useCallback(() => {
    if (!publishId || !commentId) return
    const el = document.getElementById(commentId) as HTMLTextAreaElement
    if (!el) return

    const content = el.value
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
  }, [publishId, parentCommentId, commentId])

  const clearComment = useCallback(() => {
    if (!commentId) return
    const el = document.getElementById(commentId) as HTMLTextAreaElement
    if (!el) return

    el.value = ""
  }, [commentId])

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
          <div className="flex items-center gap-x-2">
            <h6 className="text-sm">{comment.creator?.displayName || ""}</h6>
            <span className="text-thin text-xs">|</span>
            <p className="font-light text-sm text-textLight">
              @{comment.creator?.name || ""}
            </p>
          </div>
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
                className="mt-2 font-semibold cursor-pointer"
                onClick={shrinkContent}
              >
                Show less
              </p>
            )}
        </div>

        {/* Like/Dislike */}
        <div className="flex items-center gap-x-8">
          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-1">
              <div className="cursor-pointer p-1 flex items-center justify-center rounded-full hover:bg-neutral-100">
                {liked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
              </div>
              <p className="text-sm text-textLight">{likesCount}</p>
            </div>
            <div>
              <div className="cursor-pointer p-1 flex items-center justify-center rounded-full hover:bg-neutral-100">
                {disLiked ? (
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
