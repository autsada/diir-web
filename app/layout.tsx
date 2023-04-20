import "./globals.css"

import MainNav from "../components/nav/MainNav"
import Backdrop from "@/components/Backdrop"
import LeftDrawer from "@/components/nav/LeftDrawer"
import AppNav from "@/components/nav/AppNav"

export const metadata = {
  title: "DiiR",
  description: "A platform for story teller",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="text-textRegular overflow-y-auto">
        <AppNav />

        <div className="pt-[70px] sm:ml-[100px]">{children}</div>
      </body>
    </html>
  )
}
