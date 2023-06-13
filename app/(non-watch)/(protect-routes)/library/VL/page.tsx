import React, { Suspense } from "react"
import { redirect } from "next/navigation"

import ContentItems from "./ContentItems"
import { getAccount } from "@/lib/server"
import { getStationById, fetchWatchLater, fetchMyPlaylists } from "@/graphql"

export default async function WatchLater() {
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

  // Query station by id
  const station = await getStationById(account?.defaultStation?.id)

  if (!station) {
    redirect("/station")
  }

  // Get watch later videos from the database for the first render
  const watchLaterResult = await fetchWatchLater({
    idToken,
    signature,
    data: {
      accountId: account?.id,
      owner: account?.owner,
      stationId: station?.id,
      cursor: null,
    },
  })

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

  console.log("result -->", watchLaterResult)

  return (
    <div className="px-0 sm:px-4">
      {!watchLaterResult ? (
        <p className="px-4">Loading...</p>
      ) : (
        <Suspense fallback={<p className="px-2">Loading...</p>}>
          <ContentItems
            isAuthenticated={!!account}
            profile={station}
            itemsResult={watchLaterResult}
            playlistsResult={playlistsResult}
          />
        </Suspense>
      )}
    </div>
  )
}
