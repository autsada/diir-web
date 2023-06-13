"use server"

import { revalidatePath } from "next/cache"

import { follow } from "@/graphql"
import { getAccount } from "@/lib/server"

/**
 * @param followerId An id of the station that user wants to follow
 */
export async function followStation(followerId: string) {
  try {
    const data = await getAccount()
    const account = data?.account
    const idToken = data?.idToken
    const signature = data?.signature
    if (!account || !account?.defaultStation || !idToken)
      throw new Error("Please sign in to proceed.")

    if (!followerId) throw new Error("Bad input")

    await follow({
      idToken,
      signature,
      data: {
        accountId: account.id,
        owner: account.owner,
        stationId: account.defaultStation?.id,
        followerId,
      },
    })

    // Revalidate
    revalidatePath(`/[station]`)
    revalidatePath(`/watch/[id]`)
  } catch (error) {
    console.error(error)
  }
}
