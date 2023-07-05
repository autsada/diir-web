import React, { useCallback, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { IoSettingsOutline, IoSettings } from "react-icons/io5"
import { MdOutlineVideoLibrary, MdVideoLibrary } from "react-icons/md"
import { BsCollectionPlay, BsCollectionPlayFill } from "react-icons/bs"
import { useDisconnect } from "wagmi"

import ActiveLink from "./ActiveLink"
import Backdrop from "../Backdrop"
import Avatar from "../Avatar"
import ButtonLoader from "../ButtonLoader"
import StationItem from "./StationItem"
import Mask from "../Mask"
import { firebaseAuth } from "@/firebase/config"
import type { Station } from "@/graphql/codegen/graphql"

interface Props {
  profile: Station | null | undefined // Profile is a logged in station
  stations: Station[] // All user's stations
  isOpen: boolean
  closeDrawer: () => void
}

export default function RightDrawer({
  profile,
  stations,
  isOpen = false,
  closeDrawer,
}: Props) {
  const [loading, setLoading] = useState(false)
  const [isStationsExpanded, setIsStationExpanded] = useState(false)
  const [switchLoading, setSwitchLoading] = useState(false)

  const router = useRouter()
  const { disconnect } = useDisconnect()

  // Disable body scroll when modal openned
  useEffect(() => {
    const els = document?.getElementsByTagName("body")
    if (isOpen) {
      if (els[0]) {
        els[0].style.overflow = "hidden"
      }
    } else {
      if (els[0]) {
        els[0].style.overflow = "auto"
      }
    }
  }, [isOpen])

  // Reset stations expanded state when the modal is close
  useEffect(() => {
    if (!isOpen) {
      setIsStationExpanded(false)
    }
  }, [isOpen])

  const signOut = useCallback(async () => {
    try {
      setLoading(true)
      await firebaseAuth.signOut()
      if (disconnect) disconnect()
      // Reload data
      router.refresh()
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }, [disconnect, router])

  const viewStations = useCallback(() => {
    setIsStationExpanded(true)
  }, [])

  const unViewStations = useCallback(() => {
    setIsStationExpanded(false)
  }, [])

  async function switchStation(address: string, stationId: string) {
    try {
      setSwitchLoading(true)
      const result = await fetch(`/settings/stations/switch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address, stationId }),
      })

      const data = await result.json()
      if (data?.status === "Ok") {
        // Reload data
        router.refresh()
        setSwitchLoading(false)
        closeDrawer()
      }
    } catch (error) {
      setSwitchLoading(false)
    }
  }

  return (
    <>
      <div
        className={`fixed z-50 pb-20 ${
          isOpen ? "top-0 bottom-0 right-0" : "top-0 bottom-0 -right-[100%]"
        } w-[300px] bg-white transition-all duration-300 overflow-y-auto`}
      >
        <div className="relative w-full px-2 sm:px-5 flex items-center justify-center">
          <div
            className={`absolute ${
              !isStationsExpanded ? "right-2" : "left-2"
            } top-1 px-2`}
          >
            <button
              type="button"
              className="text-xl text-textExtraLight"
              onClick={!isStationsExpanded ? closeDrawer : unViewStations}
            >
              {!isStationsExpanded ? <>&#10005;</> : <>&#10094;</>}
            </button>
          </div>

          <div className="w-full py-8 px-5 flex items-center">
            {!isStationsExpanded && (
              <>
                <div className="w-[60px]">
                  <Avatar profile={profile} width={60} height={60} />
                </div>
                <div className="w-full ml-4">
                  {profile ? (
                    <>
                      <h6>{profile?.displayName}</h6>
                      <p className="text-textLight">@{profile?.name}</p>
                    </>
                  ) : (
                    <div className="font-thin px-2 text-textLight">
                      Please{" "}
                      <Link href="/station">
                        <span className="font-semibold text-textRegular cursor-pointer">
                          create
                        </span>
                      </Link>{" "}
                      a station to get started.
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {isStationsExpanded ? (
          <div className="px-5 flex flex-col gap-y-2 overflow-y-auto">
            {stations.map((st) => (
              <StationItem
                key={st.id}
                item={st}
                defaultId={profile?.id || ""}
                switchStation={switchStation}
              />
            ))}

            <div className="mt-2">
              <Link href="/settings/stations">
                <p className="font-light text-textLight hover:text-textExtraLight cursor-pointer">
                  View all stations
                </p>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {stations.length > 1 && (
              <div className="relative px-5">
                <div
                  className="px-5 flex items-center justify-between cursor-pointer py-2 hover:bg-gray-100 rounded-md"
                  onClick={viewStations}
                >
                  <p className="font-light text-textExtraLight">
                    Switch station
                  </p>
                  <p className="font-light text-textExtraLight">&#10095;</p>
                </div>
              </div>
            )}

            <div className="w-full px-5 mt-5">
              <ActiveLink
                name="Profile"
                href={profile ? `/station/${profile.id}` : "/station"}
                ActiveIcon={MdVideoLibrary}
                InActiveIcon={MdOutlineVideoLibrary}
              />
            </div>
            <div className="w-full px-5 mt-5">
              <ActiveLink
                name="Uploads"
                href="/upload/publishes"
                ActiveIcon={BsCollectionPlayFill}
                InActiveIcon={BsCollectionPlay}
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

            <div className="mt-10">
              <button
                type="button"
                className="text-lg text-orangeDark"
                disabled={loading}
                onClick={signOut}
              >
                {loading ? (
                  <ButtonLoader loading color="#ff8138" />
                ) : (
                  "Sign out"
                )}
              </button>
            </div>
          </>
        )}
      </div>
      <Backdrop visible={isOpen} onClick={closeDrawer} />

      {(switchLoading || loading) && <Mask />}
    </>
  )
}
