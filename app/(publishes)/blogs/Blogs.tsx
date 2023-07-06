"use client"

import React, { useState, useCallback } from "react"

import FeedTabs from "./FeedTabs"
import type { FeedType } from "./FeedTabs"

export default function Blogs() {
  const [feedTab, setFeedTab] = useState<FeedType>("For you")
  const [loading, setLoading] = useState(false)

  const selectTab = useCallback((f: FeedType) => {
    setFeedTab(f)
  }, [])

  return (
    <div className="px-2 sm:px-4 py-2">
      <div className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] max-w-[700px] mx-auto">
        <FeedTabs
          selectedTab={feedTab}
          onSelectTab={selectTab}
          loading={loading}
        />
        <div className="mt-5 flex flex-col items-center">{feedTab}</div>
      </div>
    </div>
  )
}
