import React, { Suspense } from "react"
import { redirect } from "next/navigation"

import Poster from "./Poster"
import Items from "./Items"
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
    redirect("/")
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

  const firstItem = watchLaterResult?.edges[0]?.node

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

  return (
    <div className="px-0 sm:px-4">
      {!watchLaterResult || watchLaterResult.edges.length === 0 ? (
        <div className="py-6 px-4">
          <h6 className="text-lg sm:text-xl">View later</h6>
          <p className="mt-1 text-textLight">
            No publishes in this playlist yet.
          </p>
        </div>
      ) : (
        <>
          <div className="md:fixed md:z-20 md:left-[100px] md:top-[70px] md:bottom-0 sm:py-5">
            {firstItem && (
              <Poster
                publish={firstItem.publish}
                totalItems={watchLaterResult.pageInfo?.count || 0}
              />
            )}
          </div>
          <div className="ml-0 md:ml-[300px] lg:ml-[400px] mt-5 md:mt-0 sm:py-5 pb-20 sm:pb-0">
            <Suspense fallback={<p className="px-2">Loading...</p>}>
              <Items
                isAuthenticated={!!account}
                profile={station}
                itemsResult={watchLaterResult}
                playlistsResult={playlistsResult}
              />
            </Suspense>
          </div>
        </>
      )}
    </div>
  )
}
