import React from "react"

import Blogs from "./Blogs"
import { getAccount } from "@/lib/server"
import { getStationById, fetchBlogs } from "@/graphql"

export default async function Page() {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken

  // Query station by id
  const station =
    !account || !idToken || !account.defaultStation
      ? undefined
      : await getStationById(account?.defaultStation?.id)

  // Fetch blogs
  const blogsResult = await fetchBlogs({
    cursor: null,
    requestorId: station?.id,
  })

  return (
    <div className="sm:ml-[100px]">
      <Blogs isAuthenticated={!!account} fetchResult={blogsResult} />
    </div>
  )
}
