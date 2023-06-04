import React, { useTransition, useCallback } from "react"

import Avatar from "@/components/Avatar"
import { commentOnPublish } from "./actions"
import type { Maybe, Station } from "@/graphql/codegen/graphql"

interface Props {
  profile: Maybe<Station> | undefined
  commentsCount: number
  publishId: string
}

export default function CommentDetails({
  profile,
  commentsCount,
  publishId,
}: Props) {
  const [isPending, startTransition] = useTransition()

  const clearComments = useCallback(() => {
    const el = document.getElementById("content") as HTMLTextAreaElement
    if (el) {
      el.value = ""
    }
  }, [])

  const onComment = useCallback(() => {
    if (!publishId) return
    const el = document.getElementById("content") as HTMLTextAreaElement
    if (!el) return

    const content = el.value
    startTransition(() => commentOnPublish(content, publishId))
    el.value = ""
  }, [publishId])

  return (
    <div className="px-4">
      <p>{commentsCount} Comments</p>
      <form className="w-full" onSubmit={onComment}>
        <div className="mt-5 w-full flex gap-x-2">
          <Avatar profile={profile} />
          <textarea
            id="content"
            name="content"
            placeholder="Add a comment"
            rows={2}
            className="flex-grow border border-neutral-200 rounded-md px-4 py-1 text-textDark"
          />
          {/* <input type="hidden" name="publishId" defaultValue={publishId} /> */}
        </div>
        <div className="mt-2 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="btn-cancel mx-0 px-4 rounded-full h-8"
            onClick={clearComments}
          >
            Cancel
          </button>
          <button type="submit" className="btn-dark mx-0 px-4 rounded-full h-8">
            Confirm
          </button>
        </div>
      </form>

      <div className="w-full mt-5 bg-red-200">Comments</div>
    </div>
  )
}
