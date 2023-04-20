import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import type { IconType } from "react-icons"

interface Props {
  name: string
  href: string
  ActiveIcon: IconType
  InActiveIcon: IconType
}

export default function ActiveLink({
  name,
  href,
  ActiveIcon,
  InActiveIcon,
}: Props) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href} scroll={false}>
      <div
        className={`px-1 h-[50px] cursor-pointer flex items-center hover:bg-gray-100 ${
          isActive ? "bg-gray-100" : "bg-white"
        } rounded-md`}
      >
        <div className="h-full w-[50px] flex items-center">
          {isActive ? <ActiveIcon size={24} /> : <InActiveIcon />}
        </div>
        <div className="h-full flex items-center">
          <h6 className="text-lg">{name}</h6>
        </div>
      </div>
    </Link>
  )
}
