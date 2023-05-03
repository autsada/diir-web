import React, { Suspense } from "react"

import AppLayoutClient from "./AppLayoutClient"
import TempAppLayout from "./TempAppLayout"
import { getAccount } from "@/lib"

export default async function AppLayoutServer() {
  const account = await getAccount()

  return (
    <Suspense fallback={<TempAppLayout />}>
      <AppLayoutClient account={account} isAuthenticated={!!account} />
    </Suspense>
  )
}
