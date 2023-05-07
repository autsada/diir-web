import React from "react"
import { revalidatePath } from "next/cache"

import { getUploadedPublish } from "@/graphql"
import { redirect } from "next/navigation"
import ContentModal from "./ContentModal"

export default async function Page({ params }: { params: { id: string } }) {
  const publish = await getUploadedPublish(params.id)

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

  if (!publish) {
    redirect("/upload")
  }

  return (
    <>
      <h5>Publish: {params.id}</h5>

      <ContentModal publish={publish} updatePublish={updatePublish} />
    </>
  )
}
