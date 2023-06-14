"use server"

import { revalidatePath } from "next/cache"

import { updateStationName } from "@/graphql"
import { getAccount } from "@/lib/server"

export async function updateDisplayName(name: string) {
  try {
    const data = await getAccount()
    const account = data?.account
    const idToken = data?.idToken
    const signature = data?.signature
    const station = account?.defaultStation
    if (!account || !station || !idToken)
      throw new Error("Please sign in to proceed.")

    if (!name) throw new Error("Bad input")

    await updateStationName({
      idToken,
      signature,
      input: {
        accountId: account.id,
        owner: account.owner,
        stationId: station.id,
        name,
      },
    })

    // Revalidate page
    revalidatePath(`/settings`)
  } catch (error) {
    console.error(error)
  }
}
