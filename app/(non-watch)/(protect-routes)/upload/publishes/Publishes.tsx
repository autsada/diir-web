import React from "react"

import PublishItem from "./PublishItem"
import type { Publish } from "@/graphql/types"

interface Props {
  publishes: Publish[]
}

export default function Publishes({ publishes }: Props) {
  return publishes.length === 0 ? (
    <div className="px-4">
      <p className="font-normal">No publishes found</p>
    </div>
  ) : (
    <div className="px-0 sm:px-4 overflow-y-auto">
      <table className="table-fixed w-full border-collapse border border-gray-200">
        <thead>
          <tr className="text-sm font-semibold bg-gray-100">
            <th className="w-[33%] sm:w-[13%] font-normal py-2 border border-gray-200 break-words">
              Content
            </th>
            <th className="w-[27%] sm:w-[12%] font-normal py-2 border border-gray-200 break-words">
              Title
            </th>
            <th className="w-[25%] sm:w-[20%] font-normal py-2 border border-gray-200 hidden lg:table-cell break-words">
              Description
            </th>
            <th className="w-[15%] sm:w-[10%] font-normal py-2 border border-gray-200 break-words">
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
    </div>
  )
}
