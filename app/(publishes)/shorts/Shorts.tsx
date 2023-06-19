"use client"

import React, { useCallback, useState, useEffect } from "react"

import ButtonLoader from "@/components/ButtonLoader"
import ShortItem from "./ShortItem"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"
import type {
  FetchPlaylistsResponse,
  FetchPublishesResponse,
  Maybe,
  Station,
} from "@/graphql/codegen/graphql"

interface Props {
  isAuthenticated: boolean
  profile: Maybe<Station> | undefined
  fetchResult: Maybe<FetchPublishesResponse> | undefined
  playlistsResult: Maybe<FetchPlaylistsResponse> | undefined
}

export default function Shorts({
  isAuthenticated,
  profile,
  fetchResult,
  playlistsResult,
}: Props) {
  const [prevShorts, setPrevShorts] = useState(fetchResult?.edges)
  const [shorts, setShorts] = useState(fetchResult?.edges || [])
  const [prevPageInfo, setPrevPageInfo] = useState(fetchResult?.pageInfo)
  const [pageInfo, setPageInfo] = useState(fetchResult?.pageInfo)
  // When props fetch result changed
  if (fetchResult) {
    if (fetchResult.edges !== prevShorts) {
      setPrevShorts(fetchResult?.edges)
      setShorts(fetchResult?.edges || [])
    }
    if (fetchResult.pageInfo !== prevPageInfo) {
      setPrevPageInfo(fetchResult.pageInfo)
      setPageInfo(fetchResult.pageInfo)
    }
  }

  const [loading, setLoading] = useState(false)

  // Set video el style to cover
  useEffect(() => {
    const els = document?.getElementsByTagName("video")
    if (els.length > 0) {
      for (let i = 0; i < els.length; i++) {
        els[i].style.objectFit = "cover"
      }
    }
  }, [])

  const fetchMoreVideos = useCallback(async () => {
    if (!pageInfo || !pageInfo.endCursor || !pageInfo.hasNextPage) return

    try {
      setLoading(true)
      const res = await fetch(`/shorts/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cursor: pageInfo.endCursor,
        }),
      })
      const data = (await res.json()) as {
        result: FetchPublishesResponse
      }
      setShorts((prev) => [...prev, ...data.result.edges])
      setPageInfo(data?.result?.pageInfo)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }, [pageInfo, setLoading])
  const { observedRef } = useInfiniteScroll(0.5, fetchMoreVideos)

  return (
    <div className="mt-4">
      {!loading && shorts.length === 0 ? (
        <div className="w-full text-center">
          <h6>No videos found</h6>
        </div>
      ) : (
        //
        <div className="pb-20 flex flex-col items-center gap-y-4 sm:gap-y-5 md:gap-y-6 lg:gap-y-7 xl:gap-y-8">
          {shorts.map((edge) =>
            !edge.node ? null : (
              <ShortItem
                key={edge.node.id}
                publish={edge?.node}
                isAuthenticated={isAuthenticated}
                profile={profile}
                playlistsResult={playlistsResult}
              />
            )
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
      )}
    </div>
  )
}
