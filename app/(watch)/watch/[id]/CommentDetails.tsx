import React, { useTransition, useCallback, useState } from "react"

import CommentItem from "./CommentItem"
import ButtonLoader from "@/components/ButtonLoader"
import CommentBox from "./CommentBox"
import { useAuthContext } from "@/context/AuthContext"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"
import { commentOnPublish } from "./actions"
import type {
  FetchCommentsResponse,
  Maybe,
  Station,
} from "@/graphql/codegen/graphql"

interface Props {
  isAuthenticated: boolean
  profile: Maybe<Station> | undefined
  publishId: string
  commentsResult: Maybe<FetchCommentsResponse> | undefined
}

export default function CommentDetails({
  isAuthenticated,
  profile,
  publishId,
  commentsResult,
}: Props) {
  const [commentsLoading, setCommentsLoading] = useState(false)
  const [pageInfo, setPageInfo] = useState(commentsResult?.pageInfo)
  const [edges, setEdges] = useState(commentsResult?.edges || [])

  // If comments result is updated
  if (commentsResult?.edges !== edges) {
    setEdges(commentsResult?.edges || [])
    setPageInfo(commentsResult?.pageInfo)
  }

  const { onVisible } = useAuthContext()
  const [isPending, startTransition] = useTransition()

  const confirmComment = useCallback(() => {
    if (!publishId) return
    const el = document.getElementById(publishId) as HTMLTextAreaElement
    if (!el) return

    const content = el.value
    startTransition(() => commentOnPublish(content, publishId))
    el.value = ""
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
        body: JSON.stringify({ cursor: pageInfo?.endCursor, publishId }),
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
  }, [pageInfo?.endCursor, pageInfo?.hasNextPage, publishId])
  const { observedRef } = useInfiniteScroll(0.5, fetchMoreComments)

  return (
    <div className="h-full px-4 sm:px-0 overflow-y-auto sm:overflow-y-hidden">
      {isAuthenticated ? (
        <CommentBox
          inputId={publishId}
          profile={profile}
          onSubmit={confirmComment}
          clearComment={clearComment}
        />
      ) : (
        <button
          className="px-4 font-semibold text-blueBase"
          onClick={onVisible}
        >
          Sign in to comment
        </button>
      )}

      <div className="w-full mt-6 pb-20 sm:pb-10">
        {edges &&
          edges.length > 0 &&
          edges.map((edge) => (
            <CommentItem
              isAuthenticated={isAuthenticated}
              key={edge.node?.id}
              profile={profile}
              publishId={publishId}
              comment={edge.node}
            />
          ))}

        <div
          ref={observedRef}
          className="w-full h-4 flex items-center justify-center"
        >
          {commentsLoading && (
            <ButtonLoader loading={commentsLoading} size={8} color="#d4d4d4" />
          )}
        </div>
      </div>
    </div>
  )
}
