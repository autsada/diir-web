import PublishItem from "./PublishItem"
import { getAllVideos } from "@/graphql"
import type { Publish } from "@/graphql/types"
import Publishes from "./Publishes"

export default async function Home() {
  const publishes = (await getAllVideos()) as Publish[]

  if (publishes.length === 0)
    return (
      <div className="w-full py-10 text-center">
        <h6>No publishes found</h6>
      </div>
    )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 sm:gap-y-6 sm:gap-x-6 py-1 pb-20 sm:p-5 bg-white divide-y-[4px] sm:divide-y-0 divide-neutral-200">
      <Publishes publishes={publishes} />
    </div>
  )
}
