import React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="w-full p-5">{children}</div>
}
