import React, { Suspense } from "react"

import AppLayoutClient from "./AppLayoutClient"
import TempAppLayout from "./TempAppLayout"
import { getAccount } from "@/lib"

export default async function AppLayoutServer() {
  const accountData = await getAccount()

  return (
    <Suspense fallback={<TempAppLayout />}>
      <AppLayoutClient accountData={accountData} />
    </Suspense>
  )
}
