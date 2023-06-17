import React from "react"

import Short from "./Short"

type Props = {
  params: { id: string }
}

export default function Page({ params }: Props) {
  return (
    <div className="fixed z-50 top-0 sm:top-[70px] bottom-0 right-0 left-0 sm:left-[100px]">
      <div className="h-full sm:py-5 flex flex-col items-center">
        <Short />
      </div>
    </div>
  )
}
