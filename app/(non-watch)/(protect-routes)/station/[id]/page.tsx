import React, { Suspense } from "react"
import { redirect } from "next/navigation"

import StationTemplate from "./StationTemplate"
import ContentItems from "@/app/(non-watch)/(station)/[station]/ContentItems"
import { getAccount } from "@/lib/server"
import {
  fetchMyPlaylists,
  fetchStationPublishes,
  getStationById,
} from "@/graphql"

export default async function Station({
  params,
}: {
  params: { id: string }
  children: React.ReactNode
}) {
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

  const station = await getStationById(params.id, account?.defaultStation?.id)
  if (!station) {
    redirect("/station")
  }

  const publishesResult = await fetchStationPublishes({
    creatorId: station.id,
    requestorId: station.id,
    orderBy: "latest",
    cursor: null,
    kind: "all",
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

  return (
    <>
      <StationTemplate isAuthenticated={!!account} station={station} />

      <div className="mt-2">
        {!publishesResult || publishesResult.pageInfo?.count === 0 ? (
          <h6 className="text-textLight text-center">No content found</h6>
        ) : (
          <Suspense fallback={<p className="px-2">Loading...</p>}>
            <ContentItems
              creatorName={station.name}
              creatorId={station.id}
              isAuthenticated={!!account}
              profile={station}
              itemsResult={publishesResult}
              playlistsResult={playlistsResult}
              tab="all"
            />
          </Suspense>
        )}
      </div>
    </>
  )
}
