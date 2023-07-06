import React, { Suspense } from "react"
import { notFound, redirect } from "next/navigation"
import type { Metadata, ResolvingMetadata } from "next"

import { getAccount } from "@/lib/server"
import {
  checkPublishPlaylists,
  fetchComments,
  fetchMyPlaylists,
  fetchSuggestedVideos,
  getStationById,
  getWatchingPublish,
} from "@/graphql"
import { calculateTimeElapsed } from "@/lib/client"

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  // Query a publish
  const publish = await getWatchingPublish({
    targetId: params.id,
  })

  const imageUrl =
    publish?.thumbSource === "custom" && publish?.thumbnail
      ? publish.thumbnail
      : publish?.playback
      ? publish.playback.thumbnail
      : ""

  return {
    title: publish?.title || "",
    description: publish?.description || "",
    openGraph: {
      title: publish?.title || "",
      description: publish?.description || "",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      title: publish?.title || "",
      description: publish?.description || "",
      card: "summary_large_image",
      site: "@DiiRxyz",
      creator: "@DiiRxyz",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: publish?.title || "",
        },
      ],
    },
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "standard",
        "max-snippet": -1,
      },
    },
  }
}

export default async function Watch({ params }: Props) {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken
  const signature = data?.signature

  // Query station by id
  const station =
    account && account.defaultStation
      ? await getStationById(account?.defaultStation?.id)
      : null

  // Query a publish
  const publish = await getWatchingPublish({
    targetId: params.id,
    requestorId: station ? station.id : null,
  })

  if (!publish) {
    notFound()
  }

  if (publish.kind === "Short") {
    redirect(`/shorts?id=${publish.id}`)
  }

  if (publish.kind === "Video") {
    redirect(`/watch/${publish.id}`)
  }

  return <div className="px-4 py-2 bg-red-300">Blog</div>
}
