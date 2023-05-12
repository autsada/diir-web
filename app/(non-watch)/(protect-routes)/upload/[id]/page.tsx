import React from "react"
import { revalidatePath } from "next/cache"

import { getStationById, getUploadedPublish } from "@/graphql"
import { redirect } from "next/navigation"
import ContentModal from "./ContentModal"
import type { UploadedPublish } from "@/graphql/types"

export default async function Page({ params }: { params: { id: string } }) {
  // Get publish from the database
  const publish = (await getUploadedPublish(params.id)) as UploadedPublish

  if (!publish) {
    redirect("/upload")
  }

  // Get creator station from the database
  const station = await getStationById(publish.creatorId)

  return (
    <>
      <h5>Publish: {params.id}</h5>

      <ContentModal publish={publish} stationName={station?.name || ""} />
    </>
  )
}
