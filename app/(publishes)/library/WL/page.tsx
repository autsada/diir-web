import React from "react"
import { redirect } from "next/navigation"

import { getAccount } from "@/lib/server"
import { getStationById, fetchWatchLater } from "@/graphql"

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
  const station = await getStationById(account?.defaultStation?.id)

  if (!station) {
    redirect("/")
  }

  // Get watch later videos from the database for the first render
  const watchLaterVids = await fetchWatchLater({
    idToken,
    signature,
    data: {
      accountId: account?.id,
      owner: account?.owner,
      stationId: station?.id,
      cursor: null,
    },
  })

  // console.log(
  //   "watch later vids -->",
  //   JSON.stringify(watchLaterVids, undefined, 2)
  // )

  return <div>Watch Later</div>
}
