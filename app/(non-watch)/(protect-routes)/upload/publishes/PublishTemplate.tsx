import React from "react"

import PublishTabs from "./PublishTabs"
import type { Station } from "@/graphql/types"

interface Props {
  station: Station
}

export default function PublishTemplate({ station }: Props) {
  return (
    <>
      <h5>Publishes dashboard</h5>

      <div className="mt-4 py-2">
        <PublishTabs station={station} />
      </div>
    </>
  )
}
