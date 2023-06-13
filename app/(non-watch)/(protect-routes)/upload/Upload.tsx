"use client"

import React, { useCallback, useState } from "react"
import { AiFillRead } from "react-icons/ai"
import { MdPlayArrow } from "react-icons/md"
import type { IconType } from "react-icons/lib"

import UploadModal from "./UploadModal"

type ContentType = "video" | "blog"

interface Props {
  idToken: string
  stationName: string
}

export default function Upload({ idToken, stationName }: Props) {
  const [contentType, setContentType] = useState<ContentType>()

  const selectContentType = useCallback((t: ContentType) => {
    setContentType(t)
  }, [])

  const cancelSelectContentType = useCallback(() => {
    setContentType(undefined)
  }, [])

  return (
    <>
      <div className="mt-5 flex flex-col sm:flex-row sm:justify-around gap-y-5 sm:gap-y-0 sm:gap-x-5">
        <UploadType
          title="Upload videos / podcasts."
          Icon={MdPlayArrow}
          buttonText="Upload"
          onClick={selectContentType.bind(undefined, "video")}
        />
        <UploadType
          title="Create blogs."
          Icon={AiFillRead}
          buttonText="Create"
          onClick={selectContentType.bind(undefined, "blog")}
          iconBgColor="bg-blue-500"
        />
      </div>

      {contentType === "video" && (
        <UploadModal
          cancelUpload={cancelSelectContentType}
          idToken={idToken}
          stationName={stationName}
        />
      )}
    </>
  )
}

function UploadType({
  title,
  Icon,
  buttonText,
  onClick,
  iconBgColor = "bg-orangeDark",
}: {
  title: string
  Icon: IconType
  buttonText: string
  onClick: () => void
  iconBgColor?: string
}) {
  return (
    <div className="w-full sm:w-[50%] md:w-[40%] lg:w-[35%] text-center px-5 py-10 border border-gray-200 rounded-md">
      <p>{title}</p>
      <div className="my-10">
        <div
          className={`w-[120px] h-[120px] mx-auto rounded-full flex items-center justify-center ${iconBgColor}`}
        >
          <Icon size={50} color="white" />
        </div>
      </div>
      <button type="button" className="btn-light w-[100px]" onClick={onClick}>
        {buttonText}
      </button>
    </div>
  )
}
