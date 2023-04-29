"use client"

import React from "react"

import Backdrop from "@/components/Backdrop"
import { useRouter } from "next/navigation"

export default function InformModal() {
  const router = useRouter()

  function onConfirm() {
    router.push("/station")
  }

  function onCancel() {
    router.push("/")
  }

  return (
    <>
      <Backdrop visible />
      <div className="fixed z-50 inset-0 flex justify-center items-center">
        <div className="w-[90%] sm:w-[60%] md:w-[50%] lg:w-[35%] mx-auto p-10 text-center bg-white rounded-xl">
          <h6>To start upload content, you will need a station.</h6>
          <button
            type="button"
            className="btn-dark px-5 rounded-full mt-10"
            onClick={onConfirm}
          >
            Create station
          </button>
          <button
            type="button"
            className="mt-10 text-orange-500 hover:text-orange-400"
            onClick={onCancel}
          >
            Maybe later
          </button>
        </div>
      </div>
    </>
  )
}
