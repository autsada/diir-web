"use client"

import React from "react"
import { MdContentCopy } from "react-icons/md"

interface Props {
  address: string
  balance: string
}

export default function Address({ address, balance }: Props) {
  return (
    <div className="text-textLight px-2 max-w-max flex items-center bg-gray-100 rounded-md cursor-pointer">
      <div className="text-xs sm:text-base p-2">{address}</div>
      <MdContentCopy size={20} className="cursor-pointer" />
    </div>
  )
}
