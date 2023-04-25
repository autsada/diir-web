import UploadBtn from "./UploadBtn"
import "./globals.css"

import AppLayoutServer from "@/components/nav/AppLayoutServer"

export const metadata = {
  title: "DiiR",
  description: "A platform for story teller",
  icons: {
    icon: "/favicon/favicon.ico",
    // shortcut: "/shortcut-icon.png",
    // apple: '/apple-icon.png',
    // other: {
    //   rel: 'apple-touch-icon-precomposed',
    //   url: '/apple-touch-icon-precomposed.png',
    // },
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="text-textRegular">
        {/* @ts-expect-error Async Server Component */}
        <AppLayoutServer />

        <div className="min-h-screen pt-[70px] sm:ml-[100px] overflow-y-auto">
          {children}
        </div>

        <div className="fixed bottom-10 right-8 max-w-max sm:hidden">
          <UploadBtn />
        </div>
      </body>
    </html>
  )
}
