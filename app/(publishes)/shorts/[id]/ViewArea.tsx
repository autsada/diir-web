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

  const precedingItemsResult = shortResult?.precedingShorts?.edges
  const [prevPrecedingItems, setPrevPrecedingItems] =
    useState(precedingItemsResult)
  const [precedingItems, setPrecedingItems] = useState(
    precedingItemsResult || []
  )
  if (precedingItemsResult !== prevPrecedingItems) {
    setPrevPrecedingItems(precedingItemsResult)
    setPrecedingItems(precedingItemsResult || [])
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

  const prevPrecedingShortsPageInfoResult =
    shortResult?.precedingShorts?.pageInfo
  const [prevPrecedingShortsPageInfo, setPrevPrecedingShortsPageInfo] =
    useState(prevPrecedingShortsPageInfoResult)
  const [precedingShortsPageInfo, setPrecedingShortsPageInfo] = useState(
    prevPrecedingShortsPageInfoResult
  )
  if (prevPrecedingShortsPageInfoResult !== prevPrecedingShortsPageInfo) {
    setPrevPrecedingShortsPageInfo(prevPrecedingShortsPageInfoResult)
    setPrecedingShortsPageInfo(prevPrecedingShortsPageInfoResult)
  }

  const prevFollowingShortsPageInfoResult =
    shortResult?.followingShorts?.pageInfo
  const [prevFollowingShortsPageInfo, setPrevFollowingShortsPageInfo] =
    useState(prevFollowingShortsPageInfoResult)
  const [followingShortsPageInfo, setFollowingShortsPageInfo] = useState(
    prevFollowingShortsPageInfoResult
  )
  if (prevFollowingShortsPageInfoResult !== prevFollowingShortsPageInfo) {
    setPrevFollowingShortsPageInfo(prevFollowingShortsPageInfoResult)
    setFollowingShortsPageInfo(prevFollowingShortsPageInfoResult)
  }

  // const [isScrolling, setIsScrolling] = useState(false)
  // const [timeoutId, setTimeoutId] = useState<NodeJS.Timer>()
  // const [prevScrollPOS, setPrevScrollPOS] = useState(0)
  // const [scrollDirection, setScrollDirection] = useState<
  //   "up" | "down" | undefined
  // >()

  const containerRef = useRef<HTMLDivElement>(null)
  const divRef = useRef<HTMLDivElement>(null)

  // Set video el style to cover
  useEffect(() => {
    const els = document?.getElementsByTagName("video")
    if (els.length > 0) {
      for (let i = 0; i < els.length; i++) {
        els[i].style.objectFit = "cover"
      }
    }
  }, [])

  // useEffect(() => {
  //   if (containerRef.current) {
  //     setPrevScrollPOS(containerRef.current.scrollTop)
  //   }
  // }, [])

  // useEffect(() => {
  //   return () => {
  //     if (timeoutId) clearTimeout(timeoutId)
  //   }
  // }, [timeoutId])

  // useEffect(() => {
  //   if (scrollDirection) {
  //     console.log("scroll: ", scrollDirection)
  //     // setScrollDirection(undefined)
  //   }
  // }, [scrollDirection])

  useEffect(() => {
    if (typeof window === "undefined") return

    const el = document.getElementById("shorts")
    if (!el) return

    let isScrolling = false
    let prevScrollPOS = el.scrollTop

    function onScroll() {
      if (!el) return
      if (!isScrolling) {
        isScrolling = true
        // console.log("scrolling")
        const top = el.offsetTop
        const currentScrollPOS = el.scrollTop

        if (currentScrollPOS > prevScrollPOS) {
          console.log("down")
          prevScrollPOS = currentScrollPOS
        } else if (currentScrollPOS < prevScrollPOS) {
          console.log("up")
          prevScrollPOS = currentScrollPOS
        }
        // setPrevScrollPOS(currentScrollPOS)
        isScrolling = false
        prevScrollPOS = el?.scrollTop

        // // Get the current scroll position
        // let currentScrollPosition =
        //   window.pageYOffset || document?.documentElement?.scrollTop || 0
        // console.log("prev -->", previousScrollPosition)
        // console.log("current -->", currentScrollPosition)
        // // Check if the scroll position has changed
        // if (previousScrollPosition === 0) {
        //   console.log("first scroll")
        //   // el.scrollBy(0, window?.innerHeight)
        //   // previousScrollPosition = window?.innerHeight
        // } else if (currentScrollPosition > previousScrollPosition) {
        //   // Scrolling down
        //   console.log("Scrolling down")
        // } else {
        //   // Scrolling up
        //   console.log("Scrolling up")
        // }
        // setPrevScrollPOS(currentScrollPOS)
      }

      // const id = setTimeout(() => {
      //   isScrolling = false
      //   clearTimeout(id)
      // }, 20)
      // setTimeoutId(id)
    }

    el.addEventListener("scroll", onScroll)

    return () => {
      el.removeEventListener("scroll", onScroll)
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

  // console.log("scroll: ", scrollDirection)
  return (
    <div
      ref={containerRef}
      id="shorts"
      className="h-full w-full mx-auto overflow-y-auto sm:pt-5"
    >
      <Short item={item} />

      {followingItems.length > 0 &&
        followingItems.map((edge) =>
          !edge.node ? null : <Short key={edge.node.id} item={edge.node} />
        )}
    </div>
  )
}
