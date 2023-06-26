import React, { useEffect, useRef } from "react"

import VideoPlayer from "@/components/VideoPlayer"
import StationName from "@/components/StationName"
import ManageFollow from "@/app/(watch)/watch/[id]/ManageFollow"
import Avatar from "@/components/Avatar"
import Description from "@/app/(watch)/watch/[id]/Description"
import ActionsForCarousel from "./ActionsForCarousel"
import Comments from "@/app/(watch)/watch/[id]/Comments"
import { getPostExcerpt, calculateTimeElapsed } from "@/lib/client"
import type {
  Maybe,
  Publish,
  Station,
  FetchCommentsResponse,
} from "@/graphql/codegen/graphql"
import type { CommentsOrderBy } from "@/graphql/types"

interface Props {
  isSelected?: boolean
  isPrevious?: boolean
  isAuthenticated: boolean
  profile: Maybe<Station> | undefined
  publish: Publish
  onPrev: () => void
  onNext: () => void
  handleStartTip: () => void
  onStartShare: () => Promise<void>
  handleSavePublish: () => Promise<void>
  openReportModal: () => void
  commentsResult: Maybe<FetchCommentsResponse> | undefined
  reloadComments?: (
    publishId: string,
    orderBy?: CommentsOrderBy
  ) => Promise<void>
}

export default function ViewItem({
  isSelected,
  isAuthenticated,
  profile,
  publish,
  onPrev,
  onNext,
  handleStartTip,
  onStartShare,
  handleSavePublish,
  openReportModal,
  commentsResult,
  reloadComments,
}: Props) {
  const playback = publish.playback

  const containerRef = useRef<HTMLDivElement>(null)

  // Register wheel event
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!containerRef?.current) return

    const container = containerRef.current
    let isScrolling = false
    let timeoutId: NodeJS.Timer | undefined = undefined

    function onScroll(e: WheelEvent) {
      if (!isScrolling) {
        if (e.deltaY < 0) {
          onPrev()
        } else if (e.deltaY > 0) {
          onNext()
        }

        isScrolling = true
      }

      // Clear the timeout on each scroll event
      if (timeoutId) clearTimeout(timeoutId)

      // Set a timeout to detect scroll end
      const id = setTimeout(() => {
        isScrolling = false
      }, 200)
      timeoutId = id
    }

    container.addEventListener("wheel", onScroll)

    return () => {
      container.removeEventListener("wheel", onScroll)
    }
  }, [onPrev, onNext])

  if (!playback) return null

  return (
    <div id={publish.id} className="relative w-full h-[100vh] flex">
      <div
        ref={containerRef}
        className="w-[500px] min-w-[500px] md:w-[600px] md:min-w-[600px] lg:w-[700px] lg:min-w-[700px] xl:w-[800px] xl:min-w-[800px] h-full bg-black"
      >
        <VideoPlayer
          playback={playback}
          playing={isSelected}
          loop={isSelected}
        />
      </div>

      <div className="flex-grow h-full bg-white px-5 py-10 text-left border-b border-neutral-400">
        <div className="flex items-start gap-x-4">
          <Avatar profile={publish.creator} />
          <div className="relative flex-grow h-full">
            <StationName profile={publish.creator} />
            <p className="text-sm">
              {publish.creator?.followersCount || 0}{" "}
              <span className="text-textExtraLight">Followers</span>
            </p>
          </div>
          <ManageFollow
            isAuthenticated={isAuthenticated}
            follow={publish.creator}
            ownerHref={`/upload/${publish.id}`}
            ownerLinkText="Edit"
          />
        </div>
        <h6 className="mt-4">{getPostExcerpt(publish.title || "", 60)}</h6>
        <Description
          createdAt={publish.createdAt}
          description={publish.description}
          showLen={60}
        />
        <div className="mt-2 flex items-center gap-x-4 font-thin text-sm">
          <p>
            {publish.views || 0} view{publish.views === 1 ? "" : "s"}
          </p>
          <p>{calculateTimeElapsed(publish.createdAt)}</p>
        </div>
        <div className="my-5 flex items-center gap-x-4">
          <ActionsForCarousel
            isAuthenticated={isAuthenticated}
            publish={publish}
            handleStartTip={handleStartTip}
            onStartShare={onStartShare}
            handleSavePublish={handleSavePublish}
            openReportModal={openReportModal}
            commentAction={() => {}}
            withCommentIcon={false}
            withLikeDescription={true}
            likeVerticalLayout={false}
          />
        </div>

        <div className="h-full overflow-y-auto pb-52 border-t border-neutral-200">
          <Comments
            isAuthenticated={isAuthenticated}
            publish={publish}
            profile={profile}
            commentsResult={commentsResult}
            reloadComments={reloadComments}
          />
        </div>
      </div>
    </div>
  )
}
