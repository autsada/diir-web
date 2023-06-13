import React from "react"
import { redirect } from "next/navigation"

import StationName from "./StationName"
import StationImage from "./StationImage"
import BannerImage from "./BannerImage"
import { getAccount } from "@/lib/server"
import { getStationById } from "@/graphql"

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
      <div className="my-6">
        <h6 className="text-base sm:text-lg lg:text-xl">Name</h6>
        <div className="flex">
          <StationName station={station} />
        </div>
        {/* <p className="font-light text-textLight text-sm sm:text-base lg:text-lg">
          @{station.name}
        </p> */}
      </div>

      <div className="my-6">
        <h6 className="text-base sm:text-lg lg:text-xl">Profile image</h6>
        <p className="font-light text-textLight text-sm sm:text-base">
          This image will be used as a profile image of your station.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-3 sm:gap-x-5 mt-2">
          <div className="relative pt-2 pb-4 bg-gray-50">
            <p className="font-light text-textLight text-center text-xs mb-1">
              Click the box below to upload.
            </p>
            <StationImage station={station} />
          </div>
          <div className="px-5">
            <p className="font-light text-textLight text-sm sm:text-base">
              Accept png, jpg, or jpeg with at least 100 x 100 pixels and 4MB or
              less.
            </p>
          </div>
        </div>
      </div>

      <div className="my-6">
        <h6 className="text-base sm:text-lg lg:text-xl">Banner image</h6>
        <p className="font-light text-textLight text-sm sm:text-base">
          This image will appear on the top of your station.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-3 sm:gap-x-5 mt-2">
          <div className="relative pt-2 pb-4 sm:px-4 bg-gray-50">
            <p className="font-light text-textLight text-center text-xs mb-1">
              Click the box below to upload.
            </p>
            <BannerImage station={station} />
          </div>
          <div className="px-5">
            <p className="font-light text-textLight text-sm sm:text-base">
              Accept png, jpg, or jpeg with at least 2048 x 1152 pixels and 6MB
              or less.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
