import React from "react"
import Link from "next/link"
import { MdComment, MdOutlineComment } from "react-icons/md"

import Reactions from "@/app/(watch)/watch/[id]/Reactions"
import Reaction from "@/app/(watch)/watch/[id]/Reaction"
import type {
  Maybe,
  Publish,
  FetchPlaylistsResponse,
  CheckPublishPlaylistsResponse,
} from "@/graphql/codegen/graphql"

interface Props {
  isAuthenticated: boolean
  publish: Publish
  playlistsResult: Maybe<FetchPlaylistsResponse> | undefined
  publishPlaylistsData: Maybe<CheckPublishPlaylistsResponse> | undefined
  likeBtnVerticalLayout?: boolean
  likeDescriptionColor?: string
}

export default function Actions({
  isAuthenticated,
  publish,
  playlistsResult,
  publishPlaylistsData,
  likeBtnVerticalLayout,
  likeDescriptionColor,
}: Props) {
  return (
    <>
      <Reactions
        publish={publish}
        isAuthenticated={isAuthenticated}
        playlistsResult={playlistsResult || undefined}
        publishPlaylistsData={publishPlaylistsData}
        withLikeDescription={true}
        likeBtnVerticalLayout={likeBtnVerticalLayout}
        likeDescriptionColor={likeDescriptionColor}
        withTipDescription={false}
        withShareDescription={false}
        withSaveDescription={false}
        withReportDescription={false}
      />
      <Link href={`/shorts?id=${publish.id}`}>
        <div className="text-center">
          <div className="h-[40px] flex items-center rounded-full overflow-hidden bg-gray-100">
            <Reaction
              IconOutline={MdComment}
              IconFill={MdOutlineComment}
              withDescription={false}
              onClick={() => {}}
            />
          </div>
          <p className="text-xs sm:text-sm">
            {publish.commentsCount ? publish.commentsCount : <>&nbsp;</>}
          </p>
        </div>
      </Link>
    </>
  )
}
