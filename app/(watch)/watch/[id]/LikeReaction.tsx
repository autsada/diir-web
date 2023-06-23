import React, { useCallback, useTransition, useMemo, useState } from "react"
import {
  AiOutlineDislike,
  AiFillDislike,
  AiFillLike,
  AiOutlineLike,
} from "react-icons/ai"
import _ from "lodash"

import Reaction from "./Reaction"
import { useAuthContext } from "@/context/AuthContext"
import { likePublish, disLikePublish } from "./actions"

interface Props {
  isAuthenticated: boolean
  publishId: string
  liked: boolean
  likesCount: number
  disLiked: boolean
  withDescription?: boolean
  buttonWith?: string // w-[100px] for exp
  verticalLayout?: boolean
  descriptionColor?: string // text-white for exp
}

export default function LikeReaction({
  isAuthenticated,
  publishId,
  liked,
  likesCount,
  disLiked,
  withDescription = true,
  buttonWith,
  verticalLayout = false,
  descriptionColor,
}: Props) {
  const [isPending, startTransition] = useTransition()

  const [prevLiked, setPrevLiked] = useState(!!liked)
  const [optimisticLiked, setOptimisticLiked] = useState(!!liked)
  // When liked changed
  if (!!liked !== prevLiked) {
    setOptimisticLiked(!!liked)
    setPrevLiked(!!liked)
  }

  const [prevLikesCount, setPrevLikesCount] = useState(likesCount)
  const [optimisticLikesCount, setOptimisticLikesCount] = useState(likesCount)
  // When likes count changed
  if (likesCount !== prevLikesCount) {
    setOptimisticLikesCount(likesCount)
    setPrevLikesCount(likesCount)
  }

  const [prevDisLiked, setPrevDisLiked] = useState(!!disLiked)
  const [optimisticDisLiked, setOptimisticDisLiked] = useState(!!disLiked)
  // When disLiked changed
  if (!!disLiked !== prevDisLiked) {
    setOptimisticDisLiked(!!disLiked)
    setPrevDisLiked(!!disLiked)
  }

  const { onVisible: openAuthModal } = useAuthContext()

  const handleLikePublish = useCallback(() => {
    if (!publishId) return

    if (!isAuthenticated) {
      openAuthModal()
    } else {
      setOptimisticLiked(!liked)
      if (!liked && disLiked) {
        setOptimisticDisLiked(!disLiked)
      }
      setOptimisticLikesCount(
        liked ? (likesCount > 0 ? likesCount - 1 : likesCount) : likesCount + 1
      )
      startTransition(() => likePublish(publishId))
    }
  }, [isAuthenticated, openAuthModal, publishId, liked, likesCount, disLiked])

  const likeDebounce = useMemo(
    () => _.debounce(handleLikePublish, 200),
    [handleLikePublish]
  )

  const handleDisLikePublish = useCallback(() => {
    if (!publishId) return

    if (!isAuthenticated) {
      openAuthModal()
    } else {
      setOptimisticDisLiked(!disLiked)
      if (!disLiked && liked) {
        setOptimisticLiked(!liked)
        setOptimisticLikesCount(likesCount > 0 ? likesCount - 1 : likesCount)
      }
      startTransition(() => disLikePublish(publishId))
    }
  }, [isAuthenticated, openAuthModal, publishId, disLiked, liked, likesCount])

  const disLikeDebounce = useMemo(
    () => _.debounce(handleDisLikePublish, 200),
    [handleDisLikePublish]
  )

  return (
    <>
      <div>
        <div
          className={`h-[40px] flex items-center justify-center rounded-full overflow-hidden bg-red-300`}
        >
          <Reaction
            IconOutline={AiOutlineLike}
            IconFill={AiFillLike}
            description={`${optimisticLikesCount || ""}`}
            withDescription={verticalLayout ? false : withDescription}
            isActive={optimisticLiked}
            onClick={likeDebounce}
            width={verticalLayout ? undefined : buttonWith}
          />
        </div>
        {verticalLayout && (
          <div
            className={`w-full text-center font-light text-xs sm:text-sm ${
              descriptionColor ? descriptionColor : "text-textRegular"
            }`}
          >
            {optimisticLikesCount || ""}
          </div>
        )}
      </div>
      <div className="h-[40px] flex items-center justify-center rounded-full overflow-hidden">
        <Reaction
          IconOutline={AiOutlineDislike}
          IconFill={AiFillDislike}
          withDescription={false}
          isActive={optimisticDisLiked}
          onClick={disLikeDebounce}
        />
      </div>
    </>
  )
}
