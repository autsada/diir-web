import React, { useCallback, useState } from "react"
import Link from "next/link"
import { IoSettingsOutline, IoSettings } from "react-icons/io5"
import { MdOutlineVideoLibrary, MdVideoLibrary } from "react-icons/md"

import ActiveLink from "./ActiveLink"
import Backdrop from "../Backdrop"
import Avatar from "../Avatar"
import { firebaseAuth } from "@/firebase/config"
import type { Station } from "@/graphql/types"
import ButtonLoader from "../ButtonLoader"

interface Props {
  profile: Station | null | undefined // Profile is a logged in station
  isOpen: boolean
  closeDrawer: () => void
}

export default function RightDrawer({
  profile,
  isOpen = false,
  closeDrawer,
}: Props) {
  const [loading, setLoading] = useState(false)

  const signOut = useCallback(async () => {
    try {
      setLoading(true)
      await firebaseAuth.signOut()
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }, [])

  return (
    <>
      <div
        className={`fixed z-50 ${
          isOpen ? "top-0 bottom-0 right-0" : "top-0 bottom-0 -right-[100%]"
        } w-[260px] sm:w-[300px] bg-white transition-all duration-300`}
      >
        <div className="relative w-full px-5 flex items-center justify-center">
          <div className="absolute right-2 top-1 px-2">
            <button
              type="button"
              className="text-xl text-textLight"
              onClick={closeDrawer}
            >
              &#10005;
            </button>
          </div>
          <div className="w-full py-8 px-5 flex items-center">
            <Avatar profile={profile} width={60} height={60} />
            <div className="w-[100px] sm:w-[150px] pl-4">
              {profile ? (
                <div className="ml-3">
                  <h6>{profile?.displayName}</h6>
                  <h6>@{profile?.name}</h6>
                </div>
              ) : (
                <div className="font-thin text-textLight">
                  To start upload content, you will need to{" "}
                  <Link href="/station">
                    <span className="font-semibold text-textRegular cursor-pointer">
                      create
                    </span>
                  </Link>{" "}
                  a station.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full px-5 mt-5">
          <ActiveLink
            name="Your Station"
            href="/station"
            ActiveIcon={MdVideoLibrary}
            InActiveIcon={MdOutlineVideoLibrary}
          />
        </div>
        <div className="w-full px-5 mt-5">
          <ActiveLink
            name="Settings"
            href="/settings"
            ActiveIcon={IoSettings}
            InActiveIcon={IoSettingsOutline}
          />
        </div>

        <div className="mt-20">
          <button
            type="button"
            className="text-lg text-orange-500"
            disabled={loading}
            onClick={signOut}
          >
            {loading ? <ButtonLoader loading color="#f97316" /> : "Sign out"}
          </button>
        </div>
      </div>
      <Backdrop visible={isOpen} onClick={closeDrawer} />
    </>
  )
}
