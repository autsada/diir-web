import React from "react"
import Image from "next/image"

import ContentTabs from "./ContentTabs"
import type { Station } from "@/graphql/codegen/graphql"
import Link from "next/link"

interface Props {
  station: Station
}

export default function StationTemplate({ station }: Props) {
  return (
    <>
      {station?.bannerImage && (
        <div className="w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={station.bannerImage}
            alt={station?.displayName}
            className="w-full h-[120px] sm:h-[160px] md:h-[200px] object-cover"
          />
        </div>
      )}

      <div className="mt-2">
        <div className="relative flex mt-5">
          <div className="flex items-center justify-center w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-full overflow-hidden cursor-pointer">
            {!station || !station.image ? (
              !station ? (
                <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-xs">
                  DiiR
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-orange-500 text-white">
                  {station.displayName.slice(0, 1).toUpperCase()}
                </div>
              )
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={station.image}
                alt={station.displayName}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="relative ml-2 sm:ml-6 flex-grow">
            <h4 className="font-semibold text-2xl sm:text-3xl">
              {station?.displayName}
            </h4>
            <h6 className="font-normal text-textLight">@{station?.name}</h6>
            <div className="mt-2 flex gap-x-1 sm:gap-x-4">
              <p className="font-light text-textExtraLight">
                <span className="text-textRegular">
                  {station?.followersCount}
                </span>{" "}
                Followers
              </p>
              <p className="font-light text-textExtraLight">
                <span className="text-textRegular">
                  {station?.followingCount}
                </span>{" "}
                Following
              </p>
              <p className="font-light text-textExtraLight">
                <span className="text-textRegular">
                  {station?.publishesCount}
                </span>{" "}
                Publishes
              </p>
            </div>

            <div className="absolute inset-0 flex items-start sm:items-center justify-end">
              {station?.isOwner ? (
                <Link href={`/station/${station.id}/manage`}>
                  <button
                    type="button"
                    className="btn-dark mx-0 px-5 rounded-full"
                  >
                    Manage station
                  </button>
                </Link>
              ) : station?.isFollowing ? (
                <button
                  type="button"
                  className="btn-dark mx-0 px-5 rounded-full"
                >
                  Following
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-dark mx-0 px-5 rounded-full"
                >
                  Follow
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 py-2">
          <ContentTabs station={station} />
        </div>
      </div>
    </>
  )
}
