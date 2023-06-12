import React, { Suspense } from "react"
import { redirect } from "next/navigation"

import Poster from "../VL/Poster"
import PlaylistName from "../VL/PlaylistName"
import ContentItems from "./Contentitems"
import { getAccount } from "@/lib/server"
import { fetchMyPlaylists, fetchPlaylistItems, getStationById } from "@/graphql"

export default async function Playlist({
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

  // Query station by id
  const station = await getStationById(account?.defaultStation?.id)

  if (!station) {
    redirect("/station")
  }

  const playlistId = params.id
  // Fetch content of the playlist
  const itemsResult = await fetchPlaylistItems({
    idToken: idToken!,
    signature,
    data: {
      accountId: account!.id,
      stationId: station.id,
      owner: account!.owner,
      playlistId,
      cursor: null,
      orderBy: "newest",
    },
  })

  if (!itemsResult) {
    redirect("/library")
  }

  const firstItem = itemsResult?.edges[0]?.node

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
      {!itemsResult || itemsResult.edges?.length === 0 ? (
        <div className="py-6 px-4">
          <PlaylistName
            playlistId={playlistId}
            isAuthenticated={!!account}
            name={itemsResult?.playlistName || ""}
            description={itemsResult?.playlistDescription || ""}
            itemsCount={itemsResult?.pageInfo.count || 0}
            isFullWidth={false}
          />
        </div>
      ) : (
        <>
          <div className="md:fixed md:z-20 md:left-[100px] md:top-[70px] md:bottom-0 sm:py-5">
            {firstItem && (
              <Poster
                playlistId={playlistId}
                isAuthenticated={!!account}
                publish={firstItem.publish}
                totalItems={itemsResult.pageInfo?.count || 0}
                playlistName={itemsResult.playlistName}
                playlistDescription={itemsResult?.playlistDescription || ""}
              />
            )}
          </div>
          <div className="ml-0 md:ml-[300px] lg:ml-[400px] mt-5 md:mt-0 sm:py-5 pb-20 sm:pb-0">
            <Suspense fallback={<p className="px-2">Loading...</p>}>
              <ContentItems
                isAuthenticated={!!account}
                profile={station}
                playlistId={playlistId}
                playlistName={itemsResult.playlistName}
                itemsResult={itemsResult}
                playlistsResult={playlistsResult}
              />
            </Suspense>
          </div>
        </>
      )}
    </div>
  )
}
