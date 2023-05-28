import Videos from "./Videos"
import { getAccount } from "@/lib/server"
import { fetchAllVideos, fetchMyPlaylists, getStationById } from "@/graphql"

export default async function Home() {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken
  const signature = data?.signature

  // Query station by id
  const station =
    !account || !idToken || !account.defaultStation
      ? undefined
      : await getStationById(account?.defaultStation?.id)

  let videosResult = await fetchAllVideos()

  // Fetch user's playlists if user is authenticated
  const playlistsResult = !station
    ? undefined
    : await fetchMyPlaylists({
        idToken: idToken!,
        signature,
        data: {
          accountId: account!.id,
          stationId: station.id,
          owner: account!.owner,
          cursor: null,
        },
      })

  if (!videosResult || videosResult?.edges?.length === 0)
    return (
      <div className="w-full py-10 text-center">
        <h6>No videos found</h6>
      </div>
    )

  return (
    <main>
      <Videos
        profile={station || undefined}
        isAuthenticated={!!account}
        videosResult={videosResult}
        playlistsResult={playlistsResult || undefined}
      />
    </main>
  )
}
