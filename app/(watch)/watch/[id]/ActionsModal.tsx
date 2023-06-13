import React, { useTransition, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
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
import Mask from "@/components/Mask"
import InformModal from "@/app/(publishes)/InformModal"
import { useAuthContext } from "@/context/AuthContext"
import { saveToWatchLater, dontRecommendStation } from "./actions"
import type {
  Maybe,
  CheckPublishPlaylistsResponse,
  Publish,
  Station,
} from "@/graphql/codegen/graphql"

interface Props {
  isAuthenticated: boolean
  profile: Maybe<Station> | undefined
  closeModal: () => void
  top: number
  left: number
  publish?: Publish
  openAddToPlaylistsModal: () => void
  setPublishPlaylistsData: (p: CheckPublishPlaylistsResponse) => void
  loadingPublishPlaylistsData: boolean
  setLoadingPublishPlaylistsData: React.Dispatch<React.SetStateAction<boolean>>
  openShareModal: () => void
  openReportModal: () => void
}

export default function ActionsModal({
  isAuthenticated,
  profile,
  closeModal,
  publish,
  top,
  left,
  openAddToPlaylistsModal,
  loadingPublishPlaylistsData,
  setLoadingPublishPlaylistsData,
  setPublishPlaylistsData,
  openShareModal,
  openReportModal,
}: Props) {
  const [informModalVisible, setInformModalVisible] = useState(false)

  const { onVisible: openAuthModal } = useAuthContext()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const addToWatchLater = useCallback(() => {
    if (!publish) return

    if (!isAuthenticated) {
      openAuthModal()
    } else if (!profile) {
      setInformModalVisible(true)
    } else {
      startTransition(() => saveToWatchLater(publish.id))
      toast.success("Added to Watch later", { theme: "dark" })
      router.refresh()
    }
    closeModal()
  }, [publish, isAuthenticated, openAuthModal, profile, closeModal, router])

  const onStartAddToPlaylist = useCallback(async () => {
    try {
      if (!publish) return

      if (!isAuthenticated) {
        openAuthModal()
        closeModal()
      } else if (!profile) {
        setInformModalVisible(true)
        closeModal()
      } else {
        // Call the api route to check if the publish already add to any user's playlists
        setLoadingPublishPlaylistsData(true)
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
        openAddToPlaylistsModal()
        setPublishPlaylistsData(data.result)
        setLoadingPublishPlaylistsData(false)
      }
    } catch (error) {
      setLoadingPublishPlaylistsData(false)
    }
  }, [
    publish,
    isAuthenticated,
    closeModal,
    profile,
    openAddToPlaylistsModal,
    openAuthModal,
    setLoadingPublishPlaylistsData,
    setPublishPlaylistsData,
  ])

  const onStartShare = useCallback(async () => {
    if (typeof window === "undefined" || !publish) return

    const shareData = {
      title: publish.title || "",
      text: publish.title || "",
      url: `https://cd48-2405-9800-b961-39d-5016-4959-8f5c-eab7.ngrok-free.app/watch/${publish.id}`,
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
    }
  }, [publish, openShareModal, closeModal])

  const dontRecommendCreator = useCallback(() => {
    if (!publish) return

    if (!isAuthenticated) {
      openAuthModal()
    } else if (!profile) {
      setInformModalVisible(true)
    } else {
      startTransition(() => dontRecommendStation(publish.creator?.id))
      toast.success("This station will not be recommended again", {
        theme: "dark",
      })
    }
    closeModal()
  }, [publish, isAuthenticated, profile, openAuthModal, closeModal])

  return (
    <ModalWrapper visible>
      <div className="relative z-0 w-full h-full">
        <div className="relative z-0 w-full h-full" onClick={closeModal}></div>

        <div
          className={`absolute z-10 flex flex-col items-center justify-center bg-white rounded-xl w-[300px] h-[280px]`}
          style={{
            top,
            left,
          }}
        >
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
          <Item Icon={AiOutlineShareAlt} text="Share" onClick={onStartShare} />
          <Item
            Icon={AiOutlineMinusCircle}
            text="Don't recommend"
            onClick={dontRecommendCreator}
          />
          <Item Icon={AiOutlineFlag} text="Report" onClick={openReportModal} />
        </div>

        {/* Inform modal */}
        {informModalVisible && <InformModal closeModal={closeModal} />}
      </div>

      {/* Prevent interaction while loading */}
      {(loadingPublishPlaylistsData || isPending) && <Mask />}
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
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined
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
