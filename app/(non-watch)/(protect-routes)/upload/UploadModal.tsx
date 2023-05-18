import React, { useState, useCallback } from "react"
import { MdFileUpload } from "react-icons/md"
import { useDropzone } from "react-dropzone"
import { useRouter } from "next/navigation"

import CloseButton from "@/components/CloseButton"
import ModalWrapper from "@/components/ModalWrapper"
import ButtonLoader from "@/components/ButtonLoader"
import Mask from "@/components/Mask"
import type { FileWithPrview } from "@/types"

interface Props {
  cancelUpload: () => void
  idToken: string
  stationName: string
}

/**
 * A function to call an upload route in the Upload Service
 */
function upload({
  idToken,
  file,
  publishId,
  stationName,
}: {
  idToken: string
  file: File
  publishId: string
  stationName: string
}) {
  const uploadURL =
    process.env.NEXT_PUBLIC_UPLOAD_URL || "http://localhost:4444"
  // const uploadURL =
  //   process.env.NEXT_PUBLIC_UPLOAD_URL ||
  //   "https://a576-2405-9800-b961-39d-5525-e14-5891-4bec.ngrok-free.app"

  const formData = new FormData()
  formData.append("file", file!)
  formData.append("publishId", publishId)
  formData.append("stationName", stationName)

  return fetch(`${uploadURL}/publishes/upload`, {
    method: "POST",
    headers: {
      "id-token": idToken,
    },
    body: formData,
  })
}

export default function UploadModal({
  cancelUpload,
  idToken,
  stationName,
}: Props) {
  const [fileError, setFileError] = useState("")
  const [draftLoading, setDraftLoading] = useState(false)

  const router = useRouter()

  const createDraft = useCallback(
    async (file: FileWithPrview) => {
      setDraftLoading(true)
      const result = await fetch(`/upload/draft`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: file.name,
        }),
      })
      const data = await result.json()
      // Upload file to cloud storage (without waiting)
      upload({ idToken, file, publishId: data?.id, stationName })
      // Push user to upload/[id]
      router.push(`/upload/${data?.id}`)
    },
    [router, idToken, stationName]
  )

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files
      const f = acceptedFiles[0] as FileWithPrview

      // Check size
      if (f.size / 1000 > 102400000) {
        // Maximum allowed image size = 100GB
        setFileError("File too big")
      }
      const fileWithPreview = Object.assign(f, {
        preview: URL.createObjectURL(f),
      })

      // Create a draft publish immediately
      createDraft(fileWithPreview)
    },
    [createDraft]
  )

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop: onDrop,
    accept: {
      "video/*": [],
    },
  })

  return (
    <ModalWrapper visible>
      <div className="w-full h-full min-w-full min-h-full max-w-full max-h-full flex items-center justify-center">
        <div className="relative w-[95%] h-[95%] pb-20 bg-white rounded-md overflow-hidden">
          <div className="w-full py-2 px-5 8-red-200 flex items-center justify-between border-b border-gray-100">
            <h6>Upload videos / podcasts</h6>
            <div>
              <CloseButton onClick={cancelUpload} className="text-base" />
            </div>
          </div>

          <div className="h-full flex flex-col items-center justify-center px-5">
            <div
              className="text-center"
              {...getRootProps({
                isDragActive,
                isDragReject,
                isDragAccept,
              })}
            >
              <input {...getInputProps()} />
              <div className="w-[200px] h-[200px] mx-auto rounded-full bg-gray-100 flex items-center justify-center cursor-pointer">
                {draftLoading ? (
                  <ButtonLoader loading color="#3b82f6" />
                ) : (
                  <MdFileUpload size={50} />
                )}
              </div>
              <p className="mt-5 text-lg">Drag and drop a file to upload</p>
              <p className="font-light text-textExtraLight">
                Your video will be private until you publish it.
              </p>
            </div>
            <p className="error">{fileError ? fileError : <>&nbsp;</>}</p>
          </div>
        </div>
      </div>

      {/* Prevent interaction while creating a draft */}
      {draftLoading && <Mask />}
    </ModalWrapper>
  )
}