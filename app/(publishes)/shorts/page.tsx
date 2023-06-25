import Shorts from "./Shorts"
import { fetchMyPlaylists, fetchShorts, getStationById } from "@/graphql"
import { getAccount } from "@/lib/server"

type Props = {
  searchParams: { id?: string }
}

export default async function Page({ searchParams }: Props) {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken
  const signature = data?.signature

  // Query station by id
  const station =
    !account || !idToken || !account.defaultStation
      ? undefined
      : await getStationById(account?.defaultStation?.id)

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
    <div className="sm:ml-[100px]">
      <Shorts
        isAuthenticated={!!account}
        profile={station}
        fetchResult={shortsResult}
        playlistsResult={playlistsResult}
        initialId={searchParams.id}
      />
    </div>
  )
}
