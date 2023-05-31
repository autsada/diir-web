import React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-[70px] bg-black">
      <div className="fixed z-0 left-0 top-0 right-0 bg-black h-[200px]"></div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
