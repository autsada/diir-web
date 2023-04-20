import { cookies } from "next/headers"
import React, { Suspense } from "react"

import { getMyAccount } from "@/graphql"
import AppLayoutClient from "./AppLayoutClient"
import TempAppLayout from "./TempAppLayout"

async function getAccount(walletAddress?: string) {
  const cookieStore = cookies()
  const token = cookieStore.get("dtoken")

  if (!token) return null

  const data = await getMyAccount(token.value, walletAddress)

  return data
}

export default async function AppLayoutServer() {
  const accountData = await getAccount()

  return (
    <Suspense fallback={<TempAppLayout />}>
      <AppLayoutClient accountData={accountData} />
    </Suspense>
  )
}
