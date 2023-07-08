import React, { useEffect } from "react"
import Link from "next/link"

import ManageFollow from "@/app/(watch)/watch/[id]/ManageFollow"
import Avatar from "@/components/Avatar"
import VideoPlayer from "@/components/VideoPlayer"
import ActionsForCarousel from "./ActionsForCarousel"
import { calculateTimeElapsed, getPostExcerpt } from "@/lib/client"
import { useExpandContent } from "@/hooks/useExpandContent"
import { useCountView } from "@/hooks/useCountView"
import type { Publish } from "@/graphql/codegen/graphql"

interface Props {
  isSelected?: boolean
  isPrevious?: boolean
  isAuthenticated: boolean
  publish: Publish
  handleStartTip: () => void
  onStartShare: () => void
  handleSavePublish: () => Promise<void>
  openReportModal: () => void
  openCommentsModal: () => void
}

export default function MobileViewItem({
  isSelected,
  isAuthenticated,
  publish,
  handleStartTip,
  onStartShare,
  handleSavePublish,
  openReportModal,
  openCommentsModal,
}: Props) {
  const playback = publish.playback
  const duration = publish.playback?.duration || 0
  const description = publish.description || ""

  const initialDisplayed = 60
  const { displayedContent, expandContent, shrinkContent } = useExpandContent(
    description,
    initialDisplayed
  ) // For displaying description
  const { videoContainerRef, onReady } = useCountView(publish.id, duration)

  // Set video el style to cover
  useEffect(() => {
    const els = document?.getElementsByTagName("video")
    if (els.length > 0) {
      for (let i = 0; i < els.length; i++) {
        els[i].style.objectFit = "cover"
      }
    }
  }, [])

  if (!playback) return null

  return (
    <div
      id={publish.id}
      className="relative w-full h-[100vh] flex items-center justify-center"
    >
      <div className="relative w-full h-full bg-black">
        <div
          ref={videoContainerRef}
          id="short-mobile-player"
          className="w-full h-full"
        >
          <VideoPlayer
            playback={playback}
            playing={isSelected}
            loop={isSelected}
            onReady={onReady}
          />
        </div>

        <div className="absolute left-0 right-20 top-20 py-1 px-2 overflow-y-auto">
          <div className="text-left max-h-[50vh]">
            <h6 className="text-base sm:text-lg text-white">
              {getPostExcerpt(publish.title || "", 40)}
            </h6>
            {publish.tags && publish.tags.split(" ").length > 0 && (
              <div className="mt-1 flex items-center gap-x-4">
                {publish.tags.split(" ").map((tag) => (
                  <Link key={tag} href={`/tag/${tag}`}>
                    <div className="text-textExtraLight px-2 py-1 rounded-full cursor-pointer hover:bg-neutral-100">
                      #{tag}
                    </div>
                  </Link>
                ))}
              </div>
            )}
            <div className="mt-1 flex items-center gap-x-4 font-thin italic text-xs text-white">
              <p>
                {publish.views || 0} view{publish.views === 1 ? "" : "s"}
              </p>
              <p>{calculateTimeElapsed(publish.createdAt)}</p>
            </div>
            <p className="font-light text-white">
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

        <div className="absolute top-0 sm:top-1 md:top-0 bottom-0 sm:bottom-auto md:bottom-0 right-0 md:right-3 sm:left-0 md:left-auto flex flex-col sm:flex-row md:flex-col items-center justify-center sm:items-stretch md:items-center gap-y-5">
          <div className="relative w-full flex flex-col items-center justify-center sm:justify-start md:justify-center">
            <Avatar profile={publish.creator} />
            <div className="absolute -bottom-[15px] sm:bottom-1 w-full py-1">
              <ManageFollow
                isAuthenticated={isAuthenticated}
                follow={publish.creator}
                ownerHref={""}
                ownerLinkText=""
                useIconStyle
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col items-center sm:items-start md:items-center justify-center gap-y-5 sm:gap-y-0 sm:gap-x-5 md:gap-y-5 md:gap-x-0 w-[80px] sm:w-auto md:w-[80px]">
            <ActionsForCarousel
              isAuthenticated={isAuthenticated}
              publish={publish}
              handleStartTip={handleStartTip}
              onStartShare={onStartShare}
              handleSavePublish={handleSavePublish}
              openReportModal={openReportModal}
              commentAction={openCommentsModal}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
