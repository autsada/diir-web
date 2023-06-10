import React, { useState, useCallback } from "react"
import { MdOutlineSort, MdArrowBack } from "react-icons/md"

import Mask from "@/components/Mask"
import SortByModal from "./SortByModal"
import type { CommentsOrderBy } from "@/graphql/types"
import type { FetchCommentsResponse } from "@/graphql/codegen/graphql"

interface Props {
  publishId: string
  subCommentsVisible: boolean
  commentsCount: number
  setCommentsResponse: React.Dispatch<
    React.SetStateAction<FetchCommentsResponse | null | undefined>
  >
  closeSubComments: () => void
  sortBy: CommentsOrderBy
  setSortBy: React.Dispatch<React.SetStateAction<CommentsOrderBy>>
}

export default function CommentsHeader({
  publishId,
  subCommentsVisible,
  commentsCount,
  setCommentsResponse,
  closeSubComments,
  sortBy,
  setSortBy,
}: Props) {
  const [sortBySelectionVisible, setSortBySelectionVisible] = useState(false)
  const [sortByPosY, setSortByPosY] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)
  const [commentsLoading, setCommentsLoading] = useState(false)

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

  // Fetch comments when user selects sort by
  const fetchComments = useCallback(
    async (ob: CommentsOrderBy) => {
      if (!publishId) return
      try {
        setCommentsLoading(true)
        const res = await fetch(`/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            publishId: publishId,
            sortBy: ob,
          }),
        })
        const data = (await res.json()) as {
          result: FetchCommentsResponse
        }
        setCommentsResponse(data.result)
        setCommentsLoading(false)
      } catch (error) {
        setCommentsLoading(false)
      }
    },
    [publishId, setCommentsResponse]
  )

  const selectSortBy = useCallback(
    (s: CommentsOrderBy) => {
      setSortBy(s)
      if (s !== sortBy) {
        fetchComments(s)
      }
    },
    [sortBy, fetchComments, setSortBy]
  )

  return (
    <>
      <div className="h-[30px] flex items-center gap-x-4">
        {!subCommentsVisible ? (
          <>
            <div className="h-full flex items-center gap-x-2">
              <h6 className="text-lg sm:text-xl">{commentsCount}</h6>
              <h6 className="text-lg sm:text-xl">Comments</h6>
            </div>
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
          </>
        ) : (
          <>
            <MdArrowBack
              size={22}
              className="cursor-pointer"
              onClick={closeSubComments}
            />
            <h6>Replies</h6>
          </>
        )}
      </div>

      {/* To close sortby modal when clicks outside */}
      {sortBySelectionVisible && (
        <div className="fixed z-0 inset-0" onClick={toggleSortBy}></div>
      )}

      {/* Prevent user interaciton while loading */}
      {commentsLoading && <Mask backgroundColor="white" opacity={0.2} />}
    </>
  )
}
