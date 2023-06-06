import React from "react"
import { redirect } from "next/navigation"

import StationTemplate from "./StationTemplate"
import { getAccount } from "@/lib/server"
import { getStationById } from "@/graphql"

export default async function Station({
  params,
}: {
  params: { id: string }
  children: React.ReactNode
}) {
  const data = await getAccount()
  const account = data?.account
  const station = await getStationById(params.id, account?.defaultStation?.id)

  if (!station) {
    redirect("/settings")
  }

  return (
    <>
      <StationTemplate isAuthenticated={!!account} station={station} />

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
