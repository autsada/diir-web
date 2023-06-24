import React from "react"

import CommentItem from "./CommentItem"
import type { Comment, Maybe, Station } from "@/graphql/codegen/graphql"
import type { CommentsOrderBy } from "@/graphql/types"

interface Props {
  publishId: string
  comment: Comment
  isAuthenticated: boolean
  profile: Maybe<Station> | undefined
  reloadComments?: (
    publishId: string,
    orderBy?: CommentsOrderBy
  ) => Promise<void>
  fetchCommentsSortBy?: CommentsOrderBy
}

export default function SubComments({
  publishId,
  comment,
  isAuthenticated,
  profile,
  reloadComments,
  fetchCommentsSortBy,
}: Props) {
  return (
    <div className="">
      <CommentItem
        isAuthenticated={isAuthenticated}
        profile={profile}
        comment={comment}
        publishId={publishId}
        reloadComments={reloadComments}
        fetchCommentsSortBy={fetchCommentsSortBy}
      />

      <div className="mt-6 pl-12">
        {comment.comments &&
          comment.comments.length > 0 &&
          comment.comments?.map((comt) => (
            <div key={comt.id} className="mb-4">
              <CommentItem
                isAuthenticated={isAuthenticated}
                profile={profile}
                parentComment={comment}
                comment={comt}
                publishId={publishId}
                avatarSize={30}
                isSub={true}
                reloadComments={reloadComments}
                fetchCommentsSortBy={fetchCommentsSortBy}
              />
            </div>
          ))}
      </div>
    </div>
  )
}
