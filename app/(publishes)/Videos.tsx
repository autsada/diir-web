"use client"

import React, { useState, useCallback, useEffect } from "react"

import ContentTabs from "./ContentTabs"
import PublishItem from "./PublishItem"
import Mask from "@/components/Mask"
import ActionsModal from "./ActionsModal"
import type { Publish, PublishCategory, Station } from "@/graphql/types"

interface Props {
  isAuthenticated: boolean
  profile: Station | undefined
  allVideos: Publish[]
}

export default function Videos({ isAuthenticated, profile, allVideos }: Props) {
  const [selectedCat, setSelectedCat] = useState<PublishCategory | "All">("All")
  const [videosByCat, setVideosByCat] = useState<Publish[]>(allVideos)
  const [loading, setLoading] = useState(false)
  const [targetPublish, setTargetPublish] = useState<Publish>()
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)

  // Disable body scroll when modal openned
  useEffect(() => {
    if (!targetPublish) return
    const els = document?.getElementsByTagName("body")
    if (els[0]) {
      els[0].style.overflow = "hidden"
    }

    return () => {
      if (els[0]) {
        els[0].style.overflow = "auto"
      }
    }
  }, [targetPublish])

  // Query videos when use clicks category
  useEffect(() => {
    queryVideosByCat(selectedCat)
  }, [selectedCat])

  const onReactToPublish = useCallback((p: Publish) => {
    setTargetPublish(p)
  }, [])

  const setPOS = useCallback(
    (posX: number, posY: number, screenHeight: number) => {
      setPositionX(posX)
      setPositionY(posY)
      setScreenHeight(screenHeight)
    },
    []
  )

  const closeModal = useCallback(() => {
    setTargetPublish(undefined)
  }, [])

  async function queryVideosByCat(cat: PublishCategory | "All") {
    try {
      // Call api route to query videos
      setLoading(true)
      const res = await fetch(`/videos/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: cat }),
      })
      const data = (await res.json()) as { publishes: Publish[] }
      setVideosByCat(data.publishes)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="fixed z-10 top-[70px] left-0 sm:left-[116px] right-0 h-[40px] bg-white">
        <div className="h-full py-4 px-2 w-full overflow-x-auto scrollbar-hide">
          <div className="h-full w-max flex items-center gap-x-2 sm:gap-x-4">
            <ContentTabs
              category={selectedCat}
              setCategory={setSelectedCat}
              loading={loading}
            />
          </div>
        </div>
      </div>

      <div className="mt-[40px] py-2 sm:px-4 sm:ml-[100px]">
        {videosByCat.length === 0 ? (
          <div className="w-full py-10 text-center">
            <h6>No videos found</h6>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 sm:gap-y-6 sm:gap-x-6 py-1 pb-20 sm:p-5 bg-white divide-y-[4px] sm:divide-y-0 divide-neutral-200">
            {videosByCat.map((vid) => (
              <PublishItem
                key={vid?.id}
                publish={vid}
                onAction={onReactToPublish}
                setPOS={setPOS}
              />
            ))}

            {targetPublish && (
              <ActionsModal
                isAuthenticated={isAuthenticated}
                profile={profile}
                closeModal={closeModal}
                top={
                  screenHeight - positionY < 200 ? positionY - 200 : positionY
                } // 200 is modal height
                left={positionX - 300} // 300 is modal width
                targetPublish={targetPublish}
              />
            )}
          </div>
        )}
      </div>

      {loading && <Mask backgroundColor="#fff" opacity={0.4} />}
    </>
  )
}