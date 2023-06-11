import React from "react"

import RemoveAllBtn from "./RemoveAllBtn"
import type { Publish } from "@/graphql/codegen/graphql"

interface Props {
  publish: Publish
  totalItems: number
}

export default function Poster({ publish, totalItems }: Props) {
  return (
    <div className="h-full w-full md:w-[300px] lg:w-[400px] px-2 sm:px-4 md:px-8 py-6 bg-neutral-200 rounded-lg">
      <h6 className="text-lg sm:text-xl">View later</h6>
      {publish && totalItems > 0 && (
        <>
          <div className="my-2 rounded-lg overflow-hidden">
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
          <p className="text-sm sm:text-base text-textLight">
            {totalItems} publish{totalItems > 1 ? "es" : ""}
          </p>
          <div className="mt-4">
            <RemoveAllBtn />
          </div>
        </>
      )}
    </div>
  )
}
