"use server"

import { revalidatePath } from "next/cache"

import { removeWatchLater } from "@/graphql"
import { getAccount } from "@/lib/server"

export async function removeFromWatchLater(publishId: string) {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken
  const signature = data?.signature
  if (!account || !account?.defaultStation || !idToken)
    throw new Error("Please sign in to proceed.")

  if (!publishId) throw new Error("Bad input")

  // Remove from watch later
  await removeWatchLater({
    idToken,
    signature,
    data: {
      accountId: account.id,
      owner: account.owner,
      stationId: account.defaultStation?.id,
      publishId,
    },
  })

  // Revalidate watch later page
  revalidatePath(`/library/WL`)
}
