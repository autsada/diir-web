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
import type { Station } from "@/graphql/types"

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
  const [stationsExpanded, setStationExpanded] = useState(false)
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
      setStationExpanded(false)
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
    setStationExpanded(true)
  }, [])

  const unViewStations = useCallback(() => {
    setStationExpanded(false)
  }, [])

  async function switchStation(address: string, stationId: string) {
    try {
      setSwitchLoading(true)
      const result = await fetch(`/station/switch`, {
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
        className={`fixed z-50 ${
          isOpen ? "top-0 bottom-0 right-0" : "top-0 bottom-0 -right-[100%]"
        } w-[300px] bg-white transition-all duration-300`}
      >
        <div className="relative w-full px-2 sm:px-5 flex items-center justify-center">
          <div
            className={`absolute ${
              !stationsExpanded ? "right-2" : "left-2"
            } top-1 px-2`}
          >
            <button
              type="button"
              className="text-xl text-textExtraLight"
              onClick={!stationsExpanded ? closeDrawer : unViewStations}
            >
              {!stationsExpanded ? <>&#10005;</> : <>&#10094;</>}
            </button>
          </div>

          <div className="w-full py-8 px-5 flex items-center">
            {!stationsExpanded && (
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
              </>
            )}
          </div>
        </div>

        {stations.length > 1 && !stationsExpanded && (
          <div className="relative px-5">
            <div
              className="px-5 flex items-center justify-between cursor-pointer py-2 hover:bg-gray-100 rounded-md"
              onClick={viewStations}
            >
              <p className="font-light text-textExtraLight">Switch station</p>
              <p className="font-light text-textExtraLight">&#10095;</p>
            </div>
          </div>
        )}

        {!stationsExpanded ? (
          <>
            <div className="w-full px-5 mt-5">
              <ActiveLink
                name="Your Station"
                href={profile ? `/station/${profile.id}` : "/station"}
                ActiveIcon={MdVideoLibrary}
                InActiveIcon={MdOutlineVideoLibrary}
              />
            </div>
            <div className="w-full px-5 mt-5">
              <ActiveLink
                name="Publishes Dashboard"
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

            <div className="mt-20">
              <button
                type="button"
                className="text-lg text-orange-500"
                disabled={loading}
                onClick={signOut}
              >
                {loading ? (
                  <ButtonLoader loading color="#f97316" />
                ) : (
                  "Sign out"
                )}
              </button>
            </div>
          </>
        ) : (
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
              <Link href="/settings">
                <p className="font-light text-textLight hover:text-textExtraLight cursor-pointer">
                  View all stations
                </p>
              </Link>
            </div>
          </div>
        )}
      </div>
      <Backdrop visible={isOpen} onClick={closeDrawer} />

      {(switchLoading || loading) && <Mask />}
    </>
  )
}
