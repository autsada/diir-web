import React from "react"

import NonWatchSideBar from "./NonWatchSideBar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="hidden w-[100px] fixed top-[70px] bottom-0 bg-white py-5 px-2 sm:block overflow-y-auto">
        <NonWatchSideBar />
      </div>

      <div className="sm:ml-[100px]">{children}</div>
    </>
  )
}
