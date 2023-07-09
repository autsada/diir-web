import React from "react"

import Blogs from "./Blogs"
import { getAccount } from "@/lib/server"
import { getStationById, fetchBlogs } from "@/graphql"

interface Props {
  searchParams: { feed?: string }
}

export default async function Page({ searchParams }: Props) {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken

  // Query station by id
  const profile =
    !account || !idToken || !account.defaultStation
      ? undefined
      : await getStationById(account?.defaultStation?.id)

  const feed = searchParams.feed

  // Fetch blogs (for you)
  const blogsResult = await fetchBlogs({
    cursor: null,
    requestorId: profile?.id,
  })

  // Fetch blogs (latest)
  const latestResult = await fetchBlogs({
    cursor: null,
    requestorId: profile?.id,
    orderBy: "latest",
  })

  // Fetch blogs (popular)
  const popularResult = await fetchBlogs({
    cursor: null,
    requestorId: profile?.id,
    orderBy: "popular",
  })

  return (
    <div className="px-2 sm:px-4 py-2 sm:ml-[100px]">
      <Blogs
        isAuthenticated={!!account}
        feed={feed}
        fetchResult={blogsResult}
        latestResult={latestResult}
        popularResult={popularResult}
      />
    </div>
  )
}
