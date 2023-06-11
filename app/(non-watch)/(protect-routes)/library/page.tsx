import React from "react"
import { redirect } from "next/navigation"

import ViewLaterList from "./ViewLaterList"
import Playlists from "./Playlists"
import { getAccount } from "@/lib/server"
import {
  fetchMyPlaylists,
  fetchPreviewPlaylists,
  fetchPreviewWatchLater,
} from "@/graphql"
import type { Publish } from "@/graphql/codegen/graphql"

export const revalidate = 60 // revalidate this page every 60 seconds

export default async function Library() {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken
  const signature = data?.signature

  if (!data || !account || !idToken) {
    redirect("/")
  }

  if (!account?.defaultStation) {
    redirect("/station")
  }

  const station = account.defaultStation

  // Fetch preview watch later.
  const watchLaterResponse = await fetchPreviewWatchLater({
    idToken,
    signature,
    data: {
      accountId: account.id,
      owner: account.owner,
      stationId: account.defaultStation.id,
    },
  })
  const items: Publish[] = []
  if (watchLaterResponse) {
    watchLaterResponse.edges.forEach((edge) => {
      if (edge?.node?.publish) {
        items.push(edge.node.publish)
      }
    })
  }

  // Fetch user's playlists if user is authenticated
  const playlistsResult = await fetchMyPlaylists({
    idToken: idToken!,
    signature,
    data: {
      accountId: account!.id,
      stationId: station.id,
      owner: account!.owner,
      cursor: null,
    },
  })

  // Get preview playlists
  const previewPlaylists = await fetchPreviewPlaylists({
    idToken: idToken!,
    signature,
    data: {
      accountId: account!.id,
      stationId: station.id,
      owner: account!.owner,
      cursor: null,
    },
  })

  return (
    <>
      <div className="px-4 py-2 grid grid-cols-1 divide-y divide-neutral-200">
        <ViewLaterList
          isAuthenticated={!!account}
          profile={station}
          items={items}
          itemsCount={watchLaterResponse?.pageInfo?.count || 0}
          playlistsResult={playlistsResult}
        />
        <Playlists
          isAuthenticated={!!account}
          profile={station}
          itemsCount={playlistsResult?.pageInfo?.count || 0}
          playlistsResult={previewPlaylists}
        />
      </div>
    </>
  )
}
