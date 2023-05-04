import React, {
  useState,
  ChangeEvent,
  useCallback,
  FormEvent,
  useMemo,
  useEffect,
} from "react"
import { useRouter } from "next/navigation"
import _ from "lodash"
// import Image from "next/image"
// import Dropzone from "react-dropzone"
// import { CiTrash } from "react-icons/ci"
// import { BsUpload } from "react-icons/bs"

import CloseButton from "@/components/CloseButton"
import Input from "@/components/Input"
import ButtonLoader from "@/components/ButtonLoader"
import Mask from "@/components/Mask"
import ModalWrapper from "@/components/ModalWrapper"
import type { Account } from "@/graphql/types"

interface Props {
  account: Account
  closeModal: () => void
}

export default function CreateStationModal({ account, closeModal }: Props) {
  const [name, setName] = useState("")
  const [nameError, setNameError] = useState("")
  const [isNameValid, setIsNameValid] = useState<boolean>()
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

  const validateName = useCallback(async (n: string) => {
    const result = await fetch(`/station/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: n }),
    })

    const data = await result.json()
    setIsNameValid(data?.valid)
  }, [])

  const validateNameDebounce = useMemo(
    () => _.debounce(validateName, 200),
    [validateName]
  )

  useEffect(() => {
    if (name && !nameError) {
      validateNameDebounce(name)
    }
  }, [name, nameError, validateNameDebounce])

  async function onCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!account || !name || name.length < 3 || name.length > 64) return

    try {
      setLoading(true)

      let tokenId: number | undefined = undefined

      // 1. Mint station NFT

      if (account?.stations?.length === 0 || account?.type === "TRADITIONAL") {
        // First station, or `TRADITIONAL` account
        const result = await fetch(`/station/mint`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        })

        const data = await result.json()
        tokenId = data?.tokenId
      } else {
        // Not the first station and `WALLET` ACCOUNT
        console.log("second -->")
      }

      if (tokenId) {
        // 2. Create a station in the database
        await fetch(`/station/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, tokenId }),
        })

        setLoading(false)
        if (isError) setIsError(false)
        // Reload data to update the UI
        router.refresh()
        closeModal()
      } else {
        // Error case
        setLoading(false)
        setIsError(true)
      }
    } catch (error) {
      console.log("error: -->", error)
      setLoading(false)
      setIsError(false)
    }
  }

  return (
    <ModalWrapper visible withBackdrop>
      <div className="relative z-50 w-[90%] sm:w-[60%] md:w-[50%] lg:w-[35%] mx-auto p-10 bg-white rounded-xl text-center">
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
              error={
                nameError ||
                (typeof isNameValid === "boolean" && !isNameValid
                  ? "This name is taken"
                  : "")
              }
              isMandatory={true}
            />
          </div>

          <button
            type="submit"
            className={`btn-dark w-full rounded-full ${
              nameError || !isNameValid
                ? "opacity-30 cursor-not-allowed"
                : "opacity-100"
            }`}
            disabled={!!nameError || !isNameValid}
          >
            {loading ? <ButtonLoader loading /> : "Create"}
          </button>
          <p className="error">
            {isError ? "Create station failed" : <>&nbsp;</>}
          </p>
        </form>
      </div>
      {loading && <Mask />}
    </ModalWrapper>
  )
}
