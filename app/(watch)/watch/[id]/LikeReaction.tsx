import React, {
  useCallback,
  useTransition,
  useMemo,
  experimental_useOptimistic as useOptimistic,
  useState,
  useEffect,
} from "react"
import {
  AiOutlineDislike,
  AiFillDislike,
  AiFillLike,
  AiOutlineLike,
} from "react-icons/ai"
import _ from "lodash"

import Reaction from "./ReactTion"
import { useAuthContext } from "@/context/AuthContext"
import { likePublish, disLikePublish } from "./actions"

interface Props {
  isAuthenticated: boolean
  publishId: string
  liked: boolean
  likesCount: number
  disLiked: boolean
}

export default function LikeReaction({
  isAuthenticated,
  publishId,
  liked,
  likesCount,
  disLiked,
}: Props) {
  const [isPending, startTransition] = useTransition()
  // const [optimisticLiked, setOptimisticLiked] = useOptimistic(
  //   liked,
  //   (state, newLiked: boolean) => newLiked
  // )
  const [optimisticLiked, setOptimisticLiked] = useState(!!liked)
  // const [optimisticLikesCount, setOptimisticLikesCount] = useOptimistic(
  //   likesCount,
  //   (state, likesCount: number) => likesCount
  // )
  const [optimisticLikesCount, setOptimisticLikesCount] = useState(likesCount)
  const [optimisticDisLiked, setOptimisticDisLiked] = useState(!!disLiked)

  const { onVisible: openAuthModal } = useAuthContext()

  useEffect(() => {
    setOptimisticLiked(liked)
  }, [liked])

  useEffect(() => {
    setOptimisticLikesCount(likesCount)
  }, [likesCount])

  useEffect(() => {
    setOptimisticDisLiked(disLiked)
  }, [disLiked])

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
  }, [
    isAuthenticated,
    openAuthModal,
    publishId,
    liked,
    likesCount,
    // setOptimisticLiked,
    // setOptimisticLikesCount,
    disLiked,
  ])

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
    <div className="h-[40px] flex items-center rounded-full overflow-hidden divide-x">
      <Reaction
        width={80}
        IconOutline={AiOutlineLike}
        IconFill={AiFillLike}
        desc={`${optimisticLikesCount}`}
        isActive={optimisticLiked}
        onClick={likeDebounce}
      />
      <Reaction
        width={60}
        IconOutline={AiOutlineDislike}
        IconFill={AiFillDislike}
        isActive={optimisticDisLiked}
        onClick={disLikeDebounce}
      />
    </div>
  )
}
