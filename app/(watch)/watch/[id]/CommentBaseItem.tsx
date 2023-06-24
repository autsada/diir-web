import React from "react"

import CommentItem from "./CommentItem"
import type { Comment, Maybe, Station } from "@/graphql/codegen/graphql"
import type { CommentsOrderBy } from "@/graphql/types"

interface Props {
  isAuthenticated: boolean
  profile: Maybe<Station> | undefined
  publishId: string
  comment: Maybe<Comment> | undefined
  openSubComments: (c: Comment) => void
  reloadComments?: (
    publishId: string,
    orderBy?: CommentsOrderBy
  ) => Promise<void>
  fetchCommentsSortBy?: CommentsOrderBy
}

export default function CommentBaseItem({
  isAuthenticated,
  profile,
  publishId,
  comment,
  openSubComments,
  reloadComments,
  fetchCommentsSortBy,
}: Props) {
  if (!comment) return null

  return (
    <div className="mb-6">
      <CommentItem
        isAuthenticated={isAuthenticated}
        profile={profile}
        comment={comment}
        publishId={publishId}
        reloadComments={reloadComments}
        fetchCommentsSortBy={fetchCommentsSortBy}
      />

      {/* Comments */}
      {comment.commentsCount > 0 && (
        <div className="mt-2 pl-[40px]">
          <div
            className="w-max py-2 px-4 rounded-full flex items-center gap-x-1 font-semibold text-blueBase text-sm cursor-pointer hover:bg-neutral-100"
            onClick={openSubComments.bind(undefined, comment)}
          >
            <p>{comment.commentsCount}</p>
            <p>repl{comment.commentsCount === 1 ? "y" : "ies"}</p>
          </div>
        </div>
      )}
    </div>
  )
}
