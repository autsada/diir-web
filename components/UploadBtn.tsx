"use client"

import React from "react"
import Link from "next/link"
import { MdOutlineVideoCall } from "react-icons/md"

export default function UploadBtn({
  isAuthenticated,
  onClick,
  size = 30,
  color = "white",
}: {
  isAuthenticated: boolean
  onClick?: () => void
  size?: number
  color?: string
}) {
  return !isAuthenticated ? (
    <div onClick={onClick}>
      <MdOutlineVideoCall
        size={size}
        color={color}
        className="cursor-pointer"
      />
    </div>
  ) : (
    <Link href="/upload">
      <MdOutlineVideoCall
        size={size}
        color={color}
        className="cursor-pointer"
      />
    </Link>
  )
}
