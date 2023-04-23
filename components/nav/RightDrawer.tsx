import React from "react"
import { IoSettingsOutline, IoSettings } from "react-icons/io5"
import { HiOutlineRadio, HiRadio } from "react-icons/hi2"
import { useRouter } from "next/navigation"

import ActiveLink from "./ActiveLink"
import Backdrop from "../Backdrop"
import type { Station } from "@/graphql/types"
import Avatar from "../Avatar"

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
  const router = useRouter()

  return (
    <>
      <div
        className={`fixed z-50 ${
          isOpen ? "top-0 bottom-0 right-0" : "top-0 bottom-0 -right-[100%]"
        } w-[300px] bg-white transition-all duration-300`}
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
            {profile && (
              <div className="ml-3">
                <h6>{profile?.displayName}</h6>
                <h6>@{profile?.name}</h6>
              </div>
            )}
          </div>
        </div>

        <div className="w-full px-5 mt-5">
          {profile ? (
            <ActiveLink
              name="Your Stations"
              href="/stations"
              ActiveIcon={HiRadio}
              InActiveIcon={HiOutlineRadio}
            />
          ) : (
            <button
              className="btn-orange px-5 ml-5 rounded-full"
              onClick={() => router.push("/stations/create")}
            >
              Create Station
            </button>
          )}
        </div>
        <div className="w-full px-5 mt-5">
          <ActiveLink
            name="Settings"
            href="/settings"
            ActiveIcon={IoSettings}
            InActiveIcon={IoSettingsOutline}
          />
        </div>
      </div>
      <Backdrop visible={isOpen} onClick={closeDrawer} />
    </>
  )
}
