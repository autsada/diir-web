import React from "react"
import { redirect } from "next/navigation"

import StationName from "./StationName"
import StationImage from "./StationImage"
import BannerImage from "./BannerImage"
import { getAccount } from "@/lib/server"
import { getStationById } from "@/graphql"
import SectionHeader from "./SectionHeader"

export default async function Settings() {
  const data = await getAccount()
  const account = data?.account
  const loggedInStation = account?.defaultStation
  if (!loggedInStation) {
    redirect("/settings/stations")
  }
  const station = await getStationById(loggedInStation.id, loggedInStation.id)

  if (!station) {
    redirect("/settings/stations")
  }

  return (
    <>
      <SectionHeader sectionName="General" />

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-6 sm:gap-x-5">
        <div className="sm:col-span-2">
          <StationName station={station} />
        </div>

        <div className="sm:col-span-4">
          <div className="mb-6">
            <h6 className="text-base">Profile image</h6>
            <p className="font-light text-textLight text-sm">
              This image will be used as a profile image of your station.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 sm:gap-x-5 mt-2 pb-2 lg:pb-0 bg-neutral-100 rounded-lg">
              <div className="relative lg:col-span-2 pt-2 pb-4">
                <p className="font-light text-textLight text-center text-xs mb-1">
                  Click below to change the image.
                </p>
                <StationImage station={station} />
              </div>
              <div className="h-full px-2 flex items-center justify-center">
                <div className="p-4 bg-white rounded-lg">
                  <p className="font-light text-textLight text-sm">
                    Accept png, jpg, or jpeg with at least 100 x 100 pixels and
                    4MB or less.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h6 className="text-base">Banner image</h6>
            <p className="font-light text-textLight text-sm">
              This image will appear on the top of your station.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 sm:gap-x-5 mt-2 pb-2 lg:pb-0 bg-neutral-100 rounded-lg">
              <div className="relative lg:col-span-2 px-2 pt-2 pb-4">
                <p className="font-light text-textLight text-center text-xs mb-1">
                  Click below to change the image.
                </p>
                <BannerImage station={station} />
              </div>
              <div className="h-full px-2 flex items-center justify-center">
                <div className="p-4 bg-white rounded-lg">
                  <p className="font-light text-textLight text-sm">
                    Accept png, jpg, or jpeg with at least 2048 x 1152 pixels
                    and 6MB or less.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
