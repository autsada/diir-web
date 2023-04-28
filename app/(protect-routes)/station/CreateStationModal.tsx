import React, { useState, ChangeEvent, useCallback, FormEvent } from "react"
import { useRouter } from "next/navigation"
// import Image from "next/image"
// import Dropzone from "react-dropzone"
// import { CiTrash } from "react-icons/ci"
// import { BsUpload } from "react-icons/bs"

import Backdrop from "@/components/Backdrop"
import CloseButton from "@/components/CloseButton"
import Input from "@/components/Input"
import ButtonLoader from "@/components/ButtonLoader"
import Mask from "@/components/Mask"

interface Props {
  owner: string
  closeModal: () => void
}

export default function CreateStationModal({ owner, closeModal }: Props) {
  const [name, setName] = useState("")
  const [nameError, setNameError] = useState("")
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  //   const [image, setImage] = useState<FileWithPrview>()
  //   const [uploading, setUploading] = useState(false)
  //   const [imageError, setImageError] = useState("")

  const router = useRouter()

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setName(v)
    if (v.length < 3) {
      setNameError("At least 3 characters")
    } else if (v.length > 64) {
      setNameError("Too long")
    } else {
      setNameError("")
    }
  }, [])

  //   const onDrop = useCallback((acceptedFiles: File[]) => {
  //     // Do something with the files
  //     const f = acceptedFiles[0] as FileWithPrview

  //     // Check size
  //     if (f.size / 1000 > 4096) {
  //       setImageError("File too big")
  //     }
  //     const fileWithPreview = Object.assign(f, {
  //       preview: URL.createObjectURL(f),
  //     })

  //     setImage(fileWithPreview)
  //   }, [])

  async function onCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!owner || !name || name.length > 64) return

    try {
      setLoading(true)
      const result = await fetch(`/station/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, to: owner }),
      })

      await result.json()
      setLoading(false)
      if (isError) setIsError(false)
      // Reload data to update the UI
      router.refresh()
      closeModal()
    } catch (error) {
      setLoading(false)
      setIsError(false)
    }
  }

  return (
    <>
      <Backdrop visible />
      <div className="relative z-50 w-[100%] sm:w-[40%] lg:w-[30%] mx-auto p-10 bg-white rounded-xl text-center">
        <div className="absolute top-2 right-4">
          <CloseButton onClick={closeModal} className="text-base" />
        </div>
        <h6>Create Station</h6>

        <form onSubmit={onCreate}>
          <div className="my-5">
            <Input
              name="Name"
              placeholder="Station name"
              value={name}
              onChange={handleChange}
              error={nameError}
              isMandatory={true}
            />
          </div>

          <button type="submit" className="btn-dark w-full rounded-full">
            {loading ? <ButtonLoader loading /> : "Create"}
          </button>
          <p className="error">
            {isError ? "Create station failed" : <>&nbsp;</>}
          </p>
        </form>
      </div>
      {loading && <Mask />}
    </>
  )
}
