"use client"

import React, { useState, useCallback } from "react"

import { formatDate, getPostExcerpt } from "@/lib/client"

interface Props {
  createdAt: string
  description?: string | null
}

export default function Description({ createdAt, description }: Props) {
  const [displayedDesc, setDisplayedDesc] = useState(() =>
    !description ? "" : getPostExcerpt(description)
  )

  const expandDescription = useCallback(() => {
    if (!description) return
    setDisplayedDesc(description)
  }, [description])

  const shrinkDescription = useCallback(() => {
    if (!description) return
    setDisplayedDesc(getPostExcerpt(description))
  }, [description])

  if (!description) return null

  return (
    <div className="w-full my-1 py-1 px-2 sm:py-2 sm:px-4 bg-gray-100 rounded-md">
      <p className="font-semibold text-sm">{formatDate(new Date(createdAt))}</p>
      <p className="font-light text-sm text-textLight">
        {displayedDesc}{" "}
        {description.length > displayedDesc.length ? (
          <span
            className="ml-1 font-semibold cursor-pointer"
            onClick={expandDescription}
          >
            more
          </span>
        ) : (
          <span
            className="ml-1 font-semibold cursor-pointer"
            onClick={shrinkDescription}
          >
            less
          </span>
        )}
      </p>
    </div>
  )
}
