import React, { useTransition, useState } from "react"
import { useRouter } from "next/navigation"
import {
  AiOutlineClockCircle,
  AiOutlineFlag,
  AiOutlineShareAlt,
} from "react-icons/ai"
import { MdPlaylistAdd } from "react-icons/md"
import type { IconType } from "react-icons"
import { toast } from "react-toastify"

import ModalWrapper from "@/components/ModalWrapper"
import { addVideoToWatchLater } from "./actions"
import type { Publish, Station } from "@/graphql/types"

interface Props {
  isAuthenticated: boolean
  profile: Station | undefined
  closeModal: () => void
  top: number
  left: number
  targetPublish?: Publish
}

export default function ActionsModal({
  isAuthenticated,
  profile,
  closeModal,
  top,
  left,
  targetPublish,
}: Props) {
  const [informModalVisible, setInformModalVisible] = useState(false)
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  function saveToWatchLater() {
    if (!targetPublish) return

    if (isAuthenticated && !profile) {
      setInformModalVisible(true)
    } else {
      startTransition(() => addVideoToWatchLater(targetPublish.id))
      toast.success("Added to Watch later", { theme: "dark" })
      closeModal()
    }
  }

  function saveToPlaylist() {
    if (!targetPublish) return

    if (isAuthenticated && !profile) {
      setInformModalVisible(true)
    } else {
    }
  }

  console.log("ispending -->", isPending)
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
                onClick={saveToWatchLater}
              />
              <Item
                Icon={MdPlaylistAdd}
                text="Add to Playlist"
                onClick={saveToPlaylist}
              />
            </>
          )}
          <Item Icon={AiOutlineShareAlt} text="Share" onClick={() => {}} />
          <Item Icon={AiOutlineFlag} text="Report" onClick={() => {}} />
        </div>

        {/* Inform modal */}
        {informModalVisible && (
          <ModalWrapper visible>
            <div className="w-[90%] sm:w-[60%] lg:w-[40%] p-10 bg-white rounded-xl text-center">
              <h6>You need a station to add publishes to playlist.</h6>

              <button
                type="button"
                className="btn-dark mt-6 px-6 rounded-full"
                onClick={() => router.push("/station")}
              >
                Create a station
              </button>

              <button
                type="button"
                className="mt-6 text-orange-500"
                onClick={closeModal}
              >
                Maybe later
              </button>
            </div>
          </ModalWrapper>
        )}
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
