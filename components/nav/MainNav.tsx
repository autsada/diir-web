import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { RxHamburgerMenu } from "react-icons/rx"
import { IoSearchOutline } from "react-icons/io5"

import Logo from "./Logo"
import Avatar from "../Avatar"
import UploadBtn from "../UploadBtn"
import { useAuthContext } from "@/context/AuthContext"
import { SIGN_IN_HEADER } from "@/lib/constants"
import type { Account } from "@/graphql/codegen/graphql"

interface Props {
  account: Account | null
  openLeftDrawer: () => void
  openRightDrawer: () => void
}

export default function MainNav({
  account,
  openLeftDrawer,
  openRightDrawer,
}: Props) {
  const pathname = usePathname()
  const isWatchPage = pathname.startsWith("/watch")
  const { onVisible: openAuthModal } = useAuthContext()

  return (
    <div
      className={`h-[70px] px-2 flex items-center justify-between ${
        isWatchPage ? "bg-neutral-900" : "bg-white"
      }`}
    >
      {isWatchPage && (
        <div className="hidden sm:flex h-full w-[50px] items-center">
          <div
            className={`cursor-pointer p-2 rounded-full ${
              isWatchPage ? "hover:bg-gray-600" : "hover:bg-gray-100"
            }`}
          >
            <RxHamburgerMenu
              size={28}
              className="text-white"
              onClick={openLeftDrawer}
            />
          </div>
        </div>
      )}
      <div className="h-full w-[100px] ml-2 flex items-center justify-start">
        <Link href="/">
          <Logo theme={isWatchPage ? "dark" : "light"} />
        </Link>
      </div>
      <div className="h-full flex-grow flex items-center justify-center">
        <div
          className={`h-[50px] w-full max-w-[500px] flex items-center px-3 md:border ${
            isWatchPage ? "md:border-gray-500" : "md:border-gray-200"
          } md:rounded-full`}
        >
          <div>
            <IoSearchOutline size={24} className="text-textExtraLight" />
          </div>
          <div className="w-full">
            <input
              type="text"
              className={`block w-full h-full max-w-full md:pl-4 bg-transparent ${
                isWatchPage ? "text-white" : ""
              }`}
            />
          </div>
        </div>
      </div>
      <div className={`${!account ? "mr-2" : "mr-0"} sm:mr-4`}>
        <UploadBtn
          isAuthenticated={!!account}
          onClick={openAuthModal.bind(undefined, "Sign in to upload content.")}
          color={isWatchPage ? "#FF904D" : "#2096F3"}
          size={40}
        />
      </div>
      <div className="h-full w-[80px] flex items-center justify-end pr-2">
        {account ? (
          <div onClick={openRightDrawer}>
            <Avatar profile={account?.defaultStation} withLink={false} />
          </div>
        ) : (
          <button
            type="button"
            className="btn-dark mx-0 h-8 w-[80px] rounded-full text-sm"
            onClick={openAuthModal.bind(undefined, SIGN_IN_HEADER)}
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  )
}
