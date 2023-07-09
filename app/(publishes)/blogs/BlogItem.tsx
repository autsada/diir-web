import React, { useState, useCallback } from "react"
import Link from "next/link"
import {
  AiOutlineLike,
  AiOutlineRead,
  AiOutlineShareAlt,
  AiOutlineFlag,
} from "react-icons/ai"
import { BsBookmarkFill, BsBookmark } from "react-icons/bs"
import { MdOutlineComment } from "react-icons/md"

import Avatar from "@/components/Avatar"
import StationName from "@/components/StationName"
import ManageFollow from "@/app/(watch)/watch/[id]/ManageFollow"
import { calculateTimeElapsed, getPostExcerpt } from "@/lib/client"
import type { Publish } from "@/graphql/codegen/graphql"

interface Props {
  isAuthenticated: boolean
  publish: Publish
  bookmarkHandler: (publishId: string, callback: () => void) => void
  onShare: (publish: Publish) => Promise<void>
  onReport: (publish: Publish) => void
}

export default function BlogItem({
  isAuthenticated,
  publish,
  bookmarkHandler,
  onShare,
  onReport,
}: Props) {
  const [optimisticBookmarked, setOptimisticBookmarked] = useState(
    !!publish.bookmarked
  )

  const bookmarkCallback = useCallback(() => {
    setOptimisticBookmarked((prev) => !prev)
  }, [])

  return (
    <div className="relative w-full py-4">
      <div className="w-full flex items-stretch gap-x-2">
        <Avatar profile={publish.creator} />
        <div className="text-left">
          <StationName profile={publish.creator} />
          <p className="font-light text-textLight text-sm sm:text-base">
            {calculateTimeElapsed(publish.createdAt)}
          </p>
        </div>
        <div className="pl-10">
          <ManageFollow
            isAuthenticated={isAuthenticated}
            follow={publish.creator}
            ownerHref={`/upload/${publish.id}`}
            ownerLinkText="Edit"
          />
        </div>
        <div className="flex-grow cursor-pointer">
          <Link href={`/read/${publish.id}`}>
            <div className="w-full h-full"></div>
          </Link>
        </div>
      </div>

      <div className="mt-2 w-full grid grid-cols-6">
        <div className="col-span-5 sm:col-span-4">
          <Link href={`/read/${publish.id}`}>
            <h5 className="text-lg sm:text-xl lg:text-2xl hover:text-textLight cursor-pointer">
              {publish.title || ""}
            </h5>
            {publish.blog?.excerpt && (
              <p className="mt-1 text-textLight">
                {getPostExcerpt(publish.blog.excerpt, 100)}
              </p>
            )}
          </Link>
          {publish.tags && publish.tags.split(" ").length > 0 && (
            <div className="mt-1 flex items-center gap-x-4">
              {publish.tags.split(" ").map((tag) => (
                <Link key={tag} href={`/tag/${tag}`}>
                  <div className="text-textLight px-2 py-1 rounded-full cursor-pointer hover:bg-neutral-100">
                    #{tag}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="sm:col-span-2 flex justify-end cursor-pointer">
          {publish.thumbnail && (
            <Link href={`/read/${publish.id}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={publish.thumbnail}
                alt={publish.filename || publish.title || ""}
                className="w-[80px] h-[60px] object-cover"
              />
            </Link>
          )}
        </div>
      </div>

      <div className="mt-2 py-1 flex items-center justify-between gap-x-3 md:gap-x-4 xl:gap-x-6">
        <Link href={`/read/${publish.id}`}>
          <div className="h-full flex items-center gap-x-2 sm:gap-x-3 md:gap-x-4 lg:gap-x-5">
            <div className="relative h-full flex items-center justify-center gap-x-2 cursor-pointer">
              <div className="h-full flex items-center justify-center">
                <AiOutlineLike size={22} className="text-2xl" />
              </div>
              <div className="h-full text-xs sm:text-sm flex items-center justify-center">
                {publish.likesCount}
              </div>
            </div>
            <div className="relative h-full flex items-center justify-center gap-x-2 cursor-pointer">
              <div className="h-full flex items-center justify-center">
                <AiOutlineRead size={22} className="text-2xl" />
              </div>
              <div className="h-full text-xs sm:text-sm flex items-center justify-center">
                {publish.views}
              </div>
            </div>
            <div className="relative h-full flex items-center justify-center gap-x-2 cursor-pointer">
              <div className="h-full flex items-center justify-center">
                <MdOutlineComment size={20} className="text-2xl" />
              </div>
              <div className="h-full text-xs sm:text-sm flex items-center justify-center">
                {publish.commentsCount}
              </div>
            </div>
          </div>
        </Link>
        <div className="px-2 flex items-center justify-center gap-x-4 sm:gap-x-6 lg:gap-x-8">
          <div
            className="relative h-full flex items-center justify-center cursor-pointer"
            onClick={bookmarkHandler.bind(
              undefined,
              publish.id,
              bookmarkCallback
            )}
          >
            {optimisticBookmarked ? (
              <BsBookmarkFill size={16} className="text-2xl" />
            ) : (
              <BsBookmark size={17} className="text-2xl" />
            )}
          </div>
          <div
            className="relative h-full flex items-center justify-center cursor-pointer"
            onClick={onShare.bind(undefined, publish)}
          >
            <AiOutlineShareAlt size={22} className="text-2xl" />
          </div>
          <div
            className="relative h-full flex items-center justify-center cursor-pointer"
            onClick={onReport.bind(undefined, publish)}
          >
            <AiOutlineFlag size={23} className="text-2xl" />
          </div>
        </div>
        <div className="w-[100px] text-right">
          <Link href={`/read/${publish.id}`}>
            <div className="font-light text-textLight">
              {publish.blog?.readingTime}
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
