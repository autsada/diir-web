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
import { useContractWrite } from "wagmi"

import CloseButton from "@/components/CloseButton"
import NameInput from "./NameInput"
import ButtonLoader from "@/components/ButtonLoader"
import Mask from "@/components/Mask"
import ModalWrapper from "@/components/ModalWrapper"
import {
  usePrepareStationContractWrite,
  useStationMintedEvent,
} from "@/hooks/contracts/useStation"
import type { Account } from "@/graphql/codegen/graphql"

interface Props {
  account: Account
  closeModal: () => void
  title?: string
  additionalInfo?: string
  useDoItLaterClose?: boolean
  doItLaterText?: string
}

export default function CreateStationModal({
  account,
  closeModal,
  title = "Create Station",
  additionalInfo,
  useDoItLaterClose = false,
  doItLaterText = "",
}: Props) {
  const [name, setName] = useState("")
  const [nameError, setNameError] = useState("")
  const [isNameValid, setIsNameValid] = useState<boolean>()
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const router = useRouter()
  const { config } = usePrepareStationContractWrite(
    account?.owner,
    name,
    !!isNameValid
  )
  const { write, isError: isWriteError } = useContractWrite(config)

  // For direct mint, we will need to listen to event and call the callback function upon the event is emited.
  const onMintedCallback = useCallback(() => {
    // Reload data to update the UI
    router.refresh()
    setLoading(false)
    closeModal()
  }, [router, closeModal])
  useStationMintedEvent(name, onMintedCallback)

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

  const validateName = useCallback(async (n: string) => {
    const result = await fetch(`/station/validate/name`, {
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
    if (isWriteError) setLoading(false)
  }, [isWriteError])

  useEffect(() => {
    if (name && !nameError) {
      validateNameDebounce(name)
    }
  }, [name, nameError, validateNameDebounce])

  async function onCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!account || !name || name.length < 3 || name.length > 64) return

    try {
      // 1. Mint station NFT
      if (account?.stations?.length === 0 || account?.type === "TRADITIONAL") {
        setLoading(true)
        // A. First station, or `TRADITIONAL` account
        const result = await fetch(`/station/mint`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        })

        const data = await result.json()
        const tokenId = data?.tokenId
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
      } else {
        // B. Direct mint for Not the first station and `WALLET` ACCOUNT
        if (!write) return
        // Set loading to true to update the UI
        setLoading(true)
        write()
      }
    } catch (error) {
      setLoading(false)
      setIsError(true)
    }
  }

  return (
    <ModalWrapper visible withBackdrop>
      <div className="relative z-50 w-[90%] sm:w-[60%] md:w-[50%] lg:w-[35%] mx-auto px-10 pt-10 pb-6 bg-white rounded-xl text-center">
        {!useDoItLaterClose && (
          <div className="absolute top-2 right-4">
            <CloseButton onClick={closeModal} className="text-base" />
          </div>
        )}
        <h4 className="text-2xl sm:text-3xl">{title}</h4>
        {additionalInfo && (
          <p className="pt-2 text-textLight">{additionalInfo}</p>
        )}

        <form onSubmit={onCreate}>
          <div className="my-5">
            <NameInput
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
              valid={isNameValid}
            />
          </div>

          <button
            type="submit"
            className={`btn-dark w-full rounded-full ${
              nameError || !isNameValid
                ? "opacity-30 cursor-not-allowed"
                : "opacity-100"
            }`}
            disabled={!!nameError || !isNameValid || loading}
          >
            {loading ? <ButtonLoader loading /> : "Create"}
          </button>
          <p className="error">
            {isError || isWriteError ? "Create station failed" : <>&nbsp;</>}
          </p>
        </form>
        {useDoItLaterClose && (
          <button onClick={closeModal} className="w-full text-blueBase">
            {doItLaterText || "Maybe later"}
          </button>
        )}
      </div>
      {loading && <Mask />}
    </ModalWrapper>
  )
}
