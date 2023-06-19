"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { onSnapshot, doc } from "firebase/firestore"

import LikeReaction from "./LikeReaction"
import TipReaction from "./TipReaction"
import ShareReaction from "./ShareReaction"
import SaveReaction from "./SaveReaction"
import ReportReaction from "./ReportReaction"

import { db, publishesCollection } from "@/firebase/config"
import type {
  CheckPublishPlaylistsResponse,
  FetchPlaylistsResponse,
  Maybe,
  Publish,
} from "@/graphql/codegen/graphql"

interface Props {
  publish: Publish
  isAuthenticated: boolean
  playlistsResult: FetchPlaylistsResponse | undefined
  publishPlaylistsData: Maybe<CheckPublishPlaylistsResponse> | undefined
  withReactDescription?: boolean
}

export default function Reactions({
  publish,
  isAuthenticated,
  playlistsResult,
  publishPlaylistsData,
  withReactDescription = true,
}: Props) {
  const router = useRouter()

  // Listen to update in Firestore
  useEffect(() => {
    if (!publish?.id) return

    const unsubscribe = onSnapshot(
      doc(db, publishesCollection, publish?.id),
      (doc) => {
        // Reload data to get the most updated publish
        router.refresh()
      }
    )

    return unsubscribe
  }, [router, publish?.id])

  return (
    <>
      <LikeReaction
        isAuthenticated={isAuthenticated}
        publishId={publish?.id}
        liked={!!publish?.liked}
        likesCount={publish?.likesCount}
        disLiked={!!publish?.disLiked}
        withDescription={withReactDescription}
      />
      <TipReaction
        isAuthenticated={isAuthenticated}
        publish={publish}
        withDescription={withReactDescription}
      />
      <ShareReaction
        publishId={publish.id}
        title={publish.title || ""}
        withDescription={withReactDescription}
      />
      <SaveReaction
        publishId={publish?.id}
        isAuthenticated={isAuthenticated}
        playlistsResult={playlistsResult}
        publishPlaylistsData={publishPlaylistsData}
        withDescription={withReactDescription}
      />
      <ReportReaction
        publishId={publish?.id}
        withDescription={withReactDescription}
      />
    </>
  )
}
