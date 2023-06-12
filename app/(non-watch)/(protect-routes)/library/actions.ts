"use server"

import { revalidatePath } from "next/cache"

import {
  updatePlaylistName,
  deletePlaylist,
  updatePlaylistDescription,
} from "@/graphql"
import { getAccount } from "@/lib/server"

export async function updatePLName(playlistId: string, name: string) {
  try {
    const data = await getAccount()
    const account = data?.account
    const idToken = data?.idToken
    const signature = data?.signature
    if (!account || !account?.defaultStation || !idToken)
      throw new Error("Please sign in to proceed.")

    if (!playlistId || !name) throw new Error("Bad input")

    await updatePlaylistName({
      idToken,
      signature,
      data: {
        accountId: account.id,
        owner: account.owner,
        stationId: account.defaultStation?.id,
        playlistId,
        name,
      },
    })

    // Revalidate page
    revalidatePath(`/library`)
    revalidatePath(`/library/[id]`)
  } catch (error) {
    console.error(error)
  }
}

export async function updatePLDescription(
  playlistId: string,
  description: string
) {
  try {
    const data = await getAccount()
    const account = data?.account
    const idToken = data?.idToken
    const signature = data?.signature
    if (!account || !account?.defaultStation || !idToken)
      throw new Error("Please sign in to proceed.")

    if (!playlistId || !description) throw new Error("Bad input")

    await updatePlaylistDescription({
      idToken,
      signature,
      data: {
        accountId: account.id,
        owner: account.owner,
        stationId: account.defaultStation?.id,
        playlistId,
        description,
      },
    })

    // Revalidate page
    revalidatePath(`/library`)
    revalidatePath(`/library/[id]`)
  } catch (error) {
    console.error(error)
  }
}

export async function deletePL(playlistId: string) {
  try {
    const data = await getAccount()
    const account = data?.account
    const idToken = data?.idToken
    const signature = data?.signature
    if (!account || !account?.defaultStation || !idToken)
      throw new Error("Please sign in to proceed.")

    if (!playlistId) throw new Error("Bad input")

    await deletePlaylist({
      idToken,
      signature,
      data: {
        accountId: account.id,
        owner: account.owner,
        stationId: account.defaultStation?.id,
        playlistId,
      },
    })

    // Revalidate watch later page
    revalidatePath(`/library`)
  } catch (error) {
    console.error(error)
  }
}
