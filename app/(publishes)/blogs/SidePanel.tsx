import React, { useState } from "react"

import SidePanelItem from "./SidePanelItem"
import type {
  Maybe,
  FetchPublishesResponse,
  Publish,
} from "@/graphql/codegen/graphql"

interface Props {
  fetchResult: Maybe<FetchPublishesResponse> | undefined
  bookmark: (publishId: string, callback: () => void) => void
  onShareBlog: (blog: Publish) => Promise<void>
  openReportModal: (blog: Publish) => void
}

/**
 * For large device view only
 */
export default function SidePanel({
  fetchResult,
  bookmark,
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

  return (
    <div className="mt-5 w-full flex flex-col items-center gap-y-1 divide-y-2 divide-neutral-100 sm:pb-10">
      {edges.length > 0 &&
        edges.map((edge) =>
          !edge.node ? null : (
            <SidePanelItem
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
