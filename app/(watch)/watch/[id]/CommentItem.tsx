import React from "react"
import {
  AiOutlineDislike,
  AiFillDislike,
  AiFillLike,
  AiOutlineLike,
} from "react-icons/ai"

import Avatar from "@/components/Avatar"
import { useExpandContent } from "@/hooks/useExpandContent"
import type { Comment, Maybe } from "@/graphql/codegen/graphql"

interface Props {
  comment: Maybe<Comment> | undefined
}

export default function CommentItem({ comment }: Props) {
  const content = comment?.content || ""
  const initialDisplayed = 200
  const { displayedContent, expandContent, shrinkContent } = useExpandContent(
    content,
    initialDisplayed
  )

  const liked = !!comment?.liked
  const likesCount = comment?.likesCount || 0
  const disLiked = !!comment?.disLiked

  if (!comment) return null

  return (
    <div className="w-full mb-5 flex items-start gap-x-4">
      <div>
        <Avatar profile={comment.creator} />
      </div>
      <div>
        <div className="flex items-center gap-x-2">
          <h6 className="text-sm">{comment.creator?.displayName || ""}</h6>
          <span className="text-thin text-xs">|</span>
          <p className="font-light text-sm text-textLight">
            @{comment.creator?.name || ""}
          </p>
        </div>
        <div className="mt-1 text-sm">
          {displayedContent}{" "}
          {comment?.content.length > displayedContent.length && (
            <span
              className="ml-1 font-semibold cursor-pointer"
              onClick={expandContent}
            >
              Show more
            </span>
          )}
          {content.length > initialDisplayed &&
            content.length === displayedContent.length && (
              <p
                className="mt-2 font-semibold cursor-pointer"
                onClick={shrinkContent}
              >
                Show less
              </p>
            )}
        </div>
        {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis mollitia neque nulla perspiciatis nesciunt perferendis aspernatur obcaecati. Magni explicabo corrupti eaque deserunt voluptates. Laborum voluptatum quod hic corporis ullam quo? Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, laudantium. Eos, omnis! Voluptatum quae esse tempora amet asperiores assumenda inventore dolorum ad quasi rem, soluta excepturi, expedita sed sapiente natus?</p> */}
        <div className="flex items-center gap-x-8">
          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-1">
              <div className="cursor-pointer p-1 flex items-center justify-center rounded-full hover:bg-neutral-100">
                {liked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
              </div>
              <p className="text-sm text-textLight">{likesCount}</p>
            </div>
            <div>
              <div className="cursor-pointer p-1 flex items-center justify-center rounded-full hover:bg-neutral-100">
                {disLiked ? (
                  <AiFillDislike size={20} />
                ) : (
                  <AiOutlineDislike size={20} />
                )}
              </div>
            </div>
          </div>
          <button className="mx-0 font-semibold text-sm hover:bg-neutral-200 px-3 h-8 rounded-full">
            Reply
          </button>
        </div>
      </div>
    </div>
  )
}
