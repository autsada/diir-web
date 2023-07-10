import React from "react"
import { notFound, redirect } from "next/navigation"
import type { Metadata, ResolvingMetadata } from "next"

import Avatar from "@/components/Avatar"
import StationName from "@/components/StationName"
import Link from "next/link"
import ManageFollow from "../../watch/[id]/ManageFollow"
import BlogReactions from "./BlogReactions"
import Content from "./Content"
import { getAccount } from "@/lib/server"
import { getStationById, getWatchingPublish } from "@/graphql"
import { calculateTimeElapsed, formatDate } from "@/lib/client"

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

  const imageUrl = publish?.thumbnail || ""

  return {
    title: publish?.title || "",
    description: publish?.blog?.excerpt || "",
    openGraph: {
      title: publish?.title || "",
      description: publish?.blog?.excerpt || "",
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
      description: publish?.blog?.excerpt || "",
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

export default async function Read({ params }: Props) {
  const data = await getAccount()
  const account = data?.account

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

  return (
    <div className="h-max min-h-full w-full sm:w-[80%] md:w-[650px] lg:w-[700px] xl:w-[750px] mx-auto pb-20">
      {publish.thumbnail && (
        <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-5">
          <img
            src={publish.thumbnail}
            alt={publish.title || publish.filename || "ViewWit blog"}
            className="w-full h-[200px] md:h-[300px] lg:h-[320px] xl:h-[350px] object-cover"
          />
        </div>
      )}
      <div className="p-2">
        <div className="w-full flex items-stretch gap-x-2">
          <Avatar profile={publish.creator} />
          <div className="flex-grow text-left">
            <StationName profile={publish.creator} />
            <p className="font-light text-textLight text-sm sm:text-base">
              {calculateTimeElapsed(publish.createdAt)}
            </p>
          </div>
          <ManageFollow
            isAuthenticated={!!account}
            follow={publish.creator}
            ownerHref={`/upload/${publish.id}`}
            ownerLinkText="Edit"
          />
        </div>

        <div className="mb-2 py-4 w-full overflow-x-auto scrollbar-hide">
          <BlogReactions isAuthenticated={!!account} publish={publish} />
        </div>

        <div className="w-full">
          <div className="flex items-center gap-x-4">
            <p className="italic font-light text-textLight text-sm">
              Posted on {formatDate(new Date())}{" "}
            </p>
            <p className="text-2xl">&#183;</p>
            <p className="font-light text-sm">{publish.blog?.readingTime}</p>
          </div>
          <div className="mb-4">
            <h1 className="mb-1 text-3xl md:text-4xl xl:text-5xl xl:leading-[3.5rem]">
              {publish.title}
            </h1>
            {publish.tags && publish.tags.split(" ").length > 0 && (
              <div className="w-max flex items-center gap-4 cursor-pointer">
                {publish.tags.split(" ").map((tag) => (
                  <Link key={tag} href={`/tag/${tag}`}>
                    <div className="text-textLight px-2 py-1 rounded-full cursor-pointer hover:bg-neutral-100">
                      #{tag}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <Content content={publish.blog?.htmlContent || ""} />
      </div>
    </div>
  )
}
