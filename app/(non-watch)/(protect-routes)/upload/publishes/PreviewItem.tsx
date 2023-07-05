import React, { useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { onSnapshot, doc } from "firebase/firestore"

import ButtonLoader from "@/components/ButtonLoader"
import { formatDate, getPostExcerpt, secondsToHourFormat } from "@/lib/client"
import { db, uploadsCollection } from "@/firebase/config"
import type { Publish } from "@/graphql/codegen/graphql"

interface Props {
  publish: Publish
}

export default function PreviewItem({ publish }: Props) {
  const isDeleting = publish?.deleting

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
      className="text-sm cursor-pointer hover:bg-gray-50"
      onClick={onClickItem.bind(undefined, publish.id)}
    >
      <th className="w-[40%] sm:w-[15%] lg:w-[10%] font-normal py-2 break-words">
        <div className="relative w-full h-full">
          {publish.kind === "Blog" ? (
            <>
              {publish.thumbnail && (
                <div className="w-full h-full bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={publish.thumbnail}
                    alt={publish.title || ""}
                    className="w-full h-[64px] sm:h-[50px] xl:h-[64px] object-cover"
                  />
                </div>
              )}
            </>
          ) : (
            <>
              {publish.thumbnail || publish.playback ? (
                <div className="w-full h-full bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      publish.thumbnail && publish.thumbSource === "custom"
                        ? publish.thumbnail
                        : publish.playback?.thumbnail
                    }
                    alt={publish.title || ""}
                    className={`w-full h-[64px] sm:h-[50px] xl:h-[64px] ${
                      publish.kind === "Short"
                        ? "object-contain"
                        : "object-cover"
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
            </>
          )}
        </div>
      </th>
      <th className="w-[60%] sm:w-[40%] lg:w-[30] px-1 font-normal break-words">
        {getPostExcerpt(publish.title || "", 60)}
      </th>
      {isDeleting ? (
        <>
          <th className="text-error text-center">Deleting...</th>
          <th className="sm:w-[15%] lg:w-[10%] hidden sm:table-cell font-normal py-2 break-words"></th>
          <th className="md:w-[15%] lg:w-[10%] hidden md:table-cell font-normal py-2 break-words"></th>
          <th className="lg:w-[10%] font-normal py-2 hidden lg:table-cell break-words"></th>
          <th className="lg:w-[10%] font-normal py-2 hidden lg:table-cell break-words"></th>
        </>
      ) : (
        <>
          <th className="sm:w-[15%] lg:w-[10%] hidden sm:table-cell px-2 py-1 font-normal break-words">
            {publish.kind}
          </th>
          <th className="sm:w-[15%] lg:w-[10%] hidden sm:table-cell font-normal py-2 break-words">
            <div className="flex flex-col sm:flex-row items-center justify-center">
              {publish.visibility === "public" ? (
                <BsEye className="text-green-600" />
              ) : publish.visibility === "private" ? (
                <BsEyeSlash className="text-red-600" />
              ) : null}{" "}
              <span
                className={`mt-2 sm:mt-0 sm:ml-2 ${
                  publish.visibility === "draft"
                    ? "font-thin mt-0"
                    : "font-normal"
                }`}
              >
                {publish.visibility}
              </span>
            </div>
          </th>
          <th className="md:w-[15%] lg:w-[10%] hidden md:table-cell font-normal py-2 break-words">
            {formatDate(new Date(publish.createdAt))}
          </th>
          <th className="lg:w-[10%] font-normal py-2 hidden lg:table-cell break-words">
            {publish.views}
          </th>
          <th className="lg:w-[10%] font-normal py-2 hidden lg:table-cell break-words">
            {publish.likesCount}
          </th>
        </>
      )}
    </tr>
  )
}
