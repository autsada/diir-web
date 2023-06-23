import React from "react"

import ViewArea from "./ViewArea"
import { getAccount } from "@/lib/server"
import { getShort, getStationById } from "@/graphql"
import ContentSection from "./ContentSection"
import CommentsSection from "./CommentsSection"

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
    <div className="fixed z-50 inset-0 grid grid-cols-1 sm:grid-cols-10">
      <div className="sm:col-span-6 bg-black">
        <ContentSection />
      </div>
      <div className="hidden sm:block sm:col-span-4 bg-white">
        <CommentsSection />
      </div>
      {/* <ViewArea shortResult={shortResult} /> */}
    </div>
  )
}
