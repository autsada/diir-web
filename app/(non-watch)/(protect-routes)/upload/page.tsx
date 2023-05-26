import React, { Suspense } from "react"
import { redirect } from "next/navigation"

import Upload from "./Upload"
import { getAccount } from "@/lib/server"
import { getStationById } from "@/graphql"
import type { Station } from "@/graphql/codegen/graphql"

export default async function Page() {
  const data = await getAccount()
  const account = data?.account
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
        <Upload idToken={data?.idToken || ""} stationName={station?.name} />
      </Suspense>
    </>
  )
}
