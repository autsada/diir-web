import React from "react"

import Publishes from "./Publishes"
import { getAccount } from "@/lib/server"
import { getMyPublishes, getStationById } from "@/graphql"
import { redirect } from "next/navigation"
import type { Station, Publish } from "@/graphql/types"

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
  const station = (await getStationById(account?.defaultStation?.id)) as Station

  if (!station) {
    redirect("/settings")
  }

  // Query all publishes created by the station.
  const publishes = (await getMyPublishes({
    idToken,
    signature,
    data: {
      accountId: account.id,
      owner: account.owner,
      creatorId: station.id,
      kind: "all",
    },
  })) as Publish[]

  return <Publishes publishes={publishes} />
}
