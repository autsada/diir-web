import React from "react"

import { getAccount } from "@/lib/server"
import { getMyPublishes, getStationById } from "@/graphql"
import { redirect } from "next/navigation"
import type { Station, UploadedPublish } from "@/graphql/types"
import PublishItem from "./PublishItem"

export default async function AllPublishes() {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken
  const signature = data?.signature

  if (!idToken) {
    redirect("/")
  }

  if (!account?.defaultStation) {
    redirect("/station")
  }

  // Query station by id
  const station = (await getStationById(account?.defaultStation?.id)) as Station

  if (!station) {
    redirect("/settings")
  }

  // Query all publishes created by the station.
  const publishes = (await getMyPublishes({
    idToken,
    signature,
    data: {
      accountId: account.id,
      owner: account.owner,
      creatorId: station.id,
    },
  })) as UploadedPublish[]

  return (
    <>
      {publishes.length === 0 ? (
        <div className="px-4">
          <h6 className="font-normal">No publishes found</h6>
        </div>
      ) : (
        <div className="px-0 sm:px-4 overflow-y-auto">
          <table className="table-fixed w-full border-collapse border border-gray-200">
            <thead>
              <tr className="text-sm font-semibold bg-gray-100">
                <th className="w-[35%] sm:w-[15%] font-normal py-2 border border-gray-200 break-words">
                  Content
                </th>
                <th className="w-[25%] sm:w-[10%] font-normal py-2 border border-gray-200 break-words">
                  Title
                </th>
                <th className="w-[20%] sm:w-[15%] font-normal py-2 border border-gray-200 hidden sm:table-cell break-words">
                  Description
                </th>
                <th className="w-[20%] sm:w-[15%] font-normal py-2 border border-gray-200 break-words">
                  Visibility
                </th>
                <th className="w-[20%] sm:w-[10%] font-normal py-2 border border-gray-200 break-words">
                  Date
                </th>
                <th className="w-[20%] sm:w-[7%] font-normal py-2 border border-gray-200 hidden sm:table-cell break-words">
                  Views
                </th>
                <th className="w-[20%] sm:w-[7%] font-normal py-2 border border-gray-200 hidden sm:table-cell break-words">
                  Tips
                </th>
                <th className="w-[20%] sm:w-[7%] font-normal py-2 border border-gray-200 hidden sm:table-cell break-words">
                  Comments
                </th>
                <th className="w-[20%] sm:w-[7%] font-normal py-2 border border-gray-200 hidden sm:table-cell break-words">
                  Likes
                </th>
                <th className="w-[20%] sm:w-[7%] font-normal py-2 border border-gray-200 hidden sm:table-cell break-words">
                  Dislikes
                </th>
              </tr>
            </thead>

            <tbody>
              {publishes.map((publish) => (
                <PublishItem key={publish.id} publish={publish} />
              ))}
            </tbody>
          </table>
          {/* {publishes.map((pub) => (
            <PublishItem key={pub.id} publish={pub} />
          ))} */}
        </div>
      )}
    </>
  )
}
