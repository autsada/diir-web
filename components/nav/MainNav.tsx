"use client"

import React from "react"
import { RxHamburgerMenu } from "react-icons/rx"
import { IoSearchOutline } from "react-icons/io5"

import Logo from "./Logo"

interface Props {
  openLeftDrawer: () => void
  openAuthModal: () => void
}

export default function MainNav({ openLeftDrawer, openAuthModal }: Props) {
  return (
    <div className="h-[70px] px-2 flex items-center justify-between">
      <div className="h-full w-[120px] min-w-[120px] flex items-center">
        <div className="h-full w-[50px] flex items-center">
          <div className="cursor-pointer p-2 rounded-full hover:bg-gray-100">
            <RxHamburgerMenu
              size={28}
              className="text-textLight"
              onClick={openLeftDrawer}
            />
          </div>
        </div>

        <Logo />
      </div>
      <div className="h-full flex-grow flex items-center justify-center">
        <div className="w-full h-[50px] max-w-[500px] flex items-center px-3 md:border md:border-gray-200 md:rounded-full">
          <div>
            <IoSearchOutline size={24} className="text-textExtraLight" />
          </div>
          <div className="w-full">
            <input
              type="text"
              className="block w-full h-full max-w-full md:pl-4"
            />
          </div>
        </div>
      </div>
      <div className="h-full w-[80px] flex items-center justify-end">
        <button
          className="btn-orange mx-0 h-8 w-[80px] rounded-full"
          onClick={openAuthModal}
        >
          Sign in
        </button>
      </div>
    </div>
  )
}
