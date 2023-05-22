"use client"

import React, { useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { onSnapshot, doc } from "firebase/firestore"

import ButtonLoader from "@/components/ButtonLoader"
import { formatDate, getPostExcerpt, secondsToHourFormat } from "@/lib/client"
import { db, uploadsCollection } from "@/firebase/config"
import type { Publish } from "@/graphql/types"

interface Props {
  publish: Publish
}

export default function PublishItem({ publish }: Props) {
  const router = useRouter()

  // Listen to upload finished update in Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, uploadsCollection, publish?.id),
      (doc) => {
        // Reload data to get the most updated publish
        router.refresh()
      }
    )

    return unsubscribe
  }, [router, publish?.id])

  const onClickItem = useCallback(
    (id: string) => {
      router.push(`/upload/${id}`)
    },
    [router]
  )

  return (
    <tr
      className="text-sm h-[80px] lg:h-[100px] cursor-pointer hover:bg-gray-50"
      onClick={onClickItem.bind(undefined, publish.id)}
    >
      <th className="w-[33%] sm:w-[13%] font-normal py-2 break-words">
        <div className="relative w-full h-full">
          {publish.thumbnail || publish.playback ? (
            // eslint-disable-next-line @next/next/no-img-element
            <div className="w-full h-full bg-black">
              <img
                src={
                  publish.thumbnail && publish.thumbSource === "custom"
                    ? publish.thumbnail
                    : publish.playback?.thumbnail
                }
                alt={publish.title || ""}
                className={`w-full h-full max-h-[64px] lg:max-h-[84px] ${
                  publish.kind === "Short" ? "object-contain" : "object-cover"
                }`}
              />
            </div>
          ) : (
            <button>
              <ButtonLoader loading color="#f97316" />
            </button>
          )}
          {publish.playback && (
            <div className="absolute bottom-[1px] right-[2px] px-[2px] rounded-sm bg-white font-thin text-xs flex items-center justify-center">
              {secondsToHourFormat(publish.playback?.duration)}
            </div>
          )}
        </div>
      </th>
      <th className="w-[27%] sm:w-[12%] px-1 font-normal break-words">
        {publish.title}
      </th>
      <th className="w-[25%] sm:w-[20%] px-2 py-1 font-normal hidden lg:table-cell break-words text-left">
        {publish.description ? (
          getPostExcerpt(publish.description, 80)
        ) : (
          <p className="text-center">-</p>
        )}
      </th>
      <th className="w-[15%] sm:w-[10%] font-normal py-2 break-words">
        <div className="flex flex-col sm:flex-row items-center justify-center">
          {publish.visibility === "public" ? (
            <BsEye className="text-green-600" />
          ) : publish.visibility === "private" ? (
            <BsEyeSlash className="text-red-600" />
          ) : null}{" "}
          <span
            className={`mt-2 sm:mt-0 sm:ml-2 ${
              publish.visibility === "draft" ? "font-thin mt-0" : "font-normal"
            }`}
          >
            {publish.visibility}
          </span>
        </div>
      </th>
      <th className="w-[20%] sm:w-[10%] font-normal py-2 break-words">
        {formatDate(new Date(publish.createdAt))}
      </th>
      <th className="w-[20%] sm:w-[7%] font-normal py-2 hidden sm:table-cell break-words">
        {publish.views}
      </th>
      <th className="w-[20%] sm:w-[7%] font-normal py-2 hidden sm:table-cell break-words">
        {publish.tipsCount}
      </th>
      <th className="w-[20%] sm:w-[7%] font-normal py-2 hidden sm:table-cell break-words">
        {publish.commentsCount}
      </th>
      <th className="w-[20%] sm:w-[7%] font-normal py-2 hidden sm:table-cell break-words">
        {publish.likesCount}
      </th>
      <th className="w-[20%] sm:w-[7%] font-normal py-2 hidden sm:table-cell break-words">
        {publish.disLikesCount}
      </th>
    </tr>
  )
}
