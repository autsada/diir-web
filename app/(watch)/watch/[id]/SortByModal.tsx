import React from "react"

import type { OrderBy } from "@/graphql/types"

interface Props {
  sortBy: OrderBy
  pos: "top" | "bottom"
  select: (s: OrderBy) => void
}

export default function SortByModal({ sortBy, pos, select }: Props) {
  return (
    <div
      className={`absolute z-20 ${
        pos === "top" ? "-top-[100px]" : "-bottom-[100px]"
      } h-[100px] w-[150px] rounded-xl overflow-hidden shadow-2xl`}
    >
      <button
        type="button"
        className={`w-full h-[50px] text-sm ${
          sortBy === "counts" ? "bg-neutral-300" : "bg-neutral-100"
        } hover:bg-neutral-200`}
        onClick={select.bind(undefined, "counts")}
      >
        Top comments
      </button>
      <button
        type="button"
        className={`w-full h-[50px] text-sm ${
          sortBy === "newest" ? "bg-neutral-300" : "bg-neutral-100"
        } hover:bg-neutral-200`}
        onClick={select.bind(undefined, "newest")}
      >
        Newest
      </button>
    </div>
  )
}
