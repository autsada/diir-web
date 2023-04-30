import React from "react"

import { getAccount } from "@/lib"
import { getStationById } from "@/graphql"
import { redirect } from "next/navigation"

export default async function Station({ params }: { params: { id: string } }) {
  const account = await getAccount()
  const station = await getStationById(params.id, account?.defaultStation?.id)

  if (!station) {
    redirect("/settings")
  }

  return (
    <>
      <h5>Your station</h5>
    </>
  )
}
