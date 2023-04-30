import React, { Suspense } from "react"
import { redirect } from "next/navigation"

import Station from "./Station"
import PageLoader from "@/components/PageLoader"
import { getAccount } from "@/lib"

export default async function Page() {
  const account = await getAccount()

  if (account?.defaultStation) {
    redirect(`/station/${account.defaultStation.id}`)
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Station account={account} />
    </Suspense>
  )
}
