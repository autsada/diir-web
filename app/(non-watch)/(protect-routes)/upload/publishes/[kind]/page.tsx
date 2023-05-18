import React from "react"
import { redirect } from "next/navigation"

import Publishes from "../Publishes"
import { getAccount } from "@/lib/server"
import { getMyPublishes, getStationById } from "@/graphql"
import type { QueryPublishKind, Station, Publish } from "@/graphql/types"

export default async function Page({
  params,
}: {
  params: { kind: QueryPublishKind }
}) {
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

  // Query all publishes by kind.
  const kind = params.kind

  let publishes = (await getMyPublishes({
    idToken,
    signature,
    data: {
      accountId: account.id,
      owner: account.owner,
      creatorId: station.id,
      kind,
    },
  })) as Publish[]

  return <Publishes publishes={publishes} />
}
