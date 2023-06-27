import React, { useEffect, useState, useCallback } from "react"

import CommentItem from "./CommentItem"
import ButtonLoader from "@/components/ButtonLoader"
import Mask from "@/components/Mask"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"
import { combineEdges } from "@/lib/helpers"
import type {
  Comment,
  CommentEdge,
  FetchCommentsResponse,
  Maybe,
  PageInfo,
  Station,
} from "@/graphql/codegen/graphql"
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
  const [edges, setEdges] = useState<CommentEdge[]>([])
  const subComments = edges
    .map((edge) => edge.node)
    .filter((comment) => !!comment) as Comment[]
  const [pageInfo, setPageInfo] = useState<PageInfo>()
  const [loading, setLoading] = useState(false)

  const fetchSubComments = useCallback(
    async (cursor?: string) => {
      if (!comment) return

      try {
        setLoading(true)
        const res = await fetch(`/comments/sub`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            commentId: comment.id,
            cursor,
          }),
        })
        const data = (await res.json()) as {
          result: FetchCommentsResponse
        }
        setEdges((prev) => combineEdges<CommentEdge>(prev, data?.result?.edges))
        setPageInfo(data?.result?.pageInfo)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    },
    [comment]
  )
  // Fetch sub-comments on load
  useEffect(() => {
    fetchSubComments()
  }, [])

  const fetchMoreSubComments = useCallback(() => {
    if (!pageInfo || !pageInfo.endCursor || !pageInfo.hasNextPage) return

    fetchSubComments(pageInfo.endCursor)
  }, [pageInfo])
  const { observedRef } = useInfiniteScroll(1, fetchMoreSubComments)

  return (
    <>
      <CommentItem
        isAuthenticated={isAuthenticated}
        profile={profile}
        comment={comment}
        publishId={publishId}
        reloadComments={reloadComments}
        fetchCommentsSortBy={fetchCommentsSortBy}
      />

      <div className="mt-6 pl-12 flex flex-col gap-y-5">
        {subComments.length > 0 &&
          subComments
            .sort(
              (sub1, sub2) =>
                new Date(sub2.createdAt).getTime() -
                new Date(sub1.createdAt).getTime()
            )
            .map((sub) => (
              <CommentItem
                key={sub.id}
                isAuthenticated={isAuthenticated}
                profile={profile}
                parentComment={comment}
                comment={sub}
                publishId={publishId}
                avatarSize={30}
                isSub={true}
                reloadComments={reloadComments}
                reloadSubComments={fetchSubComments}
                fetchCommentsSortBy={fetchCommentsSortBy}
              />
            ))}

        <div ref={observedRef} className="flex justify-center">
          {loading && (
            <ButtonLoader loading={loading} size={8} color="#d4d4d4" />
          )}
        </div>
      </div>

      {/* Prevent user interactions while loading */}
      {loading && <Mask />}
    </>
  )
}
