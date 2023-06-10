"use client"

import React from "react"
import { MdOutlinePlaylistAdd } from "react-icons/md"

export default function Playlists() {
  return (
    <div className="w-full py-5 flex items-center justify-between">
      <div className="w-full flex items-start gap-x-4 cursor-pointer">
        <MdOutlinePlaylistAdd size={28} />
        <h6 className="text-lg sm:text-xl">Playlists</h6>
      </div>
    </div>
  )
}
