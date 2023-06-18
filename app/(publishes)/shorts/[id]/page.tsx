import React from "react"

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

  return (
    <div className="fixed z-50 top-0 sm:top-[70px] bottom-0 left-0 sm:left-[100px] right-0">
      <ViewArea shortResult={shortResult} />
    </div>
  )
}
