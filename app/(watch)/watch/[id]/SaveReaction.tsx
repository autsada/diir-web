import React, { useCallback, useState, useMemo, useEffect } from "react"
import { AiOutlineFolderAdd, AiFillFolderAdd } from "react-icons/ai"

import Reaction from "./Reaction"
import AddToPlaylistModal from "@/app/(publishes)/AddToPlaylistModal"
import { useAuthContext } from "@/context/AuthContext"
import type {
  CheckPublishPlaylistsResponse,
  FetchPlaylistsResponse,
  Maybe,
  PageInfo,
  PlaylistEdge,
} from "@/graphql/codegen/graphql"

interface Props {
  isAuthenticated: boolean
  publishId: string
  playlistsResult: FetchPlaylistsResponse | undefined
  publishPlaylistsData: Maybe<CheckPublishPlaylistsResponse> | undefined
}

export default function SaveReaction({
  publishId,
  isAuthenticated,
  playlistsResult,
  publishPlaylistsData,
}: Props) {
  const [addToPlaylistsModalVisible, setAddToPlaylistsModalVisible] =
    useState(false)
  const { onVisible: openAuthModal } = useAuthContext()

  const initialPlaylists = useMemo(
    () => playlistsResult?.edges || [],
    [playlistsResult]
  )
  const initialPageInfo = useMemo(
    () => playlistsResult?.pageInfo,
    [playlistsResult]
  )
  const [playlists, setPlaylists] = useState<PlaylistEdge[]>([])
  const [playlistsPageInfo, setPlaylistsPageInfo] = useState<
    PageInfo | undefined
  >()

  // Set playlists and playlists page info based on initial values
  useEffect(() => {
    setPlaylists(initialPlaylists)
    setPlaylistsPageInfo(initialPageInfo)
  }, [initialPlaylists, initialPageInfo])

  const handleSavePublish = useCallback(async () => {
    if (!publishId) return

    if (!isAuthenticated) {
      openAuthModal()
    } else {
      setAddToPlaylistsModalVisible(true)
    }
  }, [publishId, isAuthenticated, openAuthModal])

  const closeAddToPlaylistsModal = useCallback(() => {
    setAddToPlaylistsModalVisible(false)
  }, [])

  return (
    <>
      <div className="h-[40px] flex items-center rounded-full overflow-hidden divide-x bg-gray-100">
        <Reaction
          width={100}
          IconOutline={AiOutlineFolderAdd}
          IconFill={AiFillFolderAdd}
          desc="Save"
          isActive={false}
          onClick={handleSavePublish}
        />
      </div>

      {/* Add to playlist modal */}
      {addToPlaylistsModalVisible && publishPlaylistsData && publishId && (
        <AddToPlaylistModal
          closeModal={closeAddToPlaylistsModal}
          publishId={publishId}
          playlists={playlists}
          setPlaylists={setPlaylists}
          playlistsPageInfo={playlistsPageInfo}
          setPlaylistsPageInfo={setPlaylistsPageInfo}
          publishPlaylistsData={publishPlaylistsData}
        />
      )}
    </>
  )
}
