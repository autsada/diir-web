import React from "react"

import { getAccount } from "@/lib/server"
import { getStationById } from "@/graphql"
import { redirect } from "next/navigation"
import PublishTemplate from "./PublishTemplate"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const data = await getAccount()
  const account = data?.account
  if (!account?.defaultStation) {
    redirect("/station")
  }

  // Query station by id
  const station = await getStationById(
    account?.defaultStation?.id,
    account?.defaultStation?.id
  )

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
