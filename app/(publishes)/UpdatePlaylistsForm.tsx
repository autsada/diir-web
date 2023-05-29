import { Maybe } from "graphql/jsutils/Maybe"
import React, { useRef, useCallback } from "react"

import { saveToPlaylist } from "./actions"
import type {
  CheckPublishPlaylistsResponse,
  Playlist,
} from "@/graphql/codegen/graphql"

interface Props {
  publishId: string
  onFinished: () => void
  // List of the playlists that the publish was in
  publishPlaylistsData: CheckPublishPlaylistsResponse
  playlists: {
    isInPlaylist: boolean | undefined
    list: Maybe<Playlist> | undefined
  }[]
}

export default function UpdatePlaylistsForm({
  publishId,
  onFinished,
  publishPlaylistsData,
  playlists,
}: Props) {
  return (
    <form className="w-full mt-5" action={saveToPlaylist} onSubmit={onFinished}>
      <div className="px-10 max-h-[60vh] overflow-y-auto">
        <PlaylistItem
          name="newWL"
          title="Watch later"
          defaultChecked={publishPlaylistsData.isInWatchLater}
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
          defaultValue={publishPlaylistsData.isInWatchLater ? "on" : "off"}
        />

        {/* Hidden input to send old playlists array to the server action */}
        <input
          type="text"
          name="playlists"
          className="hidden"
          defaultValue={JSON.stringify(playlists)}
        />
      </div>

      <div className="w-full border-t border-neutral-100 bg-white">
        <button
          type="submit"
          className="w-full h-12 bg-neutral:50 hover:bg-neutral-100 rounded-md font-semibold"
        >
          Done
        </button>
      </div>
    </form>
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
