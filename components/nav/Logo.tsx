import React from "react"
import Image from "next/image"

import DiiRLogo from "../../public/logo.png"

export default function Logo() {
  return <Image src={DiiRLogo} alt="DiiR" className="h-full cursor-pointer" />
}
