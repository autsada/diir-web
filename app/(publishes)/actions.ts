"use server"

import { addToWatchLater } from "@/graphql"
import { getAccount } from "@/lib/server"
import { revalidatePath } from "next/cache"

export async function addVideoToWatchLater(publishId: string) {
  const data = await getAccount()
  const account = data?.account
  if (!account || !account?.defaultStation)
    throw new Error("No account/station found.")

  const idToken = data?.idToken
  const signature = data?.signature
  if (!idToken) throw new Error("Please sign in to proceed.")

  if (!publishId) throw new Error("Bad input")

  await addToWatchLater({
    idToken,
    signature,
    data: {
      accountId: account.id,
      owner: account.owner,
      stationId: account.defaultStation?.id,
      publishId,
    },
  })

  // Revalidate library page
  revalidatePath(`/library/WL`)
}
