"use server"

import { revalidatePath } from "next/cache"

import { bookmark } from "@/graphql"
import { getAccount } from "@/lib/server"

export async function bookmarkPost(publishId: string) {
  try {
    const data = await getAccount()
    const account = data?.account
    const idToken = data?.idToken
    const signature = data?.signature
    const profile = account?.defaultStation
    if (!account || !profile || !idToken)
      throw new Error("Please sign in to proceed.")

    await bookmark({
      idToken,
      signature,
      input: {
        accountId: account.id,
        owner: account.owner,
        profileId: profile.id,
        publishId,
      },
    })

    // Revalidate page
    revalidatePath(`/blogs`)
  } catch (error) {
    console.error(error)
  }
}
