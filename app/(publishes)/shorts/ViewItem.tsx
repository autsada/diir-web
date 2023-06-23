import React, { useCallback, useEffect, useRef, useState } from "react"
import { isMobile } from "react-device-detect"

import ManageFollow from "@/app/(watch)/watch/[id]/ManageFollow"
import Avatar from "@/components/Avatar"
import VideoPlayer from "@/components/VideoPlayer"
import Actions from "./Actions"
import { getPostExcerpt } from "@/lib/client"
import { useExpandContent } from "@/hooks/useExpandContent"
import type {
  CheckPublishPlaylistsResponse,
  FetchPlaylistsResponse,
  Maybe,
  Publish,
  Station,
} from "@/graphql/codegen/graphql"

interface Props {
  isAuthenticated: boolean
  profile: Maybe<Station> | undefined
  publish: Publish
  playlistsResult: Maybe<FetchPlaylistsResponse> | undefined
  isSelected?: boolean
  isPrevious?: boolean
}

export default function ViewItem({
  isAuthenticated,
  profile,
  publish,
  playlistsResult,
  isSelected,
}: Props) {
  const playback = publish.playback
  const description = publish.description || ""

  const [publishPlaylistsData, setPublishPlaylistsData] =
    useState<CheckPublishPlaylistsResponse>()
  const initialDisplayed = 200
  const { displayedContent, expandContent, shrinkContent } = useExpandContent(
    description,
    initialDisplayed
  ) // For displaying description

  const containerRef = useRef<HTMLDivElement>(null)

  // Set video el style to cover
  useEffect(() => {
    const els = document?.getElementsByTagName("video")
    if (els.length > 0) {
      for (let i = 0; i < els.length; i++) {
        els[i].style.objectFit = isMobile ? "cover" : "contain"
      }
    }
  }, [])

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

  if (!playback) return null

  return (
    <div
      id={publish.id}
      ref={containerRef}
      className="w-full h-[100vh] flex items-center justify-center"
    >
      <div className="lg:hidden relative w-full h-full bg-black">
        <VideoPlayer
          playback={playback}
          playing={isSelected}
          loop={isSelected}
        />

        <div className="absolute left-0 right-20 top-20 py-1 px-2 overflow-y-auto">
          <div className="text-left h-max max-h-[50%]">
            <h6 className="text-base sm:text-lg text-white">
              {getPostExcerpt(publish.title || "", 40)}
            </h6>
            <p className="font-light sm:text-base text-white">
              {displayedContent}{" "}
              {description.length > displayedContent.length && (
                <span
                  className="ml-1 text-sm font-semibold cursor-pointer"
                  onClick={expandContent}
                >
                  Show more
                </span>
              )}
            </p>
            {description.length > initialDisplayed &&
              description.length === displayedContent.length && (
                <p
                  className="mt-2 font-semibold text-sm text-white  cursor-pointer"
                  onClick={shrinkContent}
                >
                  Show less
                </p>
              )}
          </div>
        </div>

        <div className="absolute top-0 bottom-0 sm:bottom-auto md:bottom-0 right-0 md:right-3 sm:left-0 md:left-auto flex flex-col sm:flex-row md:flex-col items-center justify-center gap-y-5">
          <div className="relative w-full flex flex-col items-center justify-center">
            <Avatar profile={publish.creator} />
            <div className="absolute -bottom-[15px] w-full py-1">
              <ManageFollow
                isAuthenticated={isAuthenticated}
                follow={publish.creator}
                ownerHref={""}
                ownerLinkText=""
                useIconStyle
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col items-center justify-center gap-y-5 sm:gap-y-0 sm:gap-x-5 md:gap-y-5 md:gap-x-0 w-[80px] sm:w-auto md:w-[80px]">
            <Actions
              isAuthenticated={isAuthenticated}
              publish={publish}
              playlistsResult={playlistsResult}
              publishPlaylistsData={publishPlaylistsData}
              commentAction={() => {}}
              likeBtnVerticalLayout
              likeDescriptionColor="text-white"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
