import React from "react"
import {
  RiHome4Fill,
  RiHome4Line,
  RiVideoFill,
  RiVideoLine,
} from "react-icons/ri"
import { IoRadioOutline, IoRadio } from "react-icons/io5"
import { AiOutlineRead, AiFillRead } from "react-icons/ai"

import Logo from "./Logo"
import ActiveLink from "./ActiveLink"
import Backdrop from "../Backdrop"

interface Props {
  isOpen: boolean
  closeDrawer: () => void
}

export default function LeftDrawer({ isOpen = false, closeDrawer }: Props) {
  return (
    <>
      <div
        className={`fixed z-50 ${
          isOpen ? "top-0 bottom-0 left-0" : "top-0 bottom-0 -left-[100%]"
        } w-[260px] bg-white transition-all duration-300`}
      >
        <div className="w-full px-5 flex items-center justify-between">
          <div className="w-[80px]">
            <Logo />
          </div>

          <div className="px-2">
            <button
              type="button"
              className="text-xl text-textLight"
              onClick={closeDrawer}
            >
              &#10005;
            </button>
          </div>
        </div>
        <div className="w-full px-5 mt-5">
          <ActiveLink
            name="Home"
            href="/"
            ActiveIcon={RiHome4Fill}
            InActiveIcon={RiHome4Line}
          />
        </div>
        <div className="w-full px-5 mt-5">
          <ActiveLink
            name="Shorts"
            href="/shorts"
            ActiveIcon={RiVideoFill}
            InActiveIcon={RiVideoLine}
          />
        </div>
        <div className="w-full px-5 mt-5">
          <ActiveLink
            name="Podcasts"
            href="/podcasts"
            ActiveIcon={IoRadio}
            InActiveIcon={IoRadioOutline}
          />
        </div>
        <div className="w-full px-5 mt-5">
          <ActiveLink
            name="Blogs"
            href="/blogs"
            ActiveIcon={AiFillRead}
            InActiveIcon={AiOutlineRead}
          />
        </div>
      </div>
      <Backdrop visible={isOpen} onClick={closeDrawer} />
    </>
  )
}
