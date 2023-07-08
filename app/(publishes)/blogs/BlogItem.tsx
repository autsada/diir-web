import React, { useState, useCallback } from "react"
import Link from "next/link"
import { AiOutlineLike } from "react-icons/ai"
import { BsBookmarkFill, BsBookmark } from "react-icons/bs"
import { MdOutlineComment } from "react-icons/md"

import Avatar from "@/components/Avatar"
import StationName from "@/components/StationName"
import ManageFollow from "@/app/(watch)/watch/[id]/ManageFollow"
import { calculateTimeElapsed } from "@/lib/client"
import type { Publish } from "@/graphql/codegen/graphql"

interface Props {
  isAuthenticated: boolean
  publish: Publish
  bookmarkHandler: (publishId: string, callback: () => void) => void
}

export default function BlogItem({
  isAuthenticated,
  publish,
  bookmarkHandler,
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
        <div className="flex-grow cursor-pointer">
          <Link href={`/read/${publish.id}`}>
            <div className="w-full h-full"></div>
          </Link>
        </div>
        <ManageFollow
          isAuthenticated={isAuthenticated}
          follow={publish.creator}
          ownerHref={`/upload/${publish.id}`}
          ownerLinkText="Edit"
        />
      </div>
      <div className="mt-2 w-full grid grid-cols-6">
        <div className="col-span-5 sm:col-span-4 h-[120px] md:h-[150px] flex flex-col justify-between">
          <h5 className="text-lg sm:text-xl lg:text-2xl hover:text-blueDark cursor-pointer">
            {publish.title || ""}
          </h5>
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
          <div className="flex items-center justify-between px-2">
            <div className="h-full flex items-center gap-x-6">
              <Link href={`/read/${publish.id}`}>
                <div className="relative h-full flex items-center justify-center gap-x-2 cursor-pointer">
                  <div className="h-full flex items-center justify-center">
                    <MdOutlineComment size={22} className="text-2xl" />
                  </div>
                  <div className="h-full text-xs sm:text-sm flex items-center justify-center">
                    {publish.commentsCount}
                  </div>
                </div>
              </Link>
              <Link href={`/read/${publish.id}`}>
                <div className="relative h-full flex items-center justify-center gap-x-2 cursor-pointer">
                  <div className="h-full flex items-center justify-center">
                    <AiOutlineLike size={22} className="text-2xl" />
                  </div>
                  <div className="h-full text-xs sm:text-sm flex items-center justify-center">
                    {publish.likesCount}
                  </div>
                </div>
              </Link>
              <div
                className="relative h-full flex items-center justify-center gap-x-2 cursor-pointer"
                onClick={bookmarkHandler.bind(
                  undefined,
                  publish.id,
                  bookmarkCallback
                )}
              >
                {optimisticBookmarked ? (
                  <BsBookmarkFill size={18} className="text-2xl" />
                ) : (
                  <BsBookmark size={20} className="text-2xl" />
                )}
              </div>
            </div>
            <div>2 min read</div>
          </div>
        </div>
        <div className="sm:col-span-2 flex items-center justify-end cursor-pointer">
          {publish.thumbnail && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={publish.thumbnail}
              alt={publish.filename || publish.title || ""}
              className="w-full sm:w-[100px] h-[60px] md:w-[150px] md:h-[100px] object-cover"
            />
          )}
        </div>
      </div>
    </div>
  )
}
