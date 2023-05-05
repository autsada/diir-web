import React from "react"
import { redirect } from "next/navigation"
import { MdModeEditOutline } from "react-icons/md"

import StationName from "./StationName"
import StationImage from "./StationImage"
import BannerImage from "./BannerImage"
import { getAccount } from "@/lib"
import { getStationById } from "@/graphql"
import type { Station } from "@/graphql/types"

export default async function ManageStation({
  params,
}: {
  params: { id: string }
}) {
  const account = await getAccount()
  const station = (await getStationById(
    params.id,
    account?.defaultStation?.id
  )) as Station

  if (!station) {
    redirect("/settings")
  }

  return (
    <>
      <h5>Manage station</h5>

      <div className="my-6">
        <h6>Name</h6>
        <div className="flex">
          <StationName station={station} />
        </div>
        <p className="font-light text-textLight">@{station.name}</p>
      </div>

      <div className="my-6">
        <h6>Profile image</h6>
        <p className="font-light text-textLight">
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
            <p className="font-light text-textLight">
              Accept png, jpg, or jpeg with at least 100 x 100 pixels and 4MB or
              less.
            </p>
          </div>
        </div>
      </div>

      <div className="my-6">
        <h6>Banner image</h6>
        <p className="font-light text-textLight">
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
            <p className="font-light text-textLight">
              Accept png, jpg, or jpeg with at least 2048 x 1152 pixels and 6MB
              or less.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
