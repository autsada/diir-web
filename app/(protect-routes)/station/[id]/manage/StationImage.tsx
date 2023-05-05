"use client"

import React, { useState, useCallback } from "react"
import Dropzone from "react-dropzone"

import Avatar from "@/components/Avatar"
import type { FileWithPrview } from "@/types"
import type { Station } from "@/graphql/types"
import UploadModal from "./UploadModal"

interface Props {
  station: Station
}

export default function UploadImage({ station }: Props) {
  const [image, setImage] = useState<FileWithPrview>()
  const [imageError, setImageError] = useState("")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    const f = acceptedFiles[0] as FileWithPrview

    // Check size
    if (f.size / 1000 > 4096) {
      // Maximum allowed image size = 4mb
      setImageError("File too big")
    }
    const fileWithPreview = Object.assign(f, {
      preview: URL.createObjectURL(f),
    })

    setImage(fileWithPreview)
  }, [])

  const cancelUpload = useCallback(() => {
    setImage(undefined)
    setImageError("")
  }, [])

  return (
    <>
      <div
        className={`relative z-10 mx-auto w-[150px] h-[150px] cursor-pointer rounded ${
          !!imageError
            ? "border-[2px] border-red-500"
            : "border border-gray-200"
        }`}
      >
        <Dropzone onDrop={onDrop} multiple={false}>
          {({ getRootProps, getInputProps }) => (
            <section className="h-full w-full">
              <div {...getRootProps()} className="h-full">
                <input {...getInputProps()} />
                <div className="h-full w-full text-center flex flex-col justify-center">
                  <div className="h-full w-full rounded-full overflow-hidden">
                    {image && imageError ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={image.preview}
                        alt={image.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Avatar
                        profile={station}
                        width={150}
                        height={150}
                        fontSize="text-6xl"
                      />
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}
        </Dropzone>
        <p className="error">{!!imageError ? imageError : <>&nbsp;</>}</p>
      </div>

      {image && imageError && (
        <div className="absolute z-20 top-0 right-0">
          <button
            className="btn-cancel px-4 h-[25px] text-xs rounded-full"
            onClick={cancelUpload}
          >
            Cancel
          </button>
        </div>
      )}

      {image && !imageError && (
        <UploadModal
          station={station}
          image={image}
          cancelUpload={cancelUpload}
        />
      )}
    </>
  )
}
