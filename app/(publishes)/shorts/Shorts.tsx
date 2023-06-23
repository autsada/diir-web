"use client"

import React, { useCallback, useState, useEffect, useTransition } from "react"
import { usePathname } from "next/navigation"
import _ from "lodash"

import ButtonLoader from "@/components/ButtonLoader"
import ShortItem from "./ShortItem"
import { useAuthContext } from "@/context/AuthContext"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"
import type {
  FetchPlaylistsResponse,
  FetchPublishesResponse,
  Maybe,
  Station,
} from "@/graphql/codegen/graphql"
import ViewModal from "./ViewModal"

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
  const fetchedShorts = fetchResult?.edges
  const [prevShorts, setPrevShorts] = useState(fetchedShorts)
  const [shorts, setShorts] = useState(fetchedShorts || [])
  if (fetchedShorts !== prevShorts) {
    setPrevShorts(fetchedShorts)
    setShorts(fetchedShorts || [])
  }

  const fetchedPageInfo = fetchResult?.pageInfo
  const [prevPageInfo, setPrevPageInfo] = useState(fetchedPageInfo)
  const [pageInfo, setPageInfo] = useState(fetchedPageInfo)
  // When page info changed
  if (fetchedPageInfo !== prevPageInfo) {
    setPrevPageInfo(fetchedPageInfo)
    setPageInfo(fetchedPageInfo)
  }

  const [loading, setLoading] = useState(false)
  const [viewModalVisible, setViewModalVisible] = useState(false)
  // The item to be shown on the view modal when user opens it
  const [initialDisplayedId, setInitialDisplayedId] = useState("")

  // Set video el style to cover
  useEffect(() => {
    const els = document?.getElementsByTagName("video")
    if (els.length > 0) {
      for (let i = 0; i < els.length; i++) {
        els[i].style.objectFit = "cover"
      }
    }
  }, [])

  const fetchMore = useCallback(async () => {
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
  const { observedRef } = useInfiniteScroll(0.5, fetchMore)

  const openViewModal = useCallback((p: string) => {
    setViewModalVisible(true)
    setInitialDisplayedId(p)
  }, [])

  const closeViewModal = useCallback(() => {
    setViewModalVisible(false)
    setInitialDisplayedId("")
    if (typeof window !== "undefined") {
      window.history.replaceState("", "", "/shorts")
    }
  }, [])

  // const handleFollow = useCallback(() => {
  //   if (!followerId) return

  //   if (!isAuthenticated) {
  //     openAuthModal()
  //   } else {
  //     setOptimisticFollowing(!isFollowing)

  //     startTransition(() => followStation(followerId))
  //     router.refresh()
  //   }
  // }, [isAuthenticated, openAuthModal, followerId, isFollowing, router])

  // const followDebounce = useMemo(
  //   () => _.debounce(handleFollow, 200),
  //   [handleFollow]
  // )

  return (
    <>
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
                  openViewModal={openViewModal}
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

      {viewModalVisible && initialDisplayedId && (
        <ViewModal
          items={shorts}
          isAuthenticated={isAuthenticated}
          profile={profile}
          playlistsResult={playlistsResult}
          closeModal={closeViewModal}
          activeId={initialDisplayedId}
          fetchMoreShorts={fetchMore}
        />
      )}
    </>
  )
}
