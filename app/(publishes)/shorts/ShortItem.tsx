import React, { useCallback, useState, useEffect } from "react"
import Link from "next/link"

import Avatar from "@/components/Avatar"
import StationName from "@/components/StationName"
import ManageFollow from "@/app/(watch)/watch/[id]/ManageFollow"
import VideoPlayer from "@/components/VideoPlayer"
import Actions from "./Actions"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"
import {
  calculateTimeElapsed,
  getPostExcerpt,
  secondsToHourFormat,
} from "@/lib/client"
import type {
  Maybe,
  CheckPublishPlaylistsResponse,
  FetchPlaylistsResponse,
  Publish,
  Station,
} from "@/graphql/codegen/graphql"

interface Props {
  isAuthenticated: boolean
  profile: Maybe<Station> | undefined
  publish: Publish
  playlistsResult: Maybe<FetchPlaylistsResponse> | undefined
}

export default function ShortItem({
  publish,
  isAuthenticated,
  profile,
  playlistsResult,
}: Props) {
  const thumbnail =
    publish?.thumbSource === "custom" && publish?.thumbnail
      ? publish?.thumbnail
      : publish?.playback?.thumbnail
  const [playing, setPlaying] = useState(false)
  const [publishPlaylistsData, setPublishPlaylistsData] =
    useState<CheckPublishPlaylistsResponse>()

  // Set video el style to contain
  useEffect(() => {
    const container = document?.getElementById(
      `short-item-player-${publish.id}`
    )
    if (container) {
      const nodes = container.children
      if (nodes[0]) {
        const divs = nodes[0].children
        const video = divs[0] as HTMLVideoElement
        if (video) {
          video.style.objectFit = "cover"
        }
      }
    }
  }, [publish?.id])

  const onEntering = useCallback(() => {
    setPlaying(true)
  }, [])

  const onLeaving = useCallback(() => {
    setPlaying(false)
  }, [])
  const { observedRef } = useInfiniteScroll(1, onEntering, onLeaving)

  const fetchPublishPlaylistData = useCallback(async () => {
    try {
      if (!publish || !isAuthenticated || !profile) return

      // Call the api route to check if the publish already add to any user's playlists
      const res = await fetch(`/library/playlists/publish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publishId: publish.id }),
      })
      const data = (await res.json()) as {
        result: CheckPublishPlaylistsResponse
      }
      setPublishPlaylistsData(data.result)
    } catch (error) {
      console.error(error)
    }
  }, [publish, isAuthenticated, profile, setPublishPlaylistsData])
  // Fetch publish playlist data
  useEffect(() => {
    fetchPublishPlaylistData()
  }, [fetchPublishPlaylistData])

  if (!publish) return null

  return (
    <div
      ref={observedRef}
      className="w-full sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] md:max-w-[340px] lg:max-w-[360px] xl:max-w-[380px] py-1 px-2"
    >
      <div className="flex items-start gap-x-2">
        <Avatar profile={publish.creator} />
        <div className="flex-grow text-left">
          <Link href={`/shorts?id=${publish.id}`}>
            <h6 className="text-base sm:text-lg">
              {getPostExcerpt(publish.title || "", 30)}
            </h6>
          </Link>
          <StationName profile={publish.creator} />
        </div>
        <ManageFollow
          isAuthenticated={isAuthenticated}
          follow={publish.creator}
          ownerHref={`/upload/${publish.id}`}
          ownerLinkText="Edit"
        />
      </div>
      <div className="w-full my-1 flex justify-center gap-x-2">
        <div className="w-full">
          <div className="flex items-center gap-x-4 px-2">
            <p className="font-light text-textLight text-sm sm:text-base">
              {publish.views || 0} view{publish.views === 1 ? "" : "s"}
            </p>
            <p className="font-light text-textLight text-sm sm:text-base">
              {calculateTimeElapsed(publish.createdAt)}
            </p>
          </div>
          <div className="relative h-[430px] sm:h-[400px] rounded-xl overflow-hidden bg-black">
            <div className="absolute top-0 w-full py-1 px-2">
              <h6 className="text-base sm:text-lg text-white">
                {getPostExcerpt(publish.title || "", 40)}
              </h6>
            </div>
            <Link href={`/shorts?id=${publish.id}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnail || ""}
                alt={publish.title || ""}
                className={`${
                  playing || !thumbnail ? "hidden" : "block"
                } w-full h-full object-cover`}
              />
              <div
                id={`short-item-player-${publish.id}`}
                className={`${
                  !playing && thumbnail ? "hidden" : "block"
                } w-full h-full`}
              >
                <VideoPlayer
                  playback={publish.playback || undefined}
                  controls={playing}
                  playing={playing}
                  loop={playing}
                  thumbnail={publish.kind === "Short" ? undefined : thumbnail}
                  playIcon={<></>}
                />
              </div>
              {publish.playback && (
                <div className="absolute bottom-2 right-2 px-[2px] rounded-sm bg-white font-thin text-xs flex items-center justify-center">
                  {secondsToHourFormat(publish.playback?.duration)}
                </div>
              )}
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-end gap-y-2 w-[90px] sm:w-[80px] pb-5">
          <Actions
            isAuthenticated={isAuthenticated}
            publish={publish}
            playlistsResult={playlistsResult}
            publishPlaylistsData={publishPlaylistsData}
            likeBtnVerticalLayout
          />
        </div>
      </div>
    </div>
  )
}
