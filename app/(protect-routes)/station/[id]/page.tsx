import React from "react"
import { redirect } from "next/navigation"

import { getAccount } from "@/lib"
import { getStationById } from "@/graphql"
import type { Station } from "@/graphql/types"
import StationTemplate from "./StationTemplate"

export default async function Station({
  params,
}: {
  params: { id: string }
  children: React.ReactNode
}) {
  const data = await getAccount()
  const account = data?.account
  const station = (await getStationById(
    params.id,
    account?.defaultStation?.id
  )) as Station

  if (!station) {
    redirect("/settings")
  }

  return (
    <>
      <StationTemplate station={station} />

      <div className="mt-2">
        {station?.publishes.length === 0 ? (
          <h6 className="text-textLight text-center">No content found</h6>
        ) : (
          <div></div>
        )}
      </div>
    </>
  )
}
