"use client"

import React, { useState, useCallback, useEffect } from "react"

import PublishItem from "./PublishItem"
import type { Publish } from "@/graphql/types"
import ActionsModal from "./ActionsModal"

interface Props {
  publishes: Publish[]
}

export default function Publishes({ publishes }: Props) {
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

  return (
    <>
      {publishes.map((publish) => (
        <PublishItem
          key={publish?.id}
          publish={publish}
          onAction={onReactToPublish}
          setPOS={setPOS}
        />
      ))}

      {targetPublish && (
        <ActionsModal
          closeModal={closeModal}
          top={screenHeight - positionY < 200 ? positionY - 200 : positionY} // 200 is modal height
          left={positionX - 300} // 300 is modal width
        />
      )}
    </>
  )
}
