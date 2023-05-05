import React from "react"
import { redirect } from "next/navigation"
import { MdModeEditOutline } from "react-icons/md"

import UploadImage from "@/components/UploadImage"
import { getAccount } from "@/lib"
import { getStationById } from "@/graphql"
import type { Station } from "@/graphql/types"
import StationName from "./StationName"

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
          Your station profile image to be used as an avatar of the station.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 sm:gap-x-5 mt-2">
          <div className="py-5 bg-gray-50">
            <UploadImage station={station} />
          </div>
          <div className="px-5">
            <p className="font-light text-textLight">
              Accept png, jpg, or jpeg with at least 100 x 100 pixels and 2MB or
              less.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
