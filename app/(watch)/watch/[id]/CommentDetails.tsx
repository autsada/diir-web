import React, { useTransition, useCallback, useState, useRef } from "react"

import Avatar from "@/components/Avatar"
import { commentOnPublish } from "./actions"
import type {
  FetchCommentsResponse,
  Maybe,
  Station,
} from "@/graphql/codegen/graphql"
import CommentItem from "./CommentItem"

interface Props {
  profile: Maybe<Station> | undefined
  commentsCount: number
  publishId: string
  commentsResult: Maybe<FetchCommentsResponse> | undefined
}

export default function CommentDetails({
  profile,
  commentsCount,
  publishId,
  commentsResult,
}: Props) {
  const pageInfo = commentsResult?.pageInfo
  const edges = commentsResult?.edges

  const [isStartComment, setIsStartComment] = useState(false)

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
      </div>
    </div>
  )
}
