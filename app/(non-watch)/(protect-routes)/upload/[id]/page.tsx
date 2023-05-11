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

  async function updatePublish(formData: FormData) {
    "use server"

    const id = formData.get("id")
    const title = formData.get("title")
    const description = formData.get("description")
    const primaryCat = formData.get("primary")
    const secondaryCat = formData.get("secondary")
    const visibility = formData.get("visibility")

    console.log("id -->", id)
    console.log("title -->", title)
    console.log("description -->", description)
    console.log("primaryCat -->", primaryCat)
    console.log("secondaryCat -->", secondaryCat)
    console.log("visibility -->", visibility)

    revalidatePath(`/upload/${id}`)
  }

  return (
    <>
      <h5>Publish: {params.id}</h5>

      <ContentModal publish={publish} stationName={station?.name || ""} />
    </>
  )
}
