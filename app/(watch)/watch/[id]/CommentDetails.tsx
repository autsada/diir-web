import React, { useTransition, useCallback, useState, useRef } from "react"

import Avatar from "@/components/Avatar"
import CommentItem from "./CommentItem"
import ButtonLoader from "@/components/ButtonLoader"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"
import { commentOnPublish } from "./actions"
import type {
  FetchCommentsResponse,
  Maybe,
  Station,
} from "@/graphql/codegen/graphql"

interface Props {
  profile: Maybe<Station> | undefined
  publishId: string
  commentsResult: Maybe<FetchCommentsResponse> | undefined
}

export default function CommentDetails({
  profile,
  publishId,
  commentsResult,
}: Props) {
  const [isStartComment, setIsStartComment] = useState(false)
  const [commentsLoading, setCommentsLoading] = useState(false)
  const [pageInfo, setPageInfo] = useState(commentsResult?.pageInfo)
  const [edges, setEdges] = useState(commentsResult?.edges || [])

  const [isPending, startTransition] = useTransition()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const startComment = useCallback(() => {
    setIsStartComment(true)
  }, [])

  const endComment = useCallback(() => {
    const el = document.getElementById("content") as HTMLTextAreaElement
    if (el) {
      el.value = ""
    }
    setIsStartComment(false)
  }, [])

  const confirmComment = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!publishId) return
      const el = document.getElementById("content") as HTMLTextAreaElement
      if (!el) return

      const content = el.value
      startTransition(() => commentOnPublish(content, publishId))
      el.value = ""
      setIsStartComment(false)
    },
    [publishId]
  )

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
    <div className="h-full px-4 overflow-y-auto sm:overflow-y-hidden">
      <form className="w-full" onSubmit={confirmComment}>
        <div className="mt-5 w-full flex gap-x-2">
          <Avatar profile={profile} />
          <textarea
            ref={textareaRef}
            id="content"
            name="content"
            placeholder="Add a comment..."
            rows={isStartComment ? 2 : 1}
            className="flex-grow border border-neutral-200 rounded-md px-4 py-1 text-textDark"
            onClick={startComment}
          />
        </div>
        {isStartComment && (
          <div className="mt-2 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="btn-cancel mx-0 px-4 rounded-full h-8"
              onClick={endComment}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-dark mx-0 px-4 rounded-full h-8"
            >
              Confirm
            </button>
          </div>
        )}
      </form>

      <div className="w-full mt-6 pb-20 sm:pb-10">
        {edges &&
          edges.length > 0 &&
          edges.map((edge) => (
            <CommentItem key={edge.node?.id} comment={edge.node} />
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
