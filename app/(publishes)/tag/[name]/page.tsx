import React from "react"

import { getAccount } from "@/lib/server"
import { getStationById } from "@/graphql"

export default async function Page({ params }: { params: { name: string } }) {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken

  // Query station by id
  const station =
    !account || !idToken || !account.defaultStation
      ? undefined
      : await getStationById(account?.defaultStation?.id)

  const tag = params.name

  return <div className="px-2 sm:px-4 py-2 sm:ml-[100px]">{tag}</div>
}
