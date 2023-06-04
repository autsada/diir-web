import React, { useTransition, useState, useCallback } from "react"
import {
  AiOutlineClockCircle,
  AiOutlineFlag,
  AiOutlineShareAlt,
  AiOutlineMinusCircle,
} from "react-icons/ai"
import { MdPlaylistAdd } from "react-icons/md"
import type { IconType } from "react-icons"
import { toast } from "react-toastify"

import ModalWrapper from "@/components/ModalWrapper"
import InformModal from "./InformModal"
import { saveToWatchLater, dontRecommendStation } from "./actions"
import type {
  CheckPublishPlaylistsResponse,
  Publish,
  Station,
} from "@/graphql/codegen/graphql"

interface Props {
  isAuthenticated: boolean
  profile: Station | undefined
  closeModal: () => void
  closeModalAndReset: () => void
  top: number
  left: number
  targetPublish?: Publish
  setTargetPublish: React.Dispatch<React.SetStateAction<Publish | undefined>>
  addToPlaylistModalVisible: boolean
  openAddToPlaylistModal: () => void
  setPlaylistData: (p: CheckPublishPlaylistsResponse) => void
  setLoadingPlaylistData: (l: boolean) => void
  shareModalVisible: boolean
  openShareModal: () => void
  openReportModal: () => void
}

export default function ActionsModal({
  isAuthenticated,
  profile,
  closeModalAndReset,
  closeModal,
  top,
  left,
  targetPublish,
  setTargetPublish,
  addToPlaylistModalVisible,
  openAddToPlaylistModal,
  setPlaylistData,
  setLoadingPlaylistData,
  shareModalVisible,
  openShareModal,
  openReportModal,
}: Props) {
  const [informModalVisible, setInformModalVisible] = useState(false)

  const [isPending, startTransition] = useTransition()

  function addToWatchLater() {
    if (!targetPublish) return

    if (isAuthenticated && !profile) {
      setInformModalVisible(true)
    } else {
      startTransition(() => saveToWatchLater(targetPublish.id))
      toast.success("Added to Watch later", { theme: "dark" })
      closeModalAndReset()
    }
  }

  const onCancelActions = useCallback(() => {
    if (!addToPlaylistModalVisible && !shareModalVisible) {
      setTargetPublish(undefined)
    }
    closeModal()
  }, [
    addToPlaylistModalVisible,
    shareModalVisible,
    setTargetPublish,
    closeModal,
  ])

  async function onStartAddToPlaylist() {
    if (!targetPublish) return

    if (isAuthenticated && !profile) {
      setInformModalVisible(true)
    } else {
      // Call the api route to check if the publish already add to any user's playlists
      setLoadingPlaylistData(true)
      const res = await fetch(`/library/playlists/publish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publishId: targetPublish.id }),
      })
      const data = (await res.json()) as {
        result: CheckPublishPlaylistsResponse
      }
      openAddToPlaylistModal()
      setPlaylistData(data.result)
      setLoadingPlaylistData(false)
      closeModal()
    }
  }

  const onStartShare = useCallback(async () => {
    if (typeof window === "undefined" || !targetPublish) return

    const shareData = {
      title: targetPublish.title || "",
      text: targetPublish.title || "",
      url: `https://4c04-2405-9800-b961-39d-98db-d99c-fb3e-5d9b.ngrok-free.app/watch/${targetPublish.id}`,
    }

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        closeModal()
        await navigator.share(shareData)
      } catch (error) {
        console.error(error)
      }
    } else {
      openShareModal()
      closeModal()
    }
  }, [targetPublish, openShareModal, closeModal])

  function dontRecommendCreator() {
    if (!targetPublish) return

    if (isAuthenticated && !profile) {
      setInformModalVisible(true)
    } else {
      startTransition(() => dontRecommendStation(targetPublish.creator?.id))
      toast.success("This station will not be recommended again", {
        theme: "dark",
      })
      closeModalAndReset()
    }
  }

  return (
    <ModalWrapper visible>
      <div className="relative z-0 w-full h-full">
        <div
          className="relative z-0 w-full h-full"
          onClick={onCancelActions}
        ></div>

        <div
          className={`absolute z-10 flex flex-col items-center justify-center bg-white rounded-xl w-[300px] ${
            !isAuthenticated ? "h-[150px]" : "h-[280px]"
          }`}
          style={{
            top,
            left,
          }}
        >
          {/* These 2 actions are for logged in and has station users only */}
          {isAuthenticated && (
            <>
              <Item
                Icon={AiOutlineClockCircle}
                text="Add to Watch Later"
                onClick={addToWatchLater}
              />
              <Item
                Icon={MdPlaylistAdd}
                text="Add to Playlist"
                onClick={onStartAddToPlaylist}
              />
            </>
          )}
          <Item Icon={AiOutlineShareAlt} text="Share" onClick={onStartShare} />
          {isAuthenticated && (
            <Item
              Icon={AiOutlineMinusCircle}
              text="Don't recommend"
              onClick={dontRecommendCreator}
            />
          )}
          <Item Icon={AiOutlineFlag} text="Report" onClick={openReportModal} />
        </div>

        {/* Inform modal */}
        {informModalVisible && <InformModal closeModal={onCancelActions} />}
      </div>
    </ModalWrapper>
  )
}

function Item({
  Icon,
  text,
  onClick,
}: {
  Icon: IconType
  text: string
  onClick: () => void
}) {
  return (
    <div
      className="w-full flex items-center justify-center py-2 px-4 my-1 cursor-pointer hover:bg-neutral-100"
      onClick={onClick}
    >
      <div className="w-[30px] flex items-center justify-center">
        <Icon size={24} />
      </div>
      <div className="w-[60%] text-left">
        <p className="font-light ml-5">{text}</p>
      </div>
    </div>
  )
}
