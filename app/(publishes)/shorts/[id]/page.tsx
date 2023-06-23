import React from "react"

import Content from "./Content"
import Comments from "./Comments"
import ViewArea from "./ViewArea"
import { getAccount } from "@/lib/server"
import { getShort, getStationById } from "@/graphql"

type Props = {
  params: { id: string }
}

export default async function Page({ params }: Props) {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken

  // Query station by id
  const station =
    !account || !idToken || !account.defaultStation
      ? undefined
      : await getStationById(account?.defaultStation?.id)

  const publishId = params.id
  const shortResult = await getShort({
    publishId,
    requestorId: station?.id,
  })

  return <Content />
}
