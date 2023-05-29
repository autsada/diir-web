import React, { useState, useCallback, useMemo } from "react"
import { BsPlusLg } from "react-icons/bs"
import { MdOutlineKeyboardBackspace } from "react-icons/md"

import ModalWrapper from "@/components/ModalWrapper"
import CreatePlaylistForm from "./CreatePlaylistForm"
import UpdatePlaylistsForm from "./UpdatePlaylistsForm"
import { transformPlaylists } from "@/lib/client"
import type {
  CheckPublishPlaylistsResponse,
  FetchPlaylistsResponse,
} from "@/graphql/codegen/graphql"

interface Props {
  // List of the playlists that the publish was in
  publishPlaylistsData: CheckPublishPlaylistsResponse | undefined
  close: () => void
  publishId: string
  // User's playlists (first 100 items)
  playlistsResult: FetchPlaylistsResponse | undefined
}

export default function AddToPlaylistModal({
  publishPlaylistsData,
  close,
  publishId,
  playlistsResult,
}: Props) {
  const [createFormVisible, setCreateFormVisible] = useState(false)
  const prevPlaylists = useMemo(
    () => transformPlaylists(playlistsResult, publishPlaylistsData),
    [playlistsResult, publishPlaylistsData]
  )

  const [playlists, setPlaylists] = useState(prevPlaylists)
  const [hasMorePlaylists, setHasMorePlaylists] = useState(
    playlistsResult?.pageInfo?.hasNextPage
  )

  const onStartCreateNewPlaylist = useCallback(() => {
    setCreateFormVisible(true)
  }, [])

  const onEndCreateNewPlaylist = useCallback(() => {
    setCreateFormVisible(false)
  }, [])

  if (!publishPlaylistsData) return null

  return (
    <ModalWrapper visible>
      <div className="fixed z-10 inset-0" onClick={close}></div>
      <div className="relative z-20 pt-5 w-[300px] max-w-[80%] text-center bg-white rounded-xl overflow-hidden">
        <div className="px-10 flex items-center justify-between gap-x-5">
          <p className="text-lg">Add to...</p>
          <div
            className="flex-grow flex items-center justify-end gap-x-2 cursor-pointer rounded-md"
            onClick={
              !createFormVisible
                ? onStartCreateNewPlaylist
                : onEndCreateNewPlaylist
            }
          >
            {!createFormVisible ? (
              <>
                <BsPlusLg size={20} className="text-blueBase" />
                <div className="flex-grow text-blueBase">Create playlist</div>
              </>
            ) : (
              <MdOutlineKeyboardBackspace size={24} className="text-blueBase" />
            )}
          </div>
        </div>

        {!createFormVisible ? (
          <UpdatePlaylistsForm
            publishId={publishId}
            onFinished={close}
            playlists={playlists}
            publishPlaylistsData={publishPlaylistsData}
          />
        ) : (
          <CreatePlaylistForm publishId={publishId} onFinished={close} />
        )}
      </div>
    </ModalWrapper>
  )
}
