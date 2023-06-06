import React from "react"

import CommentItem from "./CommentItem"
import type { Comment, Maybe, Station } from "@/graphql/codegen/graphql"

interface Props {
  publishId: string
  comment: Comment
  isAuthenticated: boolean
  profile: Maybe<Station> | undefined
}

export default function SubComments({
  publishId,
  comment,
  isAuthenticated,
  profile,
}: Props) {
  return (
    <div className="">
      <CommentItem
        isAuthenticated={isAuthenticated}
        profile={profile}
        comment={comment}
        publishId={publishId}
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
              />
            </div>
          ))}
      </div>
    </div>
  )
}
