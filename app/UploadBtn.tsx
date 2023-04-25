"use client"

import React from "react"
import Link from "next/link"
import { HiPlus } from "react-icons/hi2"

export default function UploadBtn() {
  return (
    <div className="w-[50px] h-[50px] mx-auto flex items-center justify-center rounded-full cursor-pointer bg-orange-500 hover:bg-orange-400">
      <Link href="/upload">
        <HiPlus size={26} className="text-white" />
      </Link>
    </div>
  )
}
