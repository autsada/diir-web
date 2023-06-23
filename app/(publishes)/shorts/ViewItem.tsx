import React, { useCallback, useEffect, useRef, useState } from "react"
import { isMobile } from "react-device-detect"

import ManageFollow from "@/app/(watch)/watch/[id]/ManageFollow"
import Avatar from "@/components/Avatar"
import VideoPlayer from "@/components/VideoPlayer"
import ActionsForCarousel from "./ActionsForCarousel"
import TipModal from "./TipModal"
import ShareModal from "./ShareModal"
import AddToPlaylistsModal from "./AddToPlaylistsModal"
import ReportModal from "./ReportModal"
import { useAuthContext } from "@/context/AuthContext"
import { getPostExcerpt } from "@/lib/client"
import { useExpandContent } from "@/hooks/useExpandContent"
import type {
  CheckPublishPlaylistsResponse,
  FetchPlaylistsResponse,
  Maybe,
  Publish,
  Station,
} from "@/graphql/codegen/graphql"

interface Props {
  isAuthenticated: boolean
  profile: Maybe<Station> | undefined
  publish: Publish
  playlistsResult: Maybe<FetchPlaylistsResponse> | undefined
  isSelected?: boolean
  isPrevious?: boolean
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ViewItem({
  isAuthenticated,
  profile,
  publish,
  playlistsResult,
  isSelected,
  setIsModalOpened,
}: Props) {
  const playback = publish.playback
  const description = publish.description || ""

  const [publishPlaylistsData, setPublishPlaylistsData] =
    useState<CheckPublishPlaylistsResponse>()
  const [tipModalVisible, setTipModalVisible] = useState(false)
  const [shareModalVisible, setShareModalVisible] = useState(false)
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

  const [reportModalVisible, setReportModalVisible] = useState(false)
  const [commentsModalVisible, setCommentsModalVisible] = useState(false)

  const { onVisible: openAuthModal } = useAuthContext()

  const initialDisplayed = 200
  const { displayedContent, expandContent, shrinkContent } = useExpandContent(
    description,
    initialDisplayed
  ) // For displaying description
  const containerRef = useRef<HTMLDivElement>(null)

  // Set video el style to cover
  useEffect(() => {
    const els = document?.getElementsByTagName("video")
    if (els.length > 0) {
      for (let i = 0; i < els.length; i++) {
        els[i].style.objectFit = isMobile ? "cover" : "contain"
      }
    }
  }, [])

  // Close modals when the item is not selected
  useEffect(() => {
    if (!isSelected) {
      setTipModalVisible(false)
      setShareModalVisible(false)
      setAddToPlaylistsModalVisible(false)
    }
  }, [isSelected])

  const fetchPublishPlaylistData = useCallback(async () => {
    try {
      if (!publish || !isAuthenticated || !profile) return

      // Call the api route to check if the publish already add to any user's playlists
      const res = await fetch(`/library/playlists/publish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publishId: publish.id }),
      })
      const data = (await res.json()) as {
        result: CheckPublishPlaylistsResponse
      }
      setPublishPlaylistsData(data.result)
    } catch (error) {
      console.error(error)
    }
  }, [publish, isAuthenticated, profile, setPublishPlaylistsData])
  // Fetch publish playlist data
  useEffect(() => {
    fetchPublishPlaylistData()
  }, [fetchPublishPlaylistData])

  const handleStartTip = useCallback(() => {
    if (!publish?.id) return

    if (!isAuthenticated) {
      openAuthModal()
    } else {
      setTipModalVisible(true)
      setIsModalOpened(true)
    }
  }, [publish, isAuthenticated, openAuthModal, setIsModalOpened])

  const closeTipModal = useCallback(() => {
    setTipModalVisible(false)
    setIsModalOpened(false)
  }, [setIsModalOpened])

  const openShareModal = useCallback(() => {
    setShareModalVisible(true)
    setIsModalOpened(true)
  }, [setIsModalOpened])

  const closeShareModal = useCallback(() => {
    setShareModalVisible(false)
    setIsModalOpened(false)
  }, [setIsModalOpened])

  const onStartShare = useCallback(async () => {
    if (typeof window === "undefined" || !publish) return

    const shareData = {
      title: publish.title || "",
      text: publish.title || "",
      url: `https://4c04-2405-9800-b961-39d-98db-d99c-fb3e-5d9b.ngrok-free.app/watch/${publish.id}`,
    }

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.error(error)
      }
    } else {
      openShareModal()
    }
  }, [publish, openShareModal])

  const handleSavePublish = useCallback(async () => {
    if (!publish) return

    if (!isAuthenticated) {
      openAuthModal()
    } else {
      setAddToPlaylistsModalVisible(true)
      setIsModalOpened(true)
    }
  }, [publish, isAuthenticated, openAuthModal, setIsModalOpened])

  const closeAddToPlaylistsModal = useCallback(() => {
    setAddToPlaylistsModalVisible(false)
    setIsModalOpened(false)
  }, [setIsModalOpened])

  const openReportModal = useCallback(() => {
    setReportModalVisible(true)
    setIsModalOpened(true)
  }, [])

  const closeReportModal = useCallback(() => {
    setReportModalVisible(false)
    setIsModalOpened(false)
  }, [])

  const openCommentsModal = useCallback(() => {
    setCommentsModalVisible(true)
    setIsModalOpened(true)
  }, [])

  const closeCommentsModal = useCallback(() => {
    setCommentsModalVisible(false)
    setIsModalOpened(false)
  }, [])

  if (!playback) return null

  return (
    <div
      id={publish.id}
      ref={containerRef}
      className="relative w-full h-[100vh] flex items-center justify-center"
    >
      <div className="lg:hidden relative w-full h-full bg-black">
        <VideoPlayer
          playback={playback}
          playing={isSelected}
          loop={isSelected}
        />

        <div className="absolute left-0 right-20 top-20 py-1 px-2 overflow-y-auto">
          <div className="text-left max-h-[50vh]">
            <h6 className="text-base sm:text-lg text-white">
              {getPostExcerpt(publish.title || "", 40)}
            </h6>
            <p className="font-light sm:text-base text-white">
              {displayedContent}{" "}
              {description.length > displayedContent.length && (
                <span
                  className="ml-1 text-sm font-semibold cursor-pointer"
                  onClick={expandContent}
                >
                  Show more
                </span>
              )}
            </p>
            {description.length > initialDisplayed &&
              description.length === displayedContent.length && (
                <p
                  className="mt-2 font-semibold text-sm text-white  cursor-pointer"
                  onClick={shrinkContent}
                >
                  Show less
                </p>
              )}
          </div>
        </div>

        <div className="absolute top-0 sm:top-1 md:top-0 bottom-0 sm:bottom-auto md:bottom-0 right-0 md:right-3 sm:left-0 md:left-auto flex flex-col sm:flex-row md:flex-col items-center justify-center sm:items-stretch md:items-center gap-y-5">
          <div className="relative w-full flex flex-col items-center justify-center sm:justify-start md:justify-center">
            <Avatar profile={publish.creator} />
            <div className="absolute -bottom-[15px] sm:bottom-1 w-full py-1">
              <ManageFollow
                isAuthenticated={isAuthenticated}
                follow={publish.creator}
                ownerHref={""}
                ownerLinkText=""
                useIconStyle
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col items-center sm:items-start md:items-center justify-center gap-y-5 sm:gap-y-0 sm:gap-x-5 md:gap-y-5 md:gap-x-0 w-[80px] sm:w-auto md:w-[80px]">
            <ActionsForCarousel
              isAuthenticated={isAuthenticated}
              publish={publish}
              playlistsResult={playlistsResult}
              publishPlaylistsData={publishPlaylistsData}
              handleStartTip={handleStartTip}
              onStartShare={onStartShare}
              handleSavePublish={handleSavePublish}
              openReportModal={openReportModal}
              openCommentsModal={openCommentsModal}
            />
          </div>
        </div>
      </div>

      {/* Tip modal */}
      {tipModalVisible && publish && (
        <TipModal
          publishId={publish?.id}
          closeModal={closeTipModal}
          creator={publish.creator}
        />
      )}

      {/* Share modal */}
      {shareModalVisible && publish && (
        <ShareModal
          publishId={publish.id}
          title={publish.title || ""}
          closeModal={closeShareModal}
        />
      )}

      {/* Add to playlist modal */}
      {addToPlaylistsModalVisible && publishPlaylistsData && publish && (
        <AddToPlaylistsModal
          closeModal={closeAddToPlaylistsModal}
          publishId={publish.id}
          playlists={playlists}
          setPlaylists={setPlaylists}
          playlistsPageInfo={playlistsPageInfo}
          setPlaylistsPageInfo={setPlaylistsPageInfo}
          publishPlaylistsData={publishPlaylistsData}
        />
      )}

      {/* Report modal */}
      {reportModalVisible && publish && (
        <ReportModal publishId={publish.id} closeModal={closeReportModal} />
      )}
    </div>
  )
}
