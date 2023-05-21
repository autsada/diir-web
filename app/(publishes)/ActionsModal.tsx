import React from "react"
import {
  AiOutlineClockCircle,
  AiOutlineFlag,
  AiOutlineShareAlt,
} from "react-icons/ai"
import { MdPlaylistAdd } from "react-icons/md"
import type { IconType } from "react-icons"

import ModalWrapper from "@/components/ModalWrapper"

interface Props {
  closeModal: () => void
  top: number
  left: number
}

export default function ActionsModal({ closeModal, top, left }: Props) {
  return (
    <ModalWrapper visible>
      <div className="relative z-0 w-full h-full">
        <div className="relative z-0 w-full h-full" onClick={closeModal}></div>

        <div
          className={`absolute z-10 flex flex-col items-center justify-center bg-white rounded-xl w-[300px] h-[240px]`}
          style={{
            top,
            left,
          }}
        >
          <Item Icon={AiOutlineClockCircle} text="Add to Watch Later" />
          <Item Icon={MdPlaylistAdd} text="Add to Playlist" />
          <Item Icon={AiOutlineShareAlt} text="Share" />
          <Item Icon={AiOutlineFlag} text="Report" />
        </div>
      </div>
    </ModalWrapper>
  )
}

function Item({ Icon, text }: { Icon: IconType; text: string }) {
  return (
    <div className="w-full flex items-center justify-center py-2 px-4 my-1 cursor-pointer hover:bg-neutral-100">
      <div className="w-[30px] flex items-center justify-center">
        <Icon size={24} />
      </div>
      <div className="w-[60%] text-left">
        <p className="font-light ml-5">{text}</p>
      </div>
    </div>
  )
}
