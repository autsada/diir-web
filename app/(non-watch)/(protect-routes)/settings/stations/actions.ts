"use server"

import { revalidatePath } from "next/cache"

import { cacheLoggedInSession } from "@/graphql"
import { getAccount } from "@/lib/server"

export async function switchProfile(switchToId: string) {
  try {
    const data = await getAccount()
    const account = data?.account
    const idToken = data?.idToken
    const signature = data?.signature
    const station = account?.defaultStation
    if (!account || !station || !idToken)
      throw new Error("Please sign in to proceed.")

    await cacheLoggedInSession({
      idToken,
      signature,
      input: {
        accountId: account.id,
        address: account.owner,
        stationId: switchToId,
      },
    })

    // Revalidate page
    revalidatePath(`/`)
  } catch (error) {
    console.error(error)
  }
}
