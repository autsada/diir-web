import React from "react"

import { getAccount } from "@/lib/server"
import { getStationByName } from "@/graphql"
import type { Station } from "@/graphql/types"

export default async function Page({
  params,
}: {
  params: { station: string; tab: string }
}) {
  const data = await getAccount()
  const account = data?.account

  //   // Query station by name
  //   const station = (await getStationByName(
  //     name,
  //     account?.defaultStation?.id
  //   )) as Station

  return (
    <>
      {/* {station?.publishes.length === 0 ? (
          <h6 className="text-textLight text-center">No content found</h6>
        ) : (
          <div></div>
        )} */}
      Publish by kind
    </>
  )
}
