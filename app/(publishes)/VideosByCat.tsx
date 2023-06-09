import React, { useEffect, useState, useCallback } from "react"

import Mask from "@/components/Mask"
import PublishItem from "./PublishItem"
import ButtonLoader from "@/components/ButtonLoader"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"
import type { FetchPublishesResponse, Publish } from "@/graphql/codegen/graphql"
import type { PublishCategory } from "@/graphql/types"

interface Props {
  tab: PublishCategory | "All"
  selectedTab: PublishCategory | "All"
  fetchResult?: FetchPublishesResponse
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  onOpenActions: (p: Publish) => void
  setPOS: (posX: number, posY: number, screenHeight: number) => void
}

export default function VideosByCat({
  tab,
  selectedTab,
  fetchResult,
  loading,
  setLoading,
  onOpenActions,
  setPOS,
}: Props) {
  const [prevVideos, setPrevVideos] = useState(fetchResult?.edges)
  const [videos, setVideos] = useState(fetchResult?.edges || [])
  const [prevPageInfo, setPrevPageInfo] = useState(fetchResult?.pageInfo)
  const [pageInfo, setPageInfo] = useState(fetchResult?.pageInfo)
  // When props fetch result changed
  if (fetchResult) {
    if (fetchResult.edges !== prevVideos) {
      setPrevVideos(fetchResult?.edges)
      setVideos(fetchResult?.edges || [])
    }
    if (fetchResult.pageInfo !== prevPageInfo) {
      setPrevPageInfo(fetchResult.pageInfo)
      setPageInfo(fetchResult.pageInfo)
    }
  }

  // Fetch videos on first mount
  useEffect(() => {
    if (!tab || tab === "All") return
    async function fetchVideos() {
      try {
        setLoading(true)
        const res = await fetch(`/videos/query`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: tab,
          }),
        })
        const data = (await res.json()) as {
          result: FetchPublishesResponse
        }
        setVideos(data.result.edges || [])
        setPageInfo(data?.result?.pageInfo)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    fetchVideos()
  }, [tab, setLoading])

  const fetchMoreVideos = useCallback(async () => {
    if (!tab || !pageInfo || !pageInfo.endCursor || !pageInfo.hasNextPage)
      return

    try {
      setLoading(true)
      const res = await fetch(`/videos/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: tab,
          cursor: pageInfo.endCursor,
        }),
      })
      const data = (await res.json()) as {
        result: FetchPublishesResponse
      }
      setVideos((prev) => [...prev, ...data.result.edges])
      setPageInfo(data?.result?.pageInfo)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }, [tab, pageInfo, setLoading])
  const { observedRef } = useInfiniteScroll(0.5, fetchMoreVideos)

  return (
    <>
      <div
        className={`${
          tab !== selectedTab ? "hidden" : "block"
        } mt-[40px] py-2 sm:px-4 sm:ml-[100px]`}
      >
        {!loading && videos.length === 0 ? (
          <div className="w-full py-10 text-center">
            <h6>No videos found</h6>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 sm:gap-y-6 sm:gap-x-4 py-1 pb-20 sm:p-5 bg-white divide-y-[4px] sm:divide-y-0 divide-neutral-200">
            {videos.map((edge, i) => (
              <PublishItem
                key={`${edge?.node?.id}-${tab}-${i}`}
                publish={edge?.node}
                onOpenActions={onOpenActions}
                setPOS={setPOS}
              />
            ))}
          </div>
        )}

        <div
          ref={observedRef}
          className="w-full h-4 flex items-center justify-center"
        >
          {loading && (
            <ButtonLoader loading={loading} size={8} color="#d4d4d4" />
          )}
        </div>
      </div>

      {tab === selectedTab && loading && (
        <Mask backgroundColor="#fff" opacity={0.3} />
      )}
    </>
  )
}