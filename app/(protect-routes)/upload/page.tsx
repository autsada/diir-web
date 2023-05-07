import React, { Suspense } from "react"

import Upload from "./Upload"
import { getAccount } from "@/lib"
import { getStationById } from "@/graphql"
import { redirect } from "next/navigation"
import type { Station } from "@/graphql/types"

export default async function Page() {
  const account = await getAccount()
  if (!account?.defaultStation) {
    redirect("/")
  }

  // Query station by id
  const station = (await getStationById(account?.defaultStation?.id)) as Station

  if (!station) {
    redirect("/settings")
  }

  return (
    <>
      <h5>Upload content</h5>

      <Suspense fallback={<div>Loading...</div>}>
        <Upload />
      </Suspense>
    </>
  )
}
