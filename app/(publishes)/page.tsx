import Videos from "./Videos"
import { getAccount } from "@/lib/server"
import {
  fetchAllVideos,
  fetchMyPlaylists,
  fetchShorts,
  getStationById,
} from "@/graphql"

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

  // Fetch videos
  const videosResult = await fetchAllVideos({ requestorId: station?.id })

  // Fetch short videos
  const shortsResult = await fetchShorts({
    cursor: null,
    requestorId: station?.id,
  })

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

  return (
    <div className="mt-[40px] py-2 sm:px-4 sm:ml-[100px]">
      <Videos
        profile={station || undefined}
        isAuthenticated={!!account}
        videosResult={videosResult}
        shortsResult={shortsResult}
        playlistsResult={playlistsResult || undefined}
      />
    </div>
  )
}
