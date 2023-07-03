import React from "react"
import { redirect } from "next/navigation"

import VideoModal from "./VideoModal"
import { getStationById, getUploadedPublish } from "@/graphql"
import { getAccount } from "@/lib/server"

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken
  const signature = data?.signature

  if (!idToken || !account?.defaultStation) {
    redirect("/")
  }

  // Query station by id
  const station = !account?.defaultStation
    ? null
    : await getStationById(account?.defaultStation?.id)

  if (!station) {
    redirect("/settings")
  }

  // Get publish from the database
  const publish = await getUploadedPublish({
    idToken,
    signature,
    data: {
      targetId: params.id,
      requestorId: station.id,
    },
  })

  // If no publish found, or user is not the owner of the publish
  if (!publish || !publish.creator?.isOwner) {
    redirect("/upload")
  }

  return (
    <>
      <h5>Publish: {params.id}</h5>

      <VideoModal publish={publish} stationName={station?.name || ""} />
    </>
  )
}
