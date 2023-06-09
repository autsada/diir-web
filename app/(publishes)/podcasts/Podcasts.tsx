"use client"

import React, { useState } from "react"

import ContentTabs from "../ContentTabs"
import type { PublishCategory } from "@/graphql/types"

export default function Podcasts() {
  const [selectedCat, setSelectedCat] = useState<PublishCategory | "All">("All")

  return (
    <>
      <div className="fixed z-10 top-[70px] left-0 sm:left-[116px] right-0 h-[40px] bg-white">
        <div className="h-full py-4 px-2 w-full overflow-x-auto scrollbar-hide">
          <div className="h-full w-max flex items-center gap-x-2 sm:gap-x-4">
            <ContentTabs onSelectTab={setSelectedCat} loading={false} />
          </div>
        </div>
      </div>

      <div className="mt-[40px] py-2 sm:px-4 sm:ml-[100px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 sm:gap-y-6 sm:gap-x-6 py-1 pb-20 sm:p-5 bg-white divide-y-[4px] sm:divide-y-0 divide-neutral-200">
          Podcasts
        </div>
      </div>
    </>
  )
}
