"use client"

import React, { useCallback, useEffect, useState, useRef } from "react"

import Short from "./Short"
import type { Maybe, GetShortResponse } from "@/graphql/codegen/graphql"

interface Props {
  shortResult: Maybe<GetShortResponse> | undefined
}

export default function ViewArea({ shortResult }: Props) {
  const itemResult = shortResult?.item
  const [prevItem, setPrevItem] = useState(itemResult)
  const [item, setItem] = useState(itemResult)
  if (itemResult !== prevItem) {
    setPrevItem(itemResult)
    setItem(itemResult)
  }

  const followingItemsResult = shortResult?.followingShorts?.edges
  const [prevFollowingItems, setPrevFollowingItems] =
    useState(followingItemsResult)
  const [followingItems, setFollowingItems] = useState(
    followingItemsResult || []
  )
  if (followingItemsResult !== prevFollowingItems) {
    setPrevFollowingItems(followingItemsResult)
    setFollowingItems(followingItemsResult || [])
  }

  const pageInfoResult = shortResult?.followingShorts?.pageInfo
  const [prevPageInfo, setPrevPageInfo] = useState(pageInfoResult)
  const [pageInfo, setPageInfo] = useState(pageInfoResult)
  if (pageInfoResult !== prevPageInfo) {
    setPrevPageInfo(pageInfoResult)
    setPageInfo(pageInfoResult)
  }

  useEffect(() => {
    const els = document?.getElementsByTagName("video")
    if (els.length > 0) {
      for (let i = 0; i < els.length; i++) {
        els[i].style.objectFit = "cover"
      }
    }
  }, [])

  //   const onScroll = useCallback((id: string) => {
  //     const el = document?.getElementById(id)
  //     if (!el) return
  //     el.scrollIntoView({
  //       behavior: "smooth",
  //     })
  //   }, [])

  if (!item) return null

  return (
    <div className="h-full w-full mx-auto overflow-y-auto sm:pt-5">
      <Short item={item} />
      {followingItems.length > 0 &&
        followingItems.map((edge) =>
          !edge.node ? null : <Short key={edge.node.id} item={edge.node} />
        )}
    </div>
  )
}
