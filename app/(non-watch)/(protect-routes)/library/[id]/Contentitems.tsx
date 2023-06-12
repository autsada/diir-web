"use client"

import React, { useCallback, useState } from "react"

import PlaylistActionModal from "./PlaylistActionModal"
import ItemsHeader from "../VL/ItemsHeader"
import ContentItem from "../VL/ContentItem"
import AddToPlaylistsModal from "@/app/(watch)/watch/[id]/AddToPlaylistsModal"
import ShareModal from "@/app/(publishes)/ShareModal"
import ButtonLoader from "@/components/ButtonLoader"
import { useAuthContext } from "@/context/AuthContext"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"
import type {
  CheckPublishPlaylistsResponse,
  FetchPlaylistItemsResponse,
  FetchPlaylistsResponse,
  Maybe,
  Publish,
  Station,
} from "@/graphql/codegen/graphql"
import type { PlaylistOrderBy } from "@/graphql/types"

interface Props {
  isAuthenticated: boolean
  profile: Station | undefined
  playlistId: string
  playlistName: string
  itemsResult: FetchPlaylistItemsResponse
  playlistsResult: Maybe<FetchPlaylistsResponse> | undefined
}

export default function ContentItems({
  isAuthenticated,
  profile,
  playlistId,
  playlistName,
  itemsResult,
  playlistsResult,
}: Props) {
  const [prevItems, setPrevItems] = useState(itemsResult?.edges)
  const [items, setItems] = useState(itemsResult?.edges || [])
  const [prevPageInfo, setPrevPageInfo] = useState(itemsResult?.pageInfo)
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState<PlaylistOrderBy>("newest")
  const [pageInfo, setPageInfo] = useState(itemsResult?.pageInfo)
  // When props fetch result changed
  if (itemsResult) {
    if (itemsResult.edges !== prevItems) {
      setPrevItems(itemsResult?.edges)
      setItems(itemsResult?.edges || [])
    }
    if (itemsResult.pageInfo !== prevPageInfo) {
      setPrevPageInfo(itemsResult.pageInfo)
      setPageInfo(itemsResult.pageInfo)
    }
  }

  const [targetPublish, setTargetPublish] = useState<Publish>()
  const [actionsModalVisible, setActionsModalVisible] = useState(false)
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)

  const [addToPlaylistsModalVisible, setAddToPlaylistsModalVisible] =
    useState(false)

  const [prevPlaylists, setPrevPlaylists] = useState(playlistsResult?.edges)
  const [playlists, setPlaylists] = useState(playlistsResult?.edges || [])
  // When playlists result changed
  if (playlistsResult?.edges !== prevPlaylists) {
    setPrevPlaylists(playlistsResult?.edges)
    setPlaylists(playlistsResult?.edges || [])
  }

  const [prevPlaylistsPageInfo, setPrevPlaylistsPageInfo] = useState(
    playlistsResult?.pageInfo
  )
  const [playlistsPageInfo, setPlaylistsPageInfo] = useState(
    playlistsResult?.pageInfo
  )
  // When playlists page info changed
  if (playlistsResult?.pageInfo !== prevPlaylistsPageInfo) {
    setPrevPlaylistsPageInfo(playlistsResult?.pageInfo)
    setPlaylistsPageInfo(playlistsResult?.pageInfo)
  }

  const [publishPlaylistsData, setPublishPlaylistsData] =
    useState<CheckPublishPlaylistsResponse>()
  const [loadingPublishPlaylistsData, setLoadingPublishPlaylistsData] =
    useState(false)

  const [shareModalVisible, setShareModalVisible] = useState(false)

  const { onVisible: openAuthModal } = useAuthContext()

  const onOpenActions = useCallback((p: Publish) => {
    setTargetPublish(p)
    setActionsModalVisible(true)
  }, [])

  const oncloseActions = useCallback(() => {
    setTargetPublish(undefined)
    setActionsModalVisible(false)
  }, [])

  const setPOS = useCallback(
    (posX: number, posY: number, screenHeight: number) => {
      setPositionX(posX)
      setPositionY(posY)
      setScreenHeight(screenHeight)
    },
    []
  )

  const openAddToPlaylistsModal = useCallback(() => {
    if (!isAuthenticated) {
      openAuthModal()
    } else {
      setAddToPlaylistsModalVisible(true)
      setActionsModalVisible(false)
    }
  }, [isAuthenticated, openAuthModal])

  const closeAddToPlaylistsModal = useCallback(() => {
    setAddToPlaylistsModalVisible(false)
    setTargetPublish(undefined)
  }, [])

  const openShareModal = useCallback(() => {
    setShareModalVisible(true)
    setActionsModalVisible(false)
  }, [])

  const closeShareModal = useCallback(() => {
    setShareModalVisible(false)
    setTargetPublish(undefined)
  }, [])

  const fetchMoreItems = useCallback(async () => {
    if (
      !playlistId ||
      !pageInfo ||
      !pageInfo.endCursor ||
      !pageInfo.hasNextPage
    )
      return

    try {
      setLoading(true)
      const res = await fetch(`/library/playlists/${playlistId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cursor: pageInfo.endCursor,
          sortBy,
        }),
      })
      const data = (await res.json()) as {
        result: FetchPlaylistItemsResponse
      }
      setItems((prev) => [...prev, ...data.result.edges])
      setPageInfo(data?.result?.pageInfo)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }, [pageInfo, setLoading, sortBy, playlistId])
  const { observedRef } = useInfiniteScroll(0.5, fetchMoreItems)

  if (items.length === 0) return null

  return (
    <>
      <div className="px-2 grid grid-cols-1 gap-y-3 sm:gap-y-4">
        <ItemsHeader sortBy={sortBy} onSelectSortBy={() => {}} />

        {items.map((edge, i) =>
          !edge.node?.publish ? null : (
            <ContentItem
              key={`${edge.node?.id}-${i}`}
              publish={edge.node?.publish}
              setPOS={setPOS}
              onOpenActions={onOpenActions}
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

      {/* Actions modal */}
      {actionsModalVisible && (
        <PlaylistActionModal
          isAuthenticated={isAuthenticated}
          profile={profile}
          publish={targetPublish}
          playlistId={playlistId}
          playlistName={playlistName}
          closeModal={oncloseActions}
          top={screenHeight - positionY < 230 ? positionY - 230 : positionY} // 230 is modal height
          left={positionX - 300} // 300 is modal width
          openAddToPlaylistsModal={openAddToPlaylistsModal}
          loadingPublishPlaylistsData={loadingPublishPlaylistsData}
          setLoadingPublishPlaylistsData={setLoadingPublishPlaylistsData}
          setPublishPlaylistsData={setPublishPlaylistsData}
          openShareModal={openShareModal}
          setItems={setItems}
        />
      )}

      {/* Add to playlists modal */}
      {addToPlaylistsModalVisible && targetPublish && publishPlaylistsData && (
        <AddToPlaylistsModal
          closeModal={closeAddToPlaylistsModal}
          publishId={targetPublish.id}
          playlists={playlists}
          setPlaylists={setPlaylists}
          playlistsPageInfo={playlistsPageInfo}
          setPlaylistsPageInfo={setPlaylistsPageInfo}
          publishPlaylistsData={publishPlaylistsData}
        />
      )}

      {/* Share modal */}
      {shareModalVisible && targetPublish && (
        <ShareModal
          publishId={targetPublish.id}
          title={targetPublish.title!}
          closeModal={closeShareModal}
        />
      )}
    </>
  )
}