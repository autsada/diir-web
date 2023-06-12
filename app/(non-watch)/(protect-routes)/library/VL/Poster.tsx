import React from "react"

import PlaylistName from "./PlaylistName"
import RemoveAllBtn from "./RemoveAllBtn"
import type { Publish } from "@/graphql/codegen/graphql"

interface Props {
  playlistId: string
  isAuthenticated: boolean
  publish: Publish
  totalItems: number
  playlistName?: string
  playlistDescription?: string
}

export default function Poster({
  playlistId,
  isAuthenticated,
  publish,
  totalItems,
  playlistName = "View later",
  playlistDescription,
}: Props) {
  return (
    <div className="h-full w-full md:w-[300px] lg:w-[400px] px-2 sm:px-4 md:px-8 py-6 bg-neutral-200 rounded-lg">
      {publish && totalItems > 0 && (
        <>
          <div className="rounded-lg overflow-hidden flex items-center justify-center bg-black max-h-[50%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                publish.thumbSource === "custom" && publish.thumbnail
                  ? publish.thumbnail
                  : publish.playback?.thumbnail
              }
              alt={publish.title || ""}
            />
          </div>
          <div className="mt-4 mb-1 px-1">
            <PlaylistName
              playlistId={playlistId}
              isAuthenticated={isAuthenticated}
              name={playlistName}
              description={playlistDescription}
              itemsCount={totalItems}
            />
          </div>
          <p className="mt-2 px-1 text-sm sm:text-base text-textLight">
            {totalItems} publish{totalItems > 1 ? "es" : ""}
          </p>
          <div className="mt-4">
            <RemoveAllBtn playlistId={playlistId} playlistName={playlistName} />
          </div>
        </>
      )}
    </div>
  )
}
