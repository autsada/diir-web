import React, { useCallback, useState, useEffect } from "react"
import Link from "next/link"
import { MdComment, MdOutlineComment } from "react-icons/md"

import Avatar from "@/components/Avatar"
import StationName from "@/components/StationName"
import ManageFollow from "@/app/(watch)/watch/[id]/ManageFollow"
import VideoPlayer from "@/components/VideoPlayer"
import Reactions from "@/app/(watch)/watch/[id]/Reactions"
import Reaction from "@/app/(watch)/watch/[id]/Reaction"
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

export default function ShortItem1({
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
      className="w-full sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] md:max-w-[340px] lg:max-w-[360px] xl:max-w-[380px] py-1 px-2 grid grid-cols-4 gap-x-2"
    >
      <div className="col-span-4 flex items-start gap-x-2">
        <Avatar profile={publish.creator} />
        <div className="flex-grow text-left">
          <Link href={`/shorts/${publish.id}`}>
            <h6 className="text-base sm:text-lg">
              {getPostExcerpt(publish.title || "", 30)}
            </h6>
          </Link>
          <StationName profile={publish.creator} />
        </div>
        <ManageFollow
          isAuthenticated={isAuthenticated}
          follow={publish.creator}
          ownerHref={`/publishes/${publish.id}`}
          ownerLinkText="Edit"
        />
      </div>
      <div className="col-span-3">
        <Link href={`/shorts/${publish.id}`}>
          <div className="relative h-[420px] sm:h-[400px] rounded-xl overflow-hidden bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnail || ""}
              alt={publish.title || ""}
              className={`${
                playing || !thumbnail ? "hidden" : "block"
              } w-full h-full object-cover`}
            />
            <div
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
          </div>
        </Link>
      </div>
      <div className="col-span-1 flex flex-col items-start justify-end">
        <div>
          {publish.likesCount > 0 && (
            <div className="w-full text-center font-semibold">
              {publish.likesCount}
            </div>
          )}
          <div className="flex flex-col items-start justify-start gap-y-2">
            <Reactions
              publish={publish}
              isAuthenticated={isAuthenticated}
              playlistsResult={playlistsResult || undefined}
              publishPlaylistsData={publishPlaylistsData}
              withReactDescription={false}
            />
          </div>
          <Link href={`/shorts/${publish.id}`}>
            <div className="mt-2 h-[40px] flex items-center rounded-full overflow-hidden divide-x bg-gray-100">
              <Reaction
                IconFill={MdComment}
                IconOutline={MdOutlineComment}
                withDescription={false}
                onClick={() => {}}
              />
            </div>
          </Link>
        </div>
      </div>
      <div className="col-span-4">
        <div className="flex items-center gap-x-4 px-2">
          <p className="font-light text-textLight text-sm sm:text-base">
            {publish.views || 0} view{publish.views === 1 ? "" : "s"}
          </p>
          <p className="font-light text-textLight text-sm sm:text-base">
            {calculateTimeElapsed(publish.createdAt)}
          </p>
        </div>
      </div>
    </div>
  )
}
