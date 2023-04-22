import React from "react"
import {
  RiHome4Fill,
  RiHome4Line,
  RiVideoFill,
  RiVideoLine,
} from "react-icons/ri"
import { IoRadioOutline, IoRadio } from "react-icons/io5"
import { AiOutlineRead, AiFillRead } from "react-icons/ai"

import ActiveLink from "./ActiveLink"

export default function SideBar() {
  return (
    <div>
      <div className="mb-5">
        <ActiveLink
          name="Home"
          href="/"
          ActiveIcon={RiHome4Fill}
          InActiveIcon={RiHome4Line}
          isVertical={true}
        />
      </div>
      <div className="mb-5">
        <ActiveLink
          name="Shorts"
          href="/shorts"
          ActiveIcon={RiVideoFill}
          InActiveIcon={RiVideoLine}
          isVertical={true}
        />
      </div>
      <div className="mb-5">
        <ActiveLink
          name="Podcasts"
          href="/podcasts"
          ActiveIcon={IoRadio}
          InActiveIcon={IoRadioOutline}
          isVertical={true}
        />
      </div>
      <div className="mb-5">
        <ActiveLink
          name="Blogs"
          href="/blogs"
          ActiveIcon={AiFillRead}
          InActiveIcon={AiOutlineRead}
          isVertical={true}
        />
      </div>
    </div>
  )
}
