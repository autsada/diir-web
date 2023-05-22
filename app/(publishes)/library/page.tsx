import React from "react"
import { redirect } from "next/navigation"

import { getAccount } from "@/lib/server"
import { getStationById } from "@/graphql"
import type { Station } from "@/graphql/types"
import WatchLaterList from "./WatchLaterList"

export default async function Library() {
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

  // TODO: Get 4 items for each library

  return (
    <>
      <div className="w-full sm:px-4">
        <WatchLaterList />
      </div>
    </>
  )
}
