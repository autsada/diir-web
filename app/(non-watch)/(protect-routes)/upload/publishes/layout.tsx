import React from "react"

import { getAccount } from "@/lib/server"
import { getStationById } from "@/graphql"
import { redirect } from "next/navigation"
import type { Station } from "@/graphql/types"
import PublishTemplate from "./PublishTemplate"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const data = await getAccount()
  const account = data?.account
  if (!account?.defaultStation) {
    redirect("/")
  }

  // Query station by id
  const station = (await getStationById(account?.defaultStation?.id)) as Station

  if (!station) {
    redirect("/settings")
  }
  return (
    <>
      <PublishTemplate station={station} />

      <div className="mt-2">{children}</div>
    </>
  )
}
