import React from "react"

import type { Publish } from "@/graphql/codegen/graphql"

interface Props {
  publish: Publish
  totalItems: number
}

export default function Poster({ publish, totalItems }: Props) {
  return (
    <>
      <h6 className="text-lg sm:text-xl">Watch later</h6>
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
        <button className="btn-cancel px-5 rounded-full">
          Remove all from watch later
        </button>
      </div>
    </>
  )
}
