import React from "react"
import Image from "next/image"

import DiiRLogo from "../../public/logo.png"

export default function Logo() {
  return (
    <div className="h-full flex items-center justify-center">
      <Image src={DiiRLogo} alt="DiiR" className="h-full cursor-pointer" />
    </div>
  )
}
