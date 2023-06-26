import Shorts from "./Shorts"
import {
  fetchMyPlaylists,
  fetchShorts,
  getShort,
  getStationById,
} from "@/graphql"
import { Maybe, Publish } from "@/graphql/codegen/graphql"
import { getAccount } from "@/lib/server"
import { notFound, redirect } from "next/navigation"

type Props = {
  searchParams: { id?: string }
}

export default async function Page({ searchParams }: Props) {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken
  const signature = data?.signature

  const publishId = searchParams.id

  let short: Maybe<Publish> | undefined = undefined
  if (publishId) {
    short = await getShort({
      publishId,
    })
  }

  if (typeof publishId === "string" && !publishId) {
    // For the case that user enter "/shorts?id="
    redirect("/shorts")
  }

  if (publishId && !short) {
    notFound()
  }

  if (short && short.kind !== "Short") {
    redirect(`/watch/${short.id}`)
  }

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
