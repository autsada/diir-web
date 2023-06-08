"use client"

import React, { useState, useCallback, useEffect } from "react"

import ContentTabs from "./ContentTabs"
import PublishItem from "./PublishItem"
import Mask from "@/components/Mask"
import ActionsModal from "../(watch)/watch/[id]/ActionsModal"
import AddToPlaylistsModal from "../(watch)/watch/[id]/AddToPlaylistsModal"
import ShareModal from "./ShareModal"
import ReportModal from "./ReportModal"
import { useAuthContext } from "@/context/AuthContext"
import type { PublishCategory } from "@/graphql/types"
import type {
  Publish,
  Station,
  FetchPublishesResponse,
  FetchPlaylistsResponse,
  CheckPublishPlaylistsResponse,
} from "@/graphql/codegen/graphql"

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
  const [resultByCat, setResultByCat] = useState<FetchPublishesResponse>()
  const displayedResult = selectedCat === "All" ? videosResult : resultByCat
  const [loading, setLoading] = useState(false)

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
  const [reportModalVisible, setReportModalVisible] = useState(false)

  const { onVisible: openAuthModal } = useAuthContext()

  // Query videos when use clicks category
  useEffect(() => {
    async function queryVideosByCat(cat: PublishCategory | "All") {
      try {
        // Call api route to query videos
        setLoading(true)
        const res = await fetch(`/videos/query`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestorId: profile?.id || "",
            category: cat,
          }),
        })
        const data = (await res.json()) as { result: FetchPublishesResponse }
        setResultByCat(data?.result)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }

    queryVideosByCat(selectedCat)
  }, [selectedCat, profile?.id])

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

  const openReportModal = useCallback(() => {
    setReportModalVisible(true)
    setActionsModalVisible(false)
  }, [])

  const closeReportModal = useCallback(() => {
    setReportModalVisible(false)
    setTargetPublish(undefined)
  }, [])

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
        {!displayedResult || displayedResult?.edges?.length === 0 ? (
          <div className="w-full py-10 text-center">
            <h6>No videos found</h6>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 sm:gap-y-6 sm:gap-x-4 py-1 pb-20 sm:p-5 bg-white divide-y-[4px] sm:divide-y-0 divide-neutral-200">
            {displayedResult.edges.map((edge) => (
              <PublishItem
                key={edge?.node?.id}
                publish={edge?.node}
                onOpenActions={onOpenActions}
                setPOS={setPOS}
              />
            ))}
          </div>
        )}
      </div>

      {/* Actions modal */}
      {actionsModalVisible && (
        <ActionsModal
          isAuthenticated={isAuthenticated}
          profile={profile}
          publish={targetPublish}
          closeModal={oncloseActions}
          top={screenHeight - positionY < 280 ? positionY - 280 : positionY} // 280 is modal height
          left={positionX - 300} // 300 is modal width
          openAddToPlaylistsModal={openAddToPlaylistsModal}
          loadingPublishPlaylistsData={loadingPublishPlaylistsData}
          setLoadingPublishPlaylistsData={setLoadingPublishPlaylistsData}
          setPublishPlaylistsData={setPublishPlaylistsData}
          openShareModal={openShareModal}
          openReportModal={openReportModal}
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

      {/* Report modal */}
      {reportModalVisible && targetPublish && (
        <ReportModal
          closeModal={closeReportModal}
          publishId={targetPublish.id}
        />
      )}

      {loading && <Mask backgroundColor="#fff" opacity={0.4} />}

      {loadingPublishPlaylistsData && (
        <Mask backgroundColor="#fff" opacity={0.2} />
      )}
    </>
  )
}
