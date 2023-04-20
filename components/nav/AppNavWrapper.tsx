import { cookies } from "next/headers"
import React, { Suspense } from "react"

import { getMyAccount } from "@/graphql"
import AppNav from "./AppNav"
import TempAppNav from "./TempAppNav"

async function getAccount(walletAddress?: string) {
  const cookieStore = cookies()
  const token = cookieStore.get("dtoken")

  if (!token) return null

  const data = await getMyAccount(token.value, walletAddress)

  return data
}

export default async function AppNavWrapper() {
  const accountData = await getAccount()

  return (
    <Suspense fallback={<TempAppNav />}>
      <AppNav accountData={accountData} />
    </Suspense>
  )
}
