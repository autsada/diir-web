import React from "react"
import { redirect } from "next/navigation"

import { getAccount } from "@/lib/server"
import { getStationById, getWatchLater } from "@/graphql"
import type { Station } from "@/graphql/types"

export default async function WatchLater() {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken
  const signature = data?.signature

  if (!data || !account || !idToken) {
    redirect("/")
  }

  if (!account?.defaultStation) {
    redirect("/station")
  }

  // Query station by id
  const station = (await getStationById(account?.defaultStation?.id)) as Station

  if (!station) {
    redirect("/")
  }

  // Get watch later videos from the database
  const watchLaterVids = await getWatchLater({
    idToken,
    signature,
    data: {
      accountId: account?.id,
      owner: account?.owner,
      stationId: station?.id,
    },
  })

  console.log("watch later vids -->", watchLaterVids)

  return <div>Watch Later</div>
}
