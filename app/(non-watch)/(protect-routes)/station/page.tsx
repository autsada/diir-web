import React, { Suspense } from "react"
import { redirect } from "next/navigation"

import Station from "./Station"
import PageLoader from "@/components/PageLoader"
import { getAccount } from "@/lib/server"

export default async function Page() {
  const data = await getAccount()
  const account = data?.account

  if (!account) {
    redirect("/")
  }

  if (account?.defaultStation) {
    redirect(`/station/${account.defaultStation.id}`)
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Station account={account} />
    </Suspense>
  )
}
