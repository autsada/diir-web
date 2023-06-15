import React from "react"

import PublishTabs from "./PublishTabs"
import type { Station } from "@/graphql/codegen/graphql"

interface Props {
  station: Station
}

export default function PublishTemplate({ station }: Props) {
  return (
    <div className="px-0 sm:px-4">
      <div className="mt-2">
        <PublishTabs station={station} />
      </div>
    </div>
  )
}
