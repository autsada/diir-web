"use client"

import _ from "lodash"
import React, {
  useState,
  useCallback,
  ChangeEvent,
  useEffect,
  useMemo,
} from "react"
import { useRouter } from "next/navigation"
import { MdModeEditOutline } from "react-icons/md"

import ConfirmModal from "@/components/ConfirmModal"
import NameInput from "@/app/(non-watch)/(protect-routes)/settings/NameInput"
import Mask from "@/components/Mask"
import type { Station } from "@/graphql/codegen/graphql"

interface Props {
  station: Station
}

export default function StationName({ station }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(() => station?.displayName)
  const [nameError, setNameError] = useState("")
  const [isNameValid, setNameValid] = useState<boolean>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()

  const startEditing = useCallback(() => {
    setIsEditing(true)
  }, [])

  const cancelEditing = useCallback(() => {
    setIsEditing(false)
    setName(station?.displayName)
    setNameError("")
    setNameValid(undefined)
  }, [station?.displayName])

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
    const result = await fetch(`/station/validate/displayName`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: n }),
    })

    const data = await result.json()
    setNameValid(data?.valid)
  }, [])

  const validateNameDebounce = useMemo(
    () => _.debounce(validateName, 200),
    [validateName]
  )

  useEffect(() => {
    if (name === station?.displayName) return

    if (name && !nameError) {
      validateNameDebounce(name)
    }
  }, [name, station?.displayName, nameError, validateNameDebounce])

  async function confirmEditing() {
    if (!station) return

    try {
      setLoading(true)
      const result = await fetch(`/station/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, stationId: station.id }),
      })

      await result.json()
      // Reload data to update UI
      router.refresh()
      setLoading(false)
      setIsEditing(false)
    } catch (error) {
      setError("Update name failed")
      setLoading(false)
    }
  }

  return (
    <>
      <p className="text-base sm:text-lg lg:text-xl">{station?.displayName}</p>
      <MdModeEditOutline
        color="black"
        className="text-lg cursor-pointer ml-5"
        onClick={startEditing}
      />

      {isEditing && (
        <ConfirmModal
          onConfirm={confirmEditing}
          onCancel={cancelEditing}
          loading={loading}
          error={error}
          disabled={
            station?.displayName === name || !!nameError || !isNameValid
          }
        >
          <div className="bg-white">
            <h6 className="mb-4 sm:text-2xl">Edit name</h6>

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
              valid={name !== station?.displayName && !nameError && isNameValid}
            />
          </div>
        </ConfirmModal>
      )}

      {/* Prevent interaction while loading */}
      {loading && <Mask />}
    </>
  )
}
