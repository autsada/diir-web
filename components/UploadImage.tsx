"use client"

import React, { useState, useCallback } from "react"
import Image from "next/image"
import Dropzone from "react-dropzone"
import { CiTrash } from "react-icons/ci"
import { BsUpload } from "react-icons/bs"

import Avatar from "./Avatar"
import type { FileWithPrview } from "@/types"
import type { Account, Station } from "@/graphql/types"

interface Props {
  station: Station
}

export default function UploadImage({ station }: Props) {
  const [image, setImage] = useState<FileWithPrview>()
  const [uploading, setUploading] = useState(false)
  const [imageError, setImageError] = useState("")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    const f = acceptedFiles[0] as FileWithPrview

    // Check size
    if (f.size / 1000 > 4096) {
      setImageError("File too big")
    }
    const fileWithPreview = Object.assign(f, {
      preview: URL.createObjectURL(f),
    })

    setImage(fileWithPreview)
  }, [])

  return (
    <div
      className={`relative mx-auto w-[150px] h-[150px] cursor-pointer rounded ${
        !!imageError ? "border-[2px] border-red-500" : "border border-gray-200"
      }`}
    >
      <Avatar profile={station} width={150} height={150} fontSize="text-6xl" />
    </div>
  )
}
