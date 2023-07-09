"use client"

import React, { useState, useCallback } from "react"

import FeedTabs from "./FeedTabs"
import ForYouFeed from "./ForYouFeed"
import LatestFeed from "./LatestFeed"
import PopularFeed from "./PopularFeed"
import SidePanel from "./SidePanel"
import ShareModal from "../ShareModal"
import ReportModal from "../ReportModal"
import type {
  Maybe,
  FetchPublishesResponse,
  Publish,
} from "@/graphql/codegen/graphql"

interface Props {
  isAuthenticated: boolean
  feed?: string
  fetchResult: Maybe<FetchPublishesResponse> | undefined
  latestResult: Maybe<FetchPublishesResponse> | undefined
  popularResult: Maybe<FetchPublishesResponse> | undefined
}

export default function Blogs({
  isAuthenticated,
  feed,
  fetchResult,
  latestResult,
  popularResult,
}: Props) {
  const [targetBlog, setTargetBlog] = useState<Publish>()
  const [shareModalVisible, setShareModalVisible] = useState(false)
  const [reportModalVisible, setReportModalVisible] = useState(false)

  const openShareModal = useCallback((blog: Publish) => {
    setShareModalVisible(true)
    setTargetBlog(blog)
  }, [])

  const closeShareModal = useCallback(() => {
    setShareModalVisible(false)
    setTargetBlog(undefined)
  }, [])

  const openReportModal = useCallback((blog: Publish) => {
    setReportModalVisible(true)
    setTargetBlog(blog)
  }, [])

  const closeReportModal = useCallback(() => {
    setReportModalVisible(false)
    setTargetBlog(undefined)
  }, [])

  const onShareBlog = useCallback(
    async (blog: Publish) => {
      if (typeof window === "undefined" || !blog) return

      const shareData = {
        title: blog.title || "",
        text: blog.title || "",
        url: `https://7015-2405-9800-b961-39d-9594-1174-9b67-5c66.ngrok-free.app/read/${blog.id}`,
      }

      if (navigator.share && navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData)
        } catch (error) {
          console.error(error)
        }
      } else {
        openShareModal(blog)
      }
    },
    [openShareModal]
  )

  return (
    <>
      <div className="w-full pb-40 sm:pb-20">
        <FeedTabs feed={feed} />
        <div className="lg:flex">
          <div
            className={
              !feed
                ? "block lg:w-[60%] lg:min-h-screen lg:pl-2 lg:pr-5 lg:border-r border-neutral-200"
                : "hidden"
            }
          >
            <ForYouFeed
              isAuthenticated={isAuthenticated}
              fetchResult={fetchResult}
              onShareBlog={onShareBlog}
              openReportModal={openReportModal}
            />
          </div>
          <div
            className={
              feed === "latest"
                ? "block lg:w-[60%] lg:min-h-screen lg:pl-2 lg:pr-5 lg:border-r border-neutral-200"
                : "hidden"
            }
          >
            <LatestFeed
              isAuthenticated={isAuthenticated}
              fetchResult={latestResult}
              onShareBlog={onShareBlog}
              openReportModal={openReportModal}
            />
          </div>

          {/* For large device only */}
          <div className="hidden lg:block lg:w-[40%] lg:pl-5 lg:pr-2">
            <SidePanel
              isAuthenticated={isAuthenticated}
              fetchResult={popularResult}
              onShareBlog={onShareBlog}
              openReportModal={openReportModal}
            />
          </div>
        </div>

        {/* For small-medium device view only */}
        <div className={feed === "popular" ? "block lg:hidden" : "hidden"}>
          <PopularFeed
            isAuthenticated={isAuthenticated}
            fetchResult={popularResult}
            onShareBlog={onShareBlog}
            openReportModal={openReportModal}
          />
        </div>
      </div>

      {/* Share modal */}
      {shareModalVisible && targetBlog && (
        <ShareModal
          publishId={targetBlog.id}
          title={targetBlog.title!}
          closeModal={closeShareModal}
          shareUrl={`https://7015-2405-9800-b961-39d-9594-1174-9b67-5c66.ngrok-free.app/read/${targetBlog.id}`}
        />
      )}

      {reportModalVisible && targetBlog && (
        <ReportModal
          title="Report blog"
          publishId={targetBlog.id}
          closeModal={closeReportModal}
        />
      )}
    </>
  )
}
