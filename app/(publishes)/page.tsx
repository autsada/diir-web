import Videos from "./Videos"
import { getAccount } from "@/lib/server"
import { fetchAllVideos, getStationById } from "@/graphql"

export default async function Home() {
  const data = await getAccount()
  const account = data?.account

  // Query station by id
  const station =
    !account || !account.defaultStation
      ? undefined
      : await getStationById(account?.defaultStation?.id)

  let result = await fetchAllVideos()

  if (!result || result?.edges?.length === 0)
    return (
      <div className="w-full py-10 text-center">
        <h6>No videos found</h6>
      </div>
    )

  return (
    <main>
      <Videos
        fetchResult={result}
        profile={station || undefined}
        isAuthenticated={!!account}
      />
    </main>
  )
}
