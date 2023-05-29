import React, { useState, useCallback, useRef, useMemo } from "react"
import { BsPlusLg } from "react-icons/bs"
import { MdOutlineKeyboardBackspace } from "react-icons/md"
import { toast } from "react-toastify"

import ModalWrapper from "@/components/ModalWrapper"
import { createNewPlaylist, saveToPlaylist } from "./actions"
import type {
  CheckPublishPlaylistsResponse,
  FetchPlaylistsResponse,
} from "@/graphql/codegen/graphql"
import { transformPlaylists } from "@/lib/client"

interface Props {
  // List of the playlists that the publish was in
  data: CheckPublishPlaylistsResponse | undefined
  close: () => void
  publishId: string
  // User's playlists (first 100 items)
  playlistsResult: FetchPlaylistsResponse | undefined
}

export default function AddToPlaylistModal({
  data,
  close,
  publishId,
  playlistsResult,
}: Props) {
  const [createFormVisible, setCreateFormVisible] = useState(false)
  const prevPlaylists = useMemo(
    () => transformPlaylists(playlistsResult, data),
    [playlistsResult, data]
  )

  const [playlists, setPlaylists] = useState(prevPlaylists)
  const [hasMorePlaylists, setHasMorePlaylists] = useState(
    playlistsResult?.pageInfo?.hasNextPage
  )

  const nameRef = useRef<HTMLInputElement>(null)

  const onStartCreateNewPlaylist = useCallback(() => {
    setCreateFormVisible(true)
  }, [])

  const onEndCreateNewPlaylist = useCallback(() => {
    setCreateFormVisible(false)
  }, [])

  if (!data) return null

  return (
    <ModalWrapper visible>
      <div className="fixed z-10 inset-0" onClick={close}></div>
      <div className="relative z-20 py-5 px-10 w-[300px] max-w-[80%] text-center bg-white rounded-xl">
        <div className="flex items-center justify-between gap-x-5">
          <p className="text-lg">Add to...</p>
          <div
            className="flex-grow flex items-center justify-center gap-x-2 cursor-pointer rounded-md"
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
          <form
            className="w-full mt-5 px-2"
            action={saveToPlaylist}
            onSubmit={close}
          >
            {/* Hidden input to send publish id to the server action */}
            <input
              type="text"
              name="publish"
              className="hidden"
              defaultValue={publishId}
            />

            {/* Hidden input to send old watch later status to the server action */}
            <input
              type="text"
              name="oldWL"
              className="hidden"
              defaultValue={data.isInWatchLater ? "on" : "off"}
            />

            {/* Hidden input to send old playlists array to the server action */}
            <input
              type="text"
              name="playlists"
              className="hidden"
              defaultValue={JSON.stringify(playlists)}
            />

            <PlaylistItem
              name="newWL"
              title="Watch later"
              defaultChecked={data.isInWatchLater}
            />

            {playlists.length > 0 &&
              playlists.map((playlist) => (
                <PlaylistItem
                  key={playlist.list?.id}
                  name={playlist.list?.id || ""}
                  title={playlist.list?.name || ""}
                  defaultChecked={!!playlist.isInPlaylist}
                />
              ))}

            <button
              type="submit"
              className="w-full mt-5 bg-neutral:50 hover:bg-neutral-100 rounded-md font-semibold"
            >
              Done
            </button>
          </form>
        ) : (
          <form
            className="w-full mt-5 px-2"
            action={createNewPlaylist}
            onSubmit={() => {
              close()
              toast.success("Added to playlist", { theme: "dark" })
            }}
          >
            <h6 className="text-left text-base mb-1">Create new playlist</h6>
            <label htmlFor="name">
              <input
                ref={nameRef}
                type="text"
                name="name"
                maxLength={120}
                required
                placeholder="Playlist name (max 120)"
                className="block w-full border border-neutral-200 focus:border-orange-500 rounded-md h-[40px] px-2"
              />
            </label>
            {/* Hidden input to send publish id to server action */}
            <input
              type="text"
              name="publish"
              className="hidden"
              defaultValue={publishId}
            />

            <button
              type="submit"
              className="w-full mt-5 bg-neutral:50 hover:bg-neutral-100 rounded-md font-semibold"
            >
              Create
            </button>
          </form>
        )}
      </div>
    </ModalWrapper>
  )
}

function PlaylistItem({
  name,
  title,
  defaultChecked,
}: {
  name: string
  title: string
  defaultChecked: boolean
}) {
  const ref = useRef<HTMLInputElement>(null)

  const handleClick = useCallback(() => {
    if (ref.current) {
      ref.current.click()
    }
  }, [])

  return (
    <div className="my-1 py-2 flex items-center justify-between gap-x-10 cursor-pointer">
      <div className="w-max">
        <input
          ref={ref}
          type="checkbox"
          name={name}
          defaultChecked={defaultChecked}
          className="w-[20px] h-[20px] flex items-center justify-center font-semibold text-lg border-[2px] border-neutral-400 cursor-pointer"
        />
      </div>
      <div className="h-full flex-grow" onClick={handleClick}>
        <p className="text-left">{title}</p>
      </div>
    </div>
  )
}
