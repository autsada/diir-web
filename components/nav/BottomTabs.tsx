import React from "react"
import { AiFillRead, AiOutlineRead } from "react-icons/ai"
import { IoRadio, IoRadioOutline } from "react-icons/io5"
import {
  RiHome4Fill,
  RiHome4Line,
  RiVideoFill,
  RiVideoLine,
} from "react-icons/ri"
import { MdVideoLibrary, MdOutlineVideoLibrary } from "react-icons/md"

import ActiveLink from "./ActiveLink"

interface Props {
  isAuthenticated: boolean
}

export default function BottomTabs({ isAuthenticated }: Props) {
  return (
    <div className="w-full grid grid-cols-5 bg-white shadow-xl border-t border-neutral-100">
      <div className="">
        <ActiveLink
          name="Home"
          href="/"
          ActiveIcon={RiHome4Fill}
          InActiveIcon={RiHome4Line}
          isVertical={true}
        />
      </div>
      <div className="">
        <ActiveLink
          name="Shorts"
          href="/shorts"
          ActiveIcon={RiVideoFill}
          InActiveIcon={RiVideoLine}
          isVertical={true}
        />
      </div>
      <div className="">
        <ActiveLink
          name="Podcasts"
          href="/podcasts"
          ActiveIcon={IoRadio}
          InActiveIcon={IoRadioOutline}
          isVertical={true}
        />
      </div>
      <div className="">
        <ActiveLink
          name="Blogs"
          href="/blogs"
          ActiveIcon={AiFillRead}
          InActiveIcon={AiOutlineRead}
          isVertical={true}
        />
      </div>
      <div className="">
        <ActiveLink
          name="Library"
          href="/library"
          ActiveIcon={MdVideoLibrary}
          InActiveIcon={MdOutlineVideoLibrary}
          isVertical={true}
          requiredAuth={!isAuthenticated}
          requiredAuthText="Sign in to view/create your library."
        />
      </div>
    </div>
  )
}
