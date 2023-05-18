import React, { Suspense } from "react"
import { redirect } from "next/navigation"

import VideoPlayer from "@/components/VideoPlayer"
import ButtonLoader from "@/components/ButtonLoader"
import { getAccount } from "@/lib/server"
import { getStationById, getWatchingPublish } from "@/graphql"
import type { Publish, Station } from "@/graphql/types"

export default async function Watch({ params }: { params: { id: string } }) {
  const data = await getAccount()
  const account = data?.account

  // Query station by id
  const station = account
    ? ((await getStationById(account?.defaultStation?.id)) as Station)
    : null

  // Query a publish
  const publish = (await getWatchingPublish({
    targetId: params.id,
    requestorId: station ? station.id : null,
  })) as Publish

  if (!publish) {
    redirect("/")
  }

  console.log("pub -->", publish)
  return (
    <div>
      <div className="w-full h-[240px] sm:h-[320px] md:h-[400px] lg:h-[480px] bg-black text-white">
        <div className="mx-auto w-full h-full lg:w-[65%]">
          {!publish.playback ? (
            <div className="w-full h-full flex items-center justify-center">
              <ButtonLoader loading />
            </div>
          ) : (
            <div className="w-full h-full">
              <Suspense fallback={<ButtonLoader loading />}>
                <VideoPlayer playback={publish.playback} autoPlay={true} />
              </Suspense>
            </div>
          )}
        </div>
      </div>
      <div className="h-[50%]">Body</div>
    </div>
  )
}
