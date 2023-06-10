import React, { useRef, useCallback, useState, useMemo } from "react"

import { saveToPlaylist } from "../(watch)/watch/[id]/actions"
import ButtonLoader from "@/components/ButtonLoader"
import { transformPlaylists } from "@/lib/client"
import type {
  CheckPublishPlaylistsResponse,
  FetchPlaylistsResponse,
  PageInfo,
  PlaylistEdge,
} from "@/graphql/codegen/graphql"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"

interface Props {
  publishId: string
  onFinished: () => void
  playlists: PlaylistEdge[]
  setPlaylists: React.Dispatch<React.SetStateAction<PlaylistEdge[]>>
  playlistsPageInfo: PageInfo | undefined
  setPlaylistsPageInfo: React.Dispatch<
    React.SetStateAction<PageInfo | undefined>
  >
  publishPlaylistsData: CheckPublishPlaylistsResponse
}

export default function UpdatePlaylistsForm({
  publishId,
  onFinished,
  playlists,
  setPlaylists,
  playlistsPageInfo,
  setPlaylistsPageInfo,
  publishPlaylistsData,
}: Props) {
  const [loading, setLoading] = useState(false)

  // Transform playlist objects for displaying
  const transformedPlaylists = useMemo(
    () => transformPlaylists(playlists, publishPlaylistsData),
    [playlists, publishPlaylistsData]
  )

  const fetchMorePlaylists = useCallback(async () => {
    if (
      !playlistsPageInfo ||
      !playlistsPageInfo.endCursor ||
      !playlistsPageInfo.hasNextPage
    )
      return

    try {
      setLoading(true)
      const res = await fetch(`/library/playlists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cursor: playlistsPageInfo?.endCursor }),
      })
      const data = (await res.json()) as {
        result: FetchPlaylistsResponse
      }
      setPlaylists((prev) => [...prev, ...data.result?.edges])
      setPlaylistsPageInfo(data.result?.pageInfo)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }, [playlistsPageInfo, setPlaylists, setPlaylistsPageInfo])
  const { observedRef } = useInfiniteScroll(0.5, fetchMorePlaylists)

  return (
    <form className="w-full mt-5" action={saveToPlaylist} onSubmit={onFinished}>
      <div className="px-10 max-h-[60vh] overflow-y-auto">
        <PlaylistItem
          name="newWL"
          title="Watch later"
          defaultChecked={publishPlaylistsData?.isInWatchLater}
        />

        {transformedPlaylists.length > 0 &&
          transformedPlaylists.map((playlist) => (
            <PlaylistItem
              key={`${playlist.list?.id}-${playlist.isInPlaylist}`}
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
          defaultValue={publishPlaylistsData?.isInWatchLater ? "on" : "off"}
        />

        {/* Hidden input to send old playlists array to the server action */}
        <input
          type="text"
          name="playlists"
          className="hidden"
          defaultValue={JSON.stringify(transformedPlaylists)}
        />

        <div
          ref={observedRef}
          className="w-full h-4 flex items-center justify-center"
        >
          {loading && (
            <ButtonLoader loading={loading} size={8} color="#d4d4d4" />
          )}
        </div>
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
