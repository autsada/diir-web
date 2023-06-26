import React, { useTransition, useCallback, useState } from "react"

import CommentBaseItem from "./CommentBaseItem"
import ButtonLoader from "@/components/ButtonLoader"
import CommentBox from "./CommentBox"
import SubComments from "./SubComments"
import Mask from "@/components/Mask"
import { useAuthContext } from "@/context/AuthContext"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"
import { wait } from "@/lib/helpers"
import { commentOnPublish } from "./actions"
import type {
  FetchCommentsResponse,
  Maybe,
  Station,
  Comment,
  PageInfo,
  CommentEdge,
} from "@/graphql/codegen/graphql"
import type { CommentsOrderBy } from "@/graphql/types"

interface Props {
  isAuthenticated: boolean
  profile: Maybe<Station> | undefined
  publishId: string
  pageInfo: PageInfo | undefined
  setPageInfo: React.Dispatch<React.SetStateAction<PageInfo | undefined>>
  edges: CommentEdge[]
  setEdges: React.Dispatch<React.SetStateAction<CommentEdge[]>>
  subCommentsVisible: boolean
  openSubComments: (c: Comment) => void
  activeComment: Comment | undefined
  fetchCommentsSortBy?: CommentsOrderBy
  reloadComments?: (
    publishId: string,
    orderBy?: CommentsOrderBy
  ) => Promise<void>
}

export default function CommentDetails({
  isAuthenticated,
  profile,
  publishId,
  pageInfo,
  setPageInfo,
  edges,
  setEdges,
  subCommentsVisible,
  openSubComments,
  activeComment,
  fetchCommentsSortBy,
  reloadComments,
}: Props) {
  const [commentsLoading, setCommentsLoading] = useState(false)

  const { onVisible: openAuthModal } = useAuthContext()
  const [isPending, startTransition] = useTransition()

  const confirmComment = useCallback(async () => {
    if (!publishId) return null
    const el = document.getElementById(
      `${publishId}-comment-box`
    ) as HTMLTextAreaElement
    if (!el) return null

    const content = el.value
    if (!content) return null

    startTransition(() => commentOnPublish(content, publishId))
    el.value = ""

    // Reload comments
    // Wait 1000 ms before loading
    if (reloadComments) {
      await wait(1000)
      reloadComments(publishId, fetchCommentsSortBy)
    }

    return "Ok"
  }, [publishId, reloadComments, fetchCommentsSortBy])

  const clearComment = useCallback(() => {
    if (!publishId) return
    const el = document.getElementById(
      `${publishId}-comment-box`
    ) as HTMLTextAreaElement
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
    setEdges,
    setPageInfo,
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
            reloadComments={reloadComments}
            fetchCommentsSortBy={fetchCommentsSortBy}
          />
        </div>
      ) : (
        <>
          {isAuthenticated ? (
            <CommentBox
              inputId={`${publishId}-comment-box`}
              profile={profile}
              onSubmit={confirmComment}
              clearComment={clearComment}
            />
          ) : (
            <button
              className="mt-2 px-4 font-semibold"
              onClick={openAuthModal.bind(
                undefined,
                "Sign in to leave comments."
              )}
            >
              Sign in to comment
            </button>
          )}

          <div className="w-full mt-6 pb-20 sm:pb-10">
            {edges &&
              edges.length > 0 &&
              // This is to make sure that we display the comments that belong to the correct publish
              edges.every((edge) => edge?.node?.publishId === publishId) &&
              edges.map((edge) => (
                <CommentBaseItem
                  isAuthenticated={isAuthenticated}
                  key={edge.node?.id}
                  profile={profile}
                  publishId={publishId}
                  comment={edge.node}
                  openSubComments={openSubComments}
                  reloadComments={reloadComments}
                  fetchCommentsSortBy={fetchCommentsSortBy}
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

      {/* Prevent user interactions while loading */}
      {isPending && <Mask />}
    </div>
  )
}
