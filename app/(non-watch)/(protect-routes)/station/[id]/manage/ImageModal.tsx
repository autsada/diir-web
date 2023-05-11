import React, { useState } from "react"
import { useRouter } from "next/navigation"

import ConfirmModal from "@/components/ConfirmModal"
import ProgressBar from "@/components/ProgressBar"
import Mask from "@/components/Mask"
import { uploadFile } from "@/firebase/helpers"
import { stationsFolder } from "@/firebase/config"
import type { FileWithPrview } from "@/types"
import type { Station } from "@/graphql/types"

interface Props {
  station: Station
  image: FileWithPrview
  cancelUpload: () => void
}

export default function ImageModal({ station, image, cancelUpload }: Props) {
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState("")

  const router = useRouter()

  async function updateImage() {
    try {
      if (!image) return

      setLoading(true)
      // Upload the image to cloud storage
      const { url, fileRef } = await uploadFile({
        folder: `${stationsFolder}/${station?.name}/profile`,
        file: image,
        setProgress: setUploadProgress,
      })
      const result = await fetch(`/station/image/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: url,
          imageRef: fileRef,
          stationId: station.id,
        }),
      })

      await result.json()
      // Reload data
      router.refresh()
      setLoading(false)
      cancelUpload()
    } catch (error) {
      setLoading(false)
      setError("Update profile image failed.")
    }
  }

  return (
    <>
      <ConfirmModal
        onConfirm={updateImage}
        onCancel={cancelUpload}
        loading={loading}
        error={error}
        disabled={!image}
      >
        <div className="w-full">
          <h6 className="mb-4">Change image</h6>

          <div className="relative w-full py-5 bg-gray-50">
            <div className="w-[150px] h-[150px] mx-auto border border-gray-200 rounded">
              <div className="w-full h-full rounded-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.preview}
                  alt={image.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <ProgressBar progress={uploadProgress} />
          </div>
        </div>
      </ConfirmModal>

      {/* Prevent interaction while loading */}
      {loading && <Mask />}
    </>
  )
}
