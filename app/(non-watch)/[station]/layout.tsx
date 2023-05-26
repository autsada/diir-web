import React from "react"
import { notFound } from "next/navigation"

import { getAccount } from "@/lib/server"
import { getStationByName } from "@/graphql"
import type { Station } from "@/graphql/codegen/graphql"
import StationTemplate from "../(protect-routes)/station/[id]/StationTemplate"

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { station: string; tab: string }
}) {
  const data = await getAccount()
  const account = data?.account
  const name = params.station.replace("%40", "")

  if (!name) {
    notFound()
  }

  // Query station by name
  const station = (await getStationByName(
    name,
    account?.defaultStation?.id
  )) as Station

  if (!station) {
    notFound()
  }

  return (
    <div className="w-full px-4 py-2">
      <StationTemplate station={station} />

      {children}
    </div>
  )
}
