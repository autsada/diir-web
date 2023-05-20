import React, { Suspense } from "react"
import { redirect } from "next/navigation"

import VideoPlayer from "@/components/VideoPlayer"
import ButtonLoader from "@/components/ButtonLoader"
import { getAccount } from "@/lib/server"
import { getStationById, getWatchingPublish } from "@/graphql"
import type { Publish, Station } from "@/graphql/types"
import { calculateTimeElapsed, formatDate, getPostExcerpt } from "@/lib/client"
import Reactions from "./Reactions"
import Description from "./Description"
import Avatar from "@/components/Avatar"

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
  const isOwner = station && publish && station.id === publish.creatorId

  if (!publish) {
    redirect("/")
  }

  console.log("is owner -->", isOwner)
  return (
    <div className="w-full overflow-y-hidden">
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

      <div className="w-full grid grid-cols-1 sm:grid-cols-5 gap-y-2 sm:gap-x-1 py-2 overflow-x-hidden">
        <div className="w-full col-span-3 px-2 sm:px-8">
          <h6 className="sm:text-2xl">{publish.title}</h6>

          <Description
            createdAt={publish.createdAt}
            description={publish.description}
          />

          <div className="my-2 flex items-start justify-between h-[50px] gap-x-4">
            <Avatar profile={publish.creator} />

            <div className="flex-grow h-full">
              <h6 className="text-base">
                {publish.creator?.displayName}{" "}
                <span className="ml-2 font-thin text-sm">
                  <span className="font-normal">
                    {publish.creator?.followersCount || 0}
                  </span>{" "}
                  Followers
                </span>
              </h6>
              <p className="text-sm text-textLight">@{publish.creator?.name}</p>
            </div>
            <div className="h-full flex items-center justify-center">
              {isOwner ? (
                <button className="btn-orange w-[120px] rounded-full">
                  Edit publish
                </button>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-x-4 font-thin text-sm">
            <p>{publish.views || 0} views</p>
            <p>{calculateTimeElapsed(publish.createdAt)}</p>
          </div>

          <div className="py-4 w-full overflow-x-auto scrollbar-hide">
            <div className="w-max flex items-center gap-x-2">
              <Reactions />
            </div>
          </div>
        </div>

        <div className="w-full col-span-2 px-2 sm:px-8">Recommendations</div>
      </div>
    </div>
  )
}
