import React from "react"
import Image from "next/image"

import DiiRLight from "../../public/diir.png"
import DiiRDark from "../../public/diir-dark.png"

export default function Logo({
  size = "h-[70px]",
  theme = "light",
}: {
  size?: string
  theme?: "light" | "dark"
}) {
  return (
    <Image
      src={theme === "light" ? DiiRLight : DiiRDark}
      alt="DiiR"
      className={`${size} cursor-pointer`}
    />
  )
}
