import "./globals.css"

import AppNav from "@/components/nav/AppNav"

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
