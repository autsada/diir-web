import React, { useState, useCallback, useTransition } from "react"

import BlogItem from "./BlogItem"
import { useAuthContext } from "@/context/AuthContext"
import { bookmarkPost } from "./actions"
import type {
  Maybe,
  FetchPublishesResponse,
  Publish,
} from "@/graphql/codegen/graphql"

interface Props {
  isAuthenticated: boolean
  fetchResult: Maybe<FetchPublishesResponse> | undefined
  onShareBlog: (blog: Publish) => Promise<void>
  openReportModal: (blog: Publish) => void
}

export default function ForYouFeed({
  isAuthenticated,
  fetchResult,
  onShareBlog,
  openReportModal,
}: Props) {
  const [prevEdges, setPrevEdges] = useState(fetchResult?.edges)
  const [edges, setEdges] = useState(fetchResult?.edges || [])
  const [prevPageInfo, setPrevPageInfo] = useState(fetchResult?.pageInfo)
  const [pageInfo, setPageInfo] = useState(fetchResult?.pageInfo)
  if (fetchResult?.edges !== prevEdges) {
    setPrevEdges(fetchResult?.edges)
    setEdges(fetchResult?.edges || [])
  }
  if (fetchResult?.pageInfo !== prevPageInfo) {
    setPrevPageInfo(fetchResult?.pageInfo)
    setPageInfo(fetchResult?.pageInfo)
  }

  const [isPending, startTransition] = useTransition()
  const { onVisible: openAuthModal } = useAuthContext()

  const bookmark = useCallback(
    (publishId: string, callback: () => void) => {
      if (!isAuthenticated) {
        openAuthModal("Sign in to bookmark the blog.")
      } else {
        startTransition(() => bookmarkPost(publishId))
        if (callback) callback()
      }
    },
    [isAuthenticated, openAuthModal]
  )

  return (
    <div className="mt-5 w-full flex flex-col items-center gap-y-1 divide-y-2 divide-neutral-100 sm:pb-10">
      {edges.length > 0 &&
        edges.map((edge) =>
          !edge.node ? null : (
            <BlogItem
              key={edge.node?.id}
              publish={edge.node}
              bookmarkHandler={bookmark}
              onShare={onShareBlog}
              onReport={openReportModal}
            />
          )
        )}
    </div>
  )
}
