"use client"

import React, { useState, useCallback, useTransition } from "react"

import FeedTabs from "./FeedTabs"
import BlogItem from "./BlogItem"
import { bookmarkPost } from "./actions"
import type { FeedType } from "./FeedTabs"
import type { Maybe, FetchPublishesResponse } from "@/graphql/codegen/graphql"

interface Props {
  isAuthenticated: boolean
  fetchResult: Maybe<FetchPublishesResponse> | undefined
}

export default function Blogs({ isAuthenticated, fetchResult }: Props) {
  const [feedTab, setFeedTab] = useState<FeedType>("For you")
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

  const [loading, setLoading] = useState(false)

  const [isPending, startTransition] = useTransition()

  const selectTab = useCallback((f: FeedType) => {
    setFeedTab(f)
  }, [])

  const bookmark = useCallback((publishId: string, callback: () => void) => {
    startTransition(() => bookmarkPost(publishId))
    if (callback) callback()
  }, [])

  return (
    <div className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] max-w-[700px] mx-auto">
      <FeedTabs
        selectedTab={feedTab}
        onSelectTab={selectTab}
        loading={loading}
      />
      <div className="mt-5 w-full flex flex-col items-center gap-y-1 divide-y-2 divide-neutral-100 sm:pb-10">
        {edges.length > 0 &&
          edges.map((edge) =>
            !edge.node ? null : (
              <BlogItem
                key={edge.node?.id}
                isAuthenticated={isAuthenticated}
                publish={edge.node}
                bookmarkHandler={bookmark}
              />
            )
          )}
      </div>
    </div>
  )
}
