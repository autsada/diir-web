import React, { useTransition, useCallback, useState } from "react"

import CommentBaseItem from "./CommentBaseItem"
import ButtonLoader from "@/components/ButtonLoader"
import CommentBox from "./CommentBox"
import SubComments from "./SubComments"
import { useAuthContext } from "@/context/AuthContext"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"
import { commentOnPublish } from "./actions"
import type {
  FetchCommentsResponse,
  Maybe,
  Station,
  Comment,
} from "@/graphql/codegen/graphql"
import type { OrderBy } from "@/graphql/types"

interface Props {
  isAuthenticated: boolean
  profile: Maybe<Station> | undefined
  publishId: string
  commentsResult: Maybe<FetchCommentsResponse> | undefined
  subCommentsVisible: boolean
  openSubComments: (c: Comment) => void
  activeComment: Comment | undefined
  fetchCommentsSortBy?: OrderBy
}

export default function CommentDetails({
  isAuthenticated,
  profile,
  publishId,
  commentsResult,
  subCommentsVisible,
  openSubComments,
  activeComment,
  fetchCommentsSortBy,
}: Props) {
  const [commentsLoading, setCommentsLoading] = useState(false)
  const [prevCommentsResult, setPrevCommentResult] = useState(commentsResult)
  const [pageInfo, setPageInfo] = useState(commentsResult?.pageInfo)
  const [edges, setEdges] = useState(commentsResult?.edges || [])

  // If comments result is updated
  if (prevCommentsResult !== commentsResult) {
    setPrevCommentResult(commentsResult)
    if (commentsResult?.edges && commentsResult?.edges.length > 0) {
      setEdges(commentsResult?.edges)
      setPageInfo(commentsResult?.pageInfo)
    }
  }

  const { onVisible } = useAuthContext()
  const [isPending, startTransition] = useTransition()

  const confirmComment = useCallback(() => {
    if (!publishId) return null
    const el = document.getElementById(publishId) as HTMLTextAreaElement
    if (!el) return null

    const content = el.value
    if (!content) return null

    startTransition(() => commentOnPublish(content, publishId))
    el.value = ""

    return "Ok"
  }, [publishId])

  const clearComment = useCallback(() => {
    if (!publishId) return
    const el = document.getElementById(publishId) as HTMLTextAreaElement
    if (!el) return

    el.value = ""
  }, [publishId])

  const fetchMoreComments = useCallback(async () => {
    if (!publishId || !pageInfo?.endCursor || !pageInfo?.hasNextPage) return

    try {
      setCommentsLoading(true)
      const res = await fetch(`/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cursor: pageInfo?.endCursor,
          publishId,
          sortBy: fetchCommentsSortBy,
        }),
      })
      const data = (await res.json()) as {
        result: FetchCommentsResponse
      }
      setEdges((prev) => [...prev, ...data.result.edges])
      setPageInfo(data?.result?.pageInfo)
      setCommentsLoading(false)
    } catch (error) {
      setCommentsLoading(false)
    }
  }, [
    pageInfo?.endCursor,
    pageInfo?.hasNextPage,
    publishId,
    fetchCommentsSortBy,
  ])
  const { observedRef } = useInfiniteScroll(0.5, fetchMoreComments)

  return (
    <div className="h-full px-4 sm:px-0 overflow-y-auto sm:overflow-y-hidden">
      {subCommentsVisible && activeComment ? (
        <div className="w-full mt-6 pb-20 sm:pb-10">
          <SubComments
            publishId={publishId}
            comment={activeComment}
            isAuthenticated={isAuthenticated}
            profile={profile}
          />
        </div>
      ) : (
        <>
          {isAuthenticated ? (
            <CommentBox
              inputId={publishId}
              profile={profile}
              onSubmit={confirmComment}
              clearComment={clearComment}
            />
          ) : (
            <button className="mt-2 px-4 font-semibold" onClick={onVisible}>
              Sign in to comment
            </button>
          )}

          <div className="w-full mt-6 pb-20 sm:pb-10">
            {edges &&
              edges.length > 0 &&
              edges.map((edge) => (
                <CommentBaseItem
                  isAuthenticated={isAuthenticated}
                  key={edge.node?.id}
                  profile={profile}
                  publishId={publishId}
                  comment={edge.node}
                  openSubComments={openSubComments}
                />
              ))}

            <div
              ref={observedRef}
              className="w-full h-4 flex items-center justify-center"
            >
              {commentsLoading && (
                <ButtonLoader
                  loading={commentsLoading}
                  size={8}
                  color="#d4d4d4"
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
