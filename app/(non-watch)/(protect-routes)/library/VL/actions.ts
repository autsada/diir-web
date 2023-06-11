"use server"

import { revalidatePath } from "next/cache"

import { removeAllWatchLater, removeWatchLater } from "@/graphql"
import { getAccount } from "@/lib/server"

export async function removeFromWatchLater(publishId: string) {
  try {
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
    revalidatePath(`/library/VL`)
  } catch (error) {
    console.error(error)
  }
}

export async function removeAllWL() {
  try {
    const data = await getAccount()
    const account = data?.account
    const idToken = data?.idToken
    const signature = data?.signature
    if (!account || !account?.defaultStation || !idToken)
      throw new Error("Please sign in to proceed.")

    // Remove from watch later
    await removeAllWatchLater({
      idToken,
      signature,
      data: {
        accountId: account.id,
        owner: account.owner,
        stationId: account.defaultStation?.id,
      },
    })

    // Revalidate watch later page
    revalidatePath(`/library/VL`)
  } catch (error) {
    console.error(error)
  }
}
