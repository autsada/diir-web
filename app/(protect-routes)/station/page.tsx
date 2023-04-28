import React, { Suspense } from "react"

import { getAccount } from "@/lib"

import Station from "./Station"
import PageLoader from "@/components/PageLoader"

export default async function Page() {
  const account = await getAccount()

  return (
    <Suspense fallback={<PageLoader />}>
      <Station account={account} />
    </Suspense>
  )
}
