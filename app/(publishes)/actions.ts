"use server"

import {
  addToWatchLater,
  removeWatchLater,
  addToNewPlaylist,
  updatePlaylists,
} from "@/graphql"
import { getAccount } from "@/lib/server"
import { revalidatePath } from "next/cache"
import _ from "lodash"
import type { Maybe } from "graphql/jsutils/Maybe"
import type { Playlist } from "@/graphql/codegen/graphql"

/**
 * Create a new playlist and add a publish to it
 */
export async function createNewPlaylist(formData: FormData) {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken
  const signature = data?.signature
  if (!account || !account?.defaultStation || !idToken)
    throw new Error("Please sign in to proceed.")

  const name = formData.get("name") as string
  const publishId = formData.get("publish") as string
  if (
    !name ||
    typeof name !== "string" ||
    !publishId ||
    typeof publishId !== "string"
  )
    throw new Error("Bad input")

  // Create a new playlist and add the publish to it
  await addToNewPlaylist({
    idToken,
    signature,
    data: {
      accountId: account.id,
      owner: account.owner,
      stationId: account.defaultStation?.id,
      name,
      publishId,
    },
  })

  // Revalidate library page
  revalidatePath(`/`)
}

export async function saveToWatchLater(publishId: string) {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken
  const signature = data?.signature
  if (!account || !account?.defaultStation || !idToken)
    throw new Error("Please sign in to proceed.")

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

  // Revalidate watch later page
  revalidatePath(`/library/WL`)
}

export async function saveToPlaylist(formData: FormData) {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken
  const signature = data?.signature
  if (!account || !account?.defaultStation || !idToken)
    throw new Error("Please sign in to proceed.")

  const publishId = formData.get("publish") as string
  if (!publishId) throw new Error("Bad input")

  // Get watch later values (old, new)
  const oldWL = formData.get("oldWL") as "on" | "off"
  const newWL = (formData.get("newWL") as "on" | "") || "off"

  if (oldWL !== newWL) {
    // Update watch later
    if (newWL === "on") {
      // Add to watch later
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
    }
    if (newWL === "off") {
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
    }

    // Revalidate watch later page
    revalidatePath(`/library/WL`)
  }

  // Get playlists values (old, new)
  const oldPlaylists = JSON.parse(formData.get("playlists") as string) as {
    isInPlaylist: boolean | undefined
    list: Maybe<Playlist> | undefined
  }[]
  const newPlaylists = oldPlaylists.map((pl) => {
    const checked = formData.get(pl.list?.id || "")

    return {
      isInPlaylist: checked === "on" ? true : false,
      list: pl.list,
    }
  })
  // Check if playlists are changed
  const isPlaylistsEqual = _.isEqual(oldPlaylists, newPlaylists)

  // If the playlists are updated, get the ones that are updated and put them in a new array, so all the items in this array are the playlists to be updated.
  const updatedPlaylists: {
    isInPlaylist: boolean | undefined
    list: Maybe<Playlist> | undefined
  }[] = []
  if (!isPlaylistsEqual) {
    newPlaylists.forEach((pl, index) => {
      if (!_.isEqual(oldPlaylists[index], pl)) {
        updatedPlaylists.push(pl)
      }
    })
  }

  if (updatedPlaylists.length > 0) {
    await updatePlaylists({
      idToken,
      signature,
      data: {
        accountId: account.id,
        owner: account.owner,
        stationId: account.defaultStation?.id,
        publishId,
        playlists: updatedPlaylists.map((pl) => ({
          isInPlaylist: !!pl.isInPlaylist,
          playlistId: pl.list?.id || "",
        })),
      },
    })

    // Revalidate publishes page
    revalidatePath(`/`)
  }
}
