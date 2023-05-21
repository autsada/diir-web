import Videos from "./Videos"
import { getAllVideos } from "@/graphql"
import type { Publish } from "@/graphql/types"

export default async function Home() {
  let allVideos = (await getAllVideos()) as Publish[]

  if (allVideos.length === 0)
    return (
      <div className="w-full py-10 text-center">
        <h6>No videos found</h6>
      </div>
    )

  return (
    <main>
      <Videos allVideos={allVideos} />
    </main>
  )
}
