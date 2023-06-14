"use client"

import React, { useState, useCallback } from "react"
import Dropzone from "react-dropzone"
import { MdFileUpload } from "react-icons/md"

import BannerModal from "./BannerModal"
import type { FileWithPrview } from "@/types"
import type { Station } from "@/graphql/codegen/graphql"

interface Props {
  station: Station
}

export default function BannerImage({ station }: Props) {
  const [image, setImage] = useState<FileWithPrview>()
  const [imageError, setImageError] = useState("")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    const f = acceptedFiles[0] as FileWithPrview

    // Check size
    if (f.size / 1000 > 6144) {
      // Maximum allowed image size = 6mb
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
        className={`relative z-10 mx-auto w-full h-[160px] cursor-pointer rounded-lg overflow-hidden bg-white ${
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
                <div className="h-full w-full text-center flex flex-col justify-center items-center">
                  {image && imageError ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image.preview}
                      alt={image.name}
                      className="h-full w-full object-cover"
                    />
                  ) : station?.bannerImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={station.bannerImage}
                      alt={station.displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <MdFileUpload size={25} />
                  )}
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
        <BannerModal
          station={station}
          image={image}
          cancelUpload={cancelUpload}
        />
      )}
    </>
  )
}
