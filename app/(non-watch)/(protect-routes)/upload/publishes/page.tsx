import { redirect } from "next/navigation"
import React from "react"

import { getStationById } from "@/graphql"
import { getAccount } from "@/lib"
import type { Station } from "@/graphql/types"

export default async function AllPublishes() {
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
      <h5>Publishes dashboard</h5>
    </>
  )
}
