"use client"

import React from "react"
import PulseLoader from "react-spinners/PulseLoader"

interface Props {
  loading: boolean
  size?: number
}

export default function ButtonLoader({ loading, size = 12 }: Props) {
  return (
    <PulseLoader
      color="#fff"
      loading={loading}
      cssOverride={{
        display: "block",
        margin: "0 auto",
        borderColor: "#fff",
      }}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  )
}
