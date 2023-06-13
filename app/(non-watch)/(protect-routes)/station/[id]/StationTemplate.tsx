import React from "react"

import ContentTabs from "./ContentTabs"
import ManageFollow from "@/app/(watch)/watch/[id]/ManageFollow"
import type { Station } from "@/graphql/codegen/graphql"

interface Props {
  isAuthenticated: boolean
  station: Station
}

export default function StationTemplate({ isAuthenticated, station }: Props) {
  const profileColor = station?.defaultColor
  const bgColor = profileColor || "#ff8138"

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
          <div className="flex items-center justify-center w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] rounded-full overflow-hidden cursor-pointer">
            {!station || !station.image ? (
              !station ? (
                <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-xs">
                  DiiR
                </div>
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-white"
                  style={{ backgroundColor: bgColor }}
                >
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
            <h4 className="font-semibold text-lg sm:text-xl">
              {station?.displayName}
            </h4>
            <p className="text-textLight">@{station?.name}</p>
            <div className="mt-2 flex gap-x-2 sm:gap-x-4">
              <p className="text-sm sm:text-base font-light text-textExtraLight">
                <span className="text-textRegular">
                  {station?.followersCount}
                </span>{" "}
                Followers
              </p>
              {station?.isOwner && (
                <p className="text-sm sm:text-base font-light text-textExtraLight">
                  <span className="text-textRegular">
                    {station?.followingCount}
                  </span>{" "}
                  Following
                </p>
              )}
              <p className="text-sm sm:text-base font-light text-textExtraLight">
                <span className="text-textRegular">
                  {station?.publishesCount}
                </span>{" "}
                Publishes
              </p>
            </div>

            <div className="absolute inset-0 pr-0 sm:pr-5 lg:pr-10 flex items-start sm:items-center justify-end">
              <ManageFollow
                isAuthenticated={isAuthenticated}
                follow={station}
                ownerHref="/settings"
                ownerLinkText="Edit"
              />
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
