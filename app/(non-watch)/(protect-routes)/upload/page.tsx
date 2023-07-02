import React, { Suspense } from "react"
import { redirect } from "next/navigation"

import Upload from "./Upload"
import { getAccount } from "@/lib/server"
import { getStationById } from "@/graphql"

export default async function Page() {
  const data = await getAccount()
  const account = data?.account
  if (!account?.defaultStation) {
    redirect("/")
  }

  // Query station by id
  const station = !account?.defaultStation
    ? null
    : await getStationById(account?.defaultStation?.id)

  if (!station) {
    redirect("/settings")
  }

  return (
    <>
      <h5>Upload content</h5>

      <Suspense fallback={<div>Loading...</div>}>
        <Upload
          isAuthenticated={!!account}
          profile={station}
          idToken={data?.idToken || ""}
          stationName={station?.name || ""}
        />
      </Suspense>
    </>
  )
}
