import Videos from "./Videos"
import { getAccount } from "@/lib/server"
import { getAllVideos, getStationById } from "@/graphql"
import type { Publish, Station } from "@/graphql/types"

export default async function Home() {
  const data = await getAccount()
  const account = data?.account

  // Query station by id
  const station =
    !account || !account.defaultStation
      ? undefined
      : ((await getStationById(account?.defaultStation?.id)) as Station)

  let allVideos = (await getAllVideos()) as Publish[]

  if (allVideos.length === 0)
    return (
      <div className="w-full py-10 text-center">
        <h6>No videos found</h6>
      </div>
    )

  return (
    <main>
      <Videos
        allVideos={allVideos}
        profile={station}
        isAuthenticated={!!account}
      />
    </main>
  )
}
