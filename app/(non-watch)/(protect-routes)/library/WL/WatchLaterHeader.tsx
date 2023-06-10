import React, { useState, useCallback } from "react"
import { MdOutlineSort } from "react-icons/md"

import Mask from "@/components/Mask"
import SortByModal from "./SortByModal"
import type { WatchLaterOrderBy } from "@/graphql/types"
import type {
  WatchLaterEdge,
  PageInfo,
  FetchWatchLaterResponse,
} from "@/graphql/codegen/graphql"

interface Props {
  setItems: React.Dispatch<React.SetStateAction<WatchLaterEdge[]>>
  setPageInfo: React.Dispatch<React.SetStateAction<PageInfo>>
  sortBy: WatchLaterOrderBy
  setSortBy: React.Dispatch<React.SetStateAction<WatchLaterOrderBy>>
}

export default function WatchLaterHeader({
  setItems,
  setPageInfo,
  sortBy,
  setSortBy,
}: Props) {
  const [sortBySelectionVisible, setSortBySelectionVisible] = useState(false)
  const [sortByPosY, setSortByPosY] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)
  const [loading, setLoading] = useState(false)

  const toggleSortBy = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setSortBySelectionVisible((prev) => {
        if (!prev) {
          setSortByPosY(e.clientY)
          setScreenHeight(window?.innerHeight)
        } else {
          setSortByPosY(0)
          setScreenHeight(0)
        }
        return !prev
      })
    },
    []
  )

  // Fetch watch later when user selects sort by
  const fetchWatchLater = useCallback(
    async (ob: WatchLaterOrderBy) => {
      try {
        setLoading(true)
        const res = await fetch(`/library/WL/query`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sortBy: ob,
          }),
        })
        const data = (await res.json()) as {
          result: FetchWatchLaterResponse
        }
        setItems(data.result?.edges)
        setPageInfo(data.result?.pageInfo)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    },
    [setItems, setPageInfo]
  )

  const selectSortBy = useCallback(
    (s: WatchLaterOrderBy) => {
      setSortBy(s)
      if (s !== sortBy) {
        fetchWatchLater(s)
      }
    },
    [sortBy, fetchWatchLater, setSortBy]
  )

  return (
    <>
      <div
        className="h-full relative z-10 flex items-center gap-x-1 cursor-pointer"
        onClick={toggleSortBy}
      >
        <MdOutlineSort className="text-textExtraLight" size={24} />
        <p className="font-semibold text-sm">Sort by</p>

        {sortBySelectionVisible && (
          <SortByModal
            sortBy={sortBy}
            pos={screenHeight - sortByPosY < 100 ? "top" : "bottom"} // 100 is modal height
            select={selectSortBy}
          />
        )}
      </div>

      {/* To close sortby modal when clicks outside */}
      {sortBySelectionVisible && (
        <div className="fixed z-0 inset-0" onClick={toggleSortBy}></div>
      )}

      {/* Prevent user interaciton while loading */}
      {loading && <Mask backgroundColor="white" opacity={0.2} />}
    </>
  )
}
