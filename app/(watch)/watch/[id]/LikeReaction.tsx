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
import { likePublish } from "./actions"

interface Props {
  publishId: string
  liked: boolean
  likesCount: number
}

export default function LikeReaction({ publishId, liked, likesCount }: Props) {
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

  useEffect(() => {
    setOptimisticLiked(liked)
  }, [liked])

  useEffect(() => {
    setOptimisticLikesCount(likesCount)
  }, [likesCount])

  const handleLikePublish = useCallback(() => {
    if (!publishId) return
    setOptimisticLiked(!liked)
    setOptimisticLikesCount(
      liked ? (likesCount > 0 ? likesCount - 1 : likesCount) : likesCount + 1
    )
    startTransition(() => likePublish(publishId))
  }, [
    publishId,
    liked,
    likesCount,
    setOptimisticLiked,
    setOptimisticLikesCount,
  ])

  const likeDebounce = useMemo(
    () => _.debounce(handleLikePublish, 200),
    [handleLikePublish]
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
        isActive={false}
        onClick={() => {}}
      />
    </div>
  )
}
