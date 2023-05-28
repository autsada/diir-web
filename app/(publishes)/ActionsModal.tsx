import React, { useTransition, useState } from "react"
import {
  AiOutlineClockCircle,
  AiOutlineFlag,
  AiOutlineShareAlt,
} from "react-icons/ai"
import { MdPlaylistAdd } from "react-icons/md"
import type { IconType } from "react-icons"
import { toast } from "react-toastify"

import ModalWrapper from "@/components/ModalWrapper"
import InformModal from "./InformModal"
import { saveToWatchLater } from "./actions"
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
  setPlaylistData: (p: CheckPublishPlaylistsResponse) => void
  setLoadingPlaylistData: (l: boolean) => void
}

export default function ActionsModal({
  isAuthenticated,
  profile,
  closeModalAndReset,
  closeModal,
  top,
  left,
  targetPublish,
  setPlaylistData,
  setLoadingPlaylistData,
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

  async function startAddToPlaylist() {
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
      setPlaylistData(data.result)
      setLoadingPlaylistData(false)
      closeModal()
    }
  }

  return (
    <ModalWrapper visible>
      <div className="relative z-0 w-full h-full">
        <div className="relative z-0 w-full h-full" onClick={closeModal}></div>

        <div
          className={`absolute z-10 flex flex-col items-center justify-center bg-white rounded-xl w-[300px] ${
            !isAuthenticated ? "h-[120px]" : "h-[240px]"
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
                onClick={startAddToPlaylist}
              />
            </>
          )}
          <Item Icon={AiOutlineShareAlt} text="Share" onClick={() => {}} />
          <Item Icon={AiOutlineFlag} text="Report" onClick={() => {}} />
        </div>

        {/* Inform modal */}
        {informModalVisible && <InformModal closeModal={closeModal} />}
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
