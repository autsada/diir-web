"use client"

import React, { useState, useCallback } from "react"
import Link from "next/link"
import { AiOutlineClockCircle } from "react-icons/ai"

import Item from "./Item"
import ActionsModal from "@/app/(watch)/watch/[id]/ActionsModal"
import AddToPlaylistsModal from "@/app/(watch)/watch/[id]/AddToPlaylistsModal"
import ReportModal from "@/app/(publishes)/ReportModal"
import ShareModal from "@/app/(publishes)/ShareModal"
import Mask from "@/components/Mask"
import { useAuthContext } from "@/context/AuthContext"
import type {
  Maybe,
  Publish,
  Station,
  FetchPlaylistsResponse,
  CheckPublishPlaylistsResponse,
} from "@/graphql/codegen/graphql"

interface Props {
  isAuthenticated: boolean
  profile: Station | undefined
  items: Publish[]
  itemsCount: number
  playlistsResult: Maybe<FetchPlaylistsResponse> | undefined
}

export default function WatchLaterList({
  isAuthenticated,
  profile,
  items,
  itemsCount,
  playlistsResult,
}: Props) {
  const [targetPublish, setTargetPublish] = useState<Publish>()
  const [actionsModalVisible, setActionsModalVisible] = useState(false)
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)
  const [screenWidth, setScreenWidth] = useState(0)

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

  const onOpenActions = useCallback((p: Publish) => {
    setTargetPublish(p)
    setActionsModalVisible(true)
  }, [])

  const oncloseActions = useCallback(() => {
    setTargetPublish(undefined)
    setActionsModalVisible(false)
  }, [])

  const setPOS = useCallback(
    (posX: number, posY: number, screenHeight: number, screenWidth: number) => {
      setPositionX(posX)
      setPositionY(posY)
      setScreenHeight(screenHeight)
      setScreenWidth(screenWidth)
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
      <div className="w-full pb-5">
        <div className="sm:w-[90%] flex items-center justify-between">
          <Link href="/library/WL">
            <div className="flex items-start gap-x-4 cursor-pointer">
              <AiOutlineClockCircle size={22} />
              <div className="flex items-center gap-x-2">
                <h6 className="text-lg sm:text-xl">Watch later</h6>
                {itemsCount > 0 && (
                  <p className="sm:text-lg text-textLight">{itemsCount}</p>
                )}
              </div>
            </div>
            {itemsCount === 0 && (
              <p className="mt-1 text-textLight">
                No publishes in watch later yet.
              </p>
            )}
          </Link>

          {itemsCount > 0 && (
            <Link href="/library/WL">
              <p className="text-blueBase rounded-full cursor-pointer sm:text-lg">
                See all
              </p>
            </Link>
          )}
        </div>

        <div className="mt-5 w-full overflow-x-auto scrollbar-hide">
          <div className="w-max flex gap-x-2 sm:gap-x-4">
            {items.map((item) => (
              <Item
                key={item.id}
                publish={item}
                onOpenActions={onOpenActions}
                setPOS={setPOS}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Actions modal */}
      {actionsModalVisible && targetPublish && (
        <ActionsModal
          isAuthenticated={isAuthenticated}
          profile={profile}
          publish={targetPublish}
          closeModal={oncloseActions}
          top={screenHeight - positionY < 280 ? positionY - 280 : positionY} // 280 is modal height
          left={
            positionX > 300
              ? positionX - 300
              : screenWidth - positionX > 300
              ? positionX
              : positionX / 2
          } // 300 is modal width
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

      {loadingPublishPlaylistsData && (
        <Mask backgroundColor="#fff" opacity={0.2} />
      )}
    </>
  )
}
