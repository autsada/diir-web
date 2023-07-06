"use server"

import { revalidatePath } from "next/cache"

import { updateWatchPreferences, updateReadPreferences } from "@/graphql"
import { getAccount } from "@/lib/server"
import type { PublishCategory } from "@/graphql/types"

export async function updateUserWatchPreferences(
  preferences: PublishCategory[]
) {
  try {
    const data = await getAccount()
    const account = data?.account
    const idToken = data?.idToken
    const signature = data?.signature
    const station = account?.defaultStation
    if (!account || !station || !idToken)
      throw new Error("Please sign in to proceed.")

    if (!preferences) throw new Error("Bad input")

    await updateWatchPreferences({
      idToken,
      signature,
      data: {
        accountId: account.id,
        owner: account.owner,
        stationId: station.id,
        preferences,
      },
    })

    // Revalidate page
    revalidatePath(`/settings/preferences`)
  } catch (error) {
    console.error(error)
  }
}

export async function updateUserReadPreferences(
  preferences: PublishCategory[]
) {
  try {
    const data = await getAccount()
    const account = data?.account
    const idToken = data?.idToken
    const signature = data?.signature
    const station = account?.defaultStation
    if (!account || !station || !idToken)
      throw new Error("Please sign in to proceed.")

    if (!preferences) throw new Error("Bad input")

    await updateReadPreferences({
      idToken,
      signature,
      data: {
        accountId: account.id,
        owner: account.owner,
        stationId: station.id,
        preferences,
      },
    })

    // Revalidate page
    revalidatePath(`/settings/preferences`)
  } catch (error) {
    console.error(error)
  }
}
