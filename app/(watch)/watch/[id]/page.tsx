import React, { Suspense } from "react"
import { redirect } from "next/navigation"
import type { Metadata, ResolvingMetadata } from "next"

import VideoPlayer from "@/components/VideoPlayer"
import ButtonLoader from "@/components/ButtonLoader"
import Description from "./Description"
import Avatar from "@/components/Avatar"
import Comments from "./Comments"
import Reactions from "./Reactions"
import StationName from "@/components/StationName"
import { getAccount } from "@/lib/server"
import {
  checkPublishPlaylists,
  fetchComments,
  fetchMyPlaylists,
  getStationById,
  getWatchingPublish,
} from "@/graphql"
import { calculateTimeElapsed } from "@/lib/client"

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  // Query a publish
  const publish = await getWatchingPublish({
    targetId: params.id,
  })

  const imageUrl =
    publish?.thumbSource === "custom" && publish?.thumbnail
      ? publish.thumbnail
      : publish?.playback
      ? publish.playback.thumbnail
      : ""

  return {
    title: publish?.title || "",
    description: publish?.description || "",
    openGraph: {
      title: publish?.title || "",
      description: publish?.description || "",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      title: publish?.title || "",
      description: publish?.description || "",
      card: "summary_large_image",
      site: "@DiiRxyz",
      creator: "@DiiRxyz",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: publish?.title || "",
        },
      ],
    },
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "standard",
        "max-snippet": -1,
      },
    },
  }
}

export default async function Watch({ params }: Props) {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken
  const signature = data?.signature

  // Query station by id
  const station =
    account && account.defaultStation
      ? await getStationById(account?.defaultStation?.id)
      : null

  // Query a publish
  const publish = await getWatchingPublish({
    targetId: params.id,
    requestorId: station ? station.id : null,
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

  // Check if the publish is already added to any user's playlists
  const publishPlaylistsData =
    !idToken || !account || !account.defaultStation
      ? undefined
      : await checkPublishPlaylists({
          idToken: idToken || "",
          signature,
          data: {
            owner: account.owner,
            accountId: account.id,
            stationId: account.defaultStation.id,
            publishId: params.id,
          },
        })

  const commentsResult = await fetchComments({
    requestorId: account?.defaultStation ? account.defaultStation.id : null,
    publishId: params.id,
    cursor: null,
  })

  if (!publish) {
    redirect("/")
  }

  return (
    <div className="w-full overflow-y-hidden">
      <div className="w-full h-[240px] sm:h-[320px] md:h-[400px] lg:h-[480px] bg-black text-white">
        <div className="mx-auto w-full h-full min-h-full lg:w-[65%]">
          {!publish.playback ? (
            <div className="w-full h-full flex items-center justify-center">
              <ButtonLoader loading />
            </div>
          ) : (
            <div className="w-full h-full">
              <Suspense fallback={<ButtonLoader loading />}>
                <VideoPlayer playback={publish.playback} playing={true} />
              </Suspense>
            </div>
          )}
        </div>
      </div>

      <div className="pt-5 pb-10 w-full grid grid-cols-1 sm:grid-cols-5 gap-y-2 sm:gap-x-1 overflow-x-hidden bg-white">
        <div className="w-full sm:col-span-3 px-2 sm:px-8">
          <h6 className="sm:text-2xl">{publish.title}</h6>

          <div className="py-4 w-full overflow-x-auto scrollbar-hide">
            <div className="w-max flex items-center gap-x-2">
              <Reactions
                publish={publish}
                isAuthenticated={!!account}
                playlistsResult={playlistsResult || undefined}
                publishPlaylistsData={publishPlaylistsData}
              />
            </div>
          </div>

          <div className="mb-4 flex items-start justify-between h-[50px] gap-x-4">
            <Avatar profile={publish.creator} />
            <div className="relative flex-grow h-full">
              <StationName profile={publish.creator} />
              <p className="text-sm">
                {publish.creator?.followersCount || 0}{" "}
                <span className="text-textExtraLight">Followers</span>
              </p>
            </div>
            <div className="h-full flex items-center justify-center">
              {publish?.creator?.isOwner ? (
                <button className="btn-orange w-[120px] rounded-full">
                  Edit publish
                </button>
              ) : publish?.creator?.isFollowing ? (
                <button
                  type="button"
                  className="btn-dark mx-0 px-5 rounded-full"
                >
                  Following
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-dark mx-0 px-5 rounded-full"
                >
                  Follow
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-x-4 font-thin text-sm">
            <p>{publish.views || 0} views</p>
            <p>{calculateTimeElapsed(publish.createdAt)}</p>
          </div>

          <Description
            createdAt={publish.createdAt}
            description={publish.description}
          />

          {/* Comments */}
          <Comments
            isAuthenticated={!!account}
            publish={publish}
            profile={station}
            commentsResult={commentsResult}
          />
        </div>

        <div className="w-full sm:col-span-2 px-2 sm:px-8 mt-5 sm:mt-0">
          Recommendations
        </div>
      </div>
    </div>
  )
}
