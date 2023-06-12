"use server"

import { revalidatePath } from "next/cache"

import { removeFromPlaylist } from "@/graphql"
import { getAccount } from "@/lib/server"

export async function removeItemFromPlaylist(
  publishId: string,
  playlistId: string
) {
  try {
    const data = await getAccount()
    const account = data?.account
    const idToken = data?.idToken
    const signature = data?.signature
    if (!account || !account?.defaultStation || !idToken)
      throw new Error("Please sign in to proceed.")

    if (!publishId) throw new Error("Bad input")

    // Remove from watch later
    await removeFromPlaylist({
      idToken,
      signature,
      data: {
        accountId: account.id,
        owner: account.owner,
        stationId: account.defaultStation?.id,
        playlistId,
        publishId,
      },
    })

    // Revalidate watch later page
    revalidatePath(`/library/[id]`)
  } catch (error) {
    console.error(error)
  }
}
