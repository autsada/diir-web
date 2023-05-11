import React from "react"

import { getAccount } from "@/lib"
import { getStationByName } from "@/graphql"
import type { Station } from "@/graphql/types"

export default async function Page({
  params,
}: {
  params: { station: string; tab: string }
}) {
  const data = await getAccount()
  const account = data?.account
  console.log("params: ", params)

  //   // Query station by name
  //   const station = (await getStationByName(
  //     name,
  //     account?.defaultStation?.id
  //   )) as Station

  return (
    <>
      <div className="mt-2">
        {/* {station?.publishes.length === 0 ? (
          <h6 className="text-textLight text-center">No content found</h6>
        ) : (
          <div></div>
        )} */}
        Publish by kind
      </div>
    </>
  )
}
