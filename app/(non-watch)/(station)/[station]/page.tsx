import React, { Suspense } from "react"
import { notFound } from "next/navigation"

import ContentItems from "./ContentItems"
import { getAccount } from "@/lib/server"
import {
  getStationByName,
  fetchStationPublishes,
  fetchMyPlaylists,
} from "@/graphql"

export default async function Page({
  params,
}: {
  params: { station: string; tab: string }
}) {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken
  const signature = data?.signature
  const name = params.station?.replace("%40", "")

  // Query station by name
  const creator = await getStationByName(name, account?.defaultStation?.id)

  if (!creator) {
    notFound()
  }

  // Query publishes that uploaded by the station
  const requestor =
    !account || !account.defaultStation ? undefined : account.defaultStation
  const publishesResult = await fetchStationPublishes({
    creatorId: creator.id,
    requestorId: requestor?.id,
    orderBy: "latest",
    cursor: null,
    kind: "all",
  })

  // Fetch user's playlists if user is authenticated
  const playlistsResult = !requestor
    ? undefined
    : await fetchMyPlaylists({
        idToken: idToken!,
        signature,
        data: {
          accountId: account!.id,
          stationId: requestor?.id,
          owner: account!.owner,
          cursor: null,
        },
      })

  return (
    <>
      <div className="mt-2">
        {!publishesResult || publishesResult.pageInfo?.count === 0 ? (
          <h6 className="text-textLight text-center">No content found</h6>
        ) : (
          <Suspense fallback={<p className="px-2">Loading...</p>}>
            <ContentItems
              creatorName={name}
              creatorId={creator.id}
              isAuthenticated={!!account}
              profile={requestor}
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
