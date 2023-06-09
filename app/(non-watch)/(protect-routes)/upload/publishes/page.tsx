import React from "react"

import Preview from "./Preview"
import { getAccount } from "@/lib/server"
import { fetchMyPublishes, getStationById } from "@/graphql"
import { redirect } from "next/navigation"

export default async function AllPublishes() {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken
  const signature = data?.signature

  if (!idToken) {
    redirect("/")
  }

  if (!account?.defaultStation) {
    redirect("/station")
  }

  // Query station by id
  const station = await getStationById(account?.defaultStation?.id)

  if (!station) {
    redirect("/settings")
  }

  // First query to all publishes created by the station.
  const result = await fetchMyPublishes({
    idToken,
    signature,
    data: {
      accountId: account.id,
      owner: account.owner,
      creatorId: station.id,
      kind: "all",
      cursor: null,
    },
  })

  return <Preview fetchResult={result || undefined} />
}
