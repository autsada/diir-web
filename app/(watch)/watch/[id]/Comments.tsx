"use client"

import React from "react"
import { isMobile } from "react-device-detect"
import { BsCaretDown } from "react-icons/bs"

import Avatar from "@/components/Avatar"
import type { Maybe, Publish, Station } from "@/graphql/codegen/graphql"

interface Props {
  publish: Publish
  profile: Maybe<Station> | undefined
}

export default function Comments({ publish, profile }: Props) {
  return (
    <div className="mt-5">
      {isMobile ? (
        <div className="flex items-center justify-between border-t border-b border-neutral-200 py-5">
          <p>{publish.commentsCount} Comments</p>
          <div className="px-4 py-2">
            <BsCaretDown size={22} />
          </div>
        </div>
      ) : (
        <>
          <p>{publish.commentsCount} Comments</p>
          <div className="mt-5 w-full flex gap-x-2">
            <Avatar profile={profile} />

            <textarea
              name=""
              id=""
              placeholder="Add a comment"
              rows={2}
              className="flex-grow border border-neutral-200 rounded-md px-4 py-1 text-textDark"
            />
          </div>
        </>
      )}
    </div>
  )
}
