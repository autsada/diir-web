"use client"

import React, { useState, useCallback, useEffect, useMemo } from "react"

import ContentTabs from "./ContentTabs"
import PublishItem from "./PublishItem"
import Mask from "@/components/Mask"
import ActionsModal from "./ActionsModal"
import AddToPlaylistModal from "./AddToPlaylistModal"
import type { PublishCategory } from "@/graphql/types"
import type {
  Publish,
  Station,
  FetchPublishesResponse,
  FetchPlaylistsResponse,
  CheckPublishPlaylistsResponse,
  PlaylistEdge,
  PageInfo,
} from "@/graphql/codegen/graphql"
import ShareModal from "./ShareModal"

interface Props {
  isAuthenticated: boolean
  profile: Station | undefined
  videosResult: FetchPublishesResponse
  playlistsResult: FetchPlaylistsResponse | undefined
}

export default function Videos({
  isAuthenticated,
  profile,
  videosResult,
  playlistsResult,
}: Props) {
  const [selectedCat, setSelectedCat] = useState<PublishCategory | "All">("All")
  const [resultByCat, setResultByCat] =
    useState<FetchPublishesResponse>(videosResult)
  const [loading, setLoading] = useState(false)
  const [targetPublish, setTargetPublish] = useState<Publish>()
  const [actionsModalVisible, setActionsModalVisible] = useState(false)
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)

  const [addToPlaylistModalVisible, setAddToPlaylistModalVisible] =
    useState(false)
  const [publishPlaylistsData, setPublishPlaylistsData] =
    useState<CheckPublishPlaylistsResponse>()
  const [loadingPublishPlaylistsData, setLoadingPublishPlaylistsData] =
    useState(false)

  const initialPlaylists = useMemo(
    () => playlistsResult?.edges || [],
    [playlistsResult]
  )
  const initialPageInfo = useMemo(
    () => playlistsResult?.pageInfo,
    [playlistsResult]
  )
  const [playlists, setPlaylists] = useState<PlaylistEdge[]>([])
  const [playlistsPageInfo, setPlaylistsPageInfo] = useState<
    PageInfo | undefined
  >()

  const [shareModalVisible, setShareModalVisible] = useState(false)

  // Query videos when use clicks category
  useEffect(() => {
    queryVideosByCat(selectedCat)
  }, [selectedCat])

  const onReactToPublish = useCallback((p: Publish) => {
    setTargetPublish(p)
    setActionsModalVisible(true)
  }, [])

  const setPOS = useCallback(
    (posX: number, posY: number, screenHeight: number) => {
      setPositionX(posX)
      setPositionY(posY)
      setScreenHeight(screenHeight)
    },
    []
  )

  const closeModalAndResetState = useCallback(() => {
    setTargetPublish(undefined)
    setActionsModalVisible(false)
  }, [])

  const closeModal = useCallback(() => {
    setActionsModalVisible(false)
  }, [])

  async function queryVideosByCat(cat: PublishCategory | "All") {
    try {
      // Call api route to query videos
      setLoading(true)
      const res = await fetch(`/videos/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: cat }),
      })
      const data = (await res.json()) as { result: FetchPublishesResponse }
      setResultByCat(data?.result)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const openAddToPlaylistModal = useCallback(() => {
    setAddToPlaylistModalVisible(true)
  }, [])

  const closeAddToPlaylistModal = useCallback(() => {
    setAddToPlaylistModalVisible(false)
    setPublishPlaylistsData(undefined)
    setTargetPublish(undefined)
  }, [])

  // Set playlists and playlists page info based on initial values
  useEffect(() => {
    setPlaylists(initialPlaylists)
    setPlaylistsPageInfo(initialPageInfo)
  }, [initialPlaylists, initialPageInfo])

  const openShareModal = useCallback(() => {
    setShareModalVisible(true)
  }, [])

  const closeShareModal = useCallback(() => {
    setShareModalVisible(false)
    setTargetPublish(undefined)
  }, [])

  console.log("publish -->", targetPublish)
  return (
    <>
      <div className="fixed z-10 top-[70px] left-0 sm:left-[116px] right-0 h-[40px] bg-white">
        <div className="h-full py-4 px-2 w-full overflow-x-auto scrollbar-hide">
          <div className="h-full w-max flex items-center gap-x-2 sm:gap-x-4">
            <ContentTabs
              category={selectedCat}
              setCategory={setSelectedCat}
              loading={loading}
            />
          </div>
        </div>
      </div>

      <div className="mt-[40px] py-2 sm:px-4 sm:ml-[100px]">
        {resultByCat?.edges?.length === 0 ? (
          <div className="w-full py-10 text-center">
            <h6>No videos found</h6>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 sm:gap-y-6 sm:gap-x-4 py-1 pb-20 sm:p-5 bg-white divide-y-[4px] sm:divide-y-0 divide-neutral-200">
            {resultByCat.edges.map((edge) => (
              <PublishItem
                key={edge?.node?.id}
                publish={edge?.node}
                onAction={onReactToPublish}
                setPOS={setPOS}
              />
            ))}

            {/* Actions modal */}
            {actionsModalVisible && (
              <ActionsModal
                isAuthenticated={isAuthenticated}
                profile={profile}
                closeModalAndReset={closeModalAndResetState}
                closeModal={closeModal}
                top={
                  screenHeight - positionY < 200 ? positionY - 200 : positionY
                } // 200 is modal height
                left={positionX - 300} // 300 is modal width
                targetPublish={targetPublish}
                setTargetPublish={setTargetPublish}
                addToPlaylistModalVisible={addToPlaylistModalVisible}
                openAddToPlaylistModal={openAddToPlaylistModal}
                setPlaylistData={setPublishPlaylistsData}
                setLoadingPlaylistData={setLoadingPublishPlaylistsData}
                shareModalVisible={shareModalVisible}
                openShareModal={openShareModal}
              />
            )}
          </div>
        )}
      </div>

      {/* Add to playlist modal */}
      {addToPlaylistModalVisible && publishPlaylistsData && targetPublish && (
        <AddToPlaylistModal
          closeModal={closeAddToPlaylistModal}
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

      {loading && <Mask backgroundColor="#fff" opacity={0.4} />}

      {loadingPublishPlaylistsData && (
        <Mask backgroundColor="#fff" opacity={0.2} />
      )}
    </>
  )
}
