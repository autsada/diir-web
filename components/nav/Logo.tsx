import React from "react"
import Image from "next/image"

import DiiRLogo from "../../public/logo.png"

export default function Logo({ size = "h-[70px]" }: { size?: string }) {
  return (
    <Image src={DiiRLogo} alt="DiiR" className={`${size} cursor-pointer`} />
  )
}
