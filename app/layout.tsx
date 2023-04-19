import "./globals.css"
import MainNav from "../components/nav/MainNav"

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
        <div className="fixed top-0 left-0 right-0">
          <MainNav />
        </div>
        <div className="hidden w-[100px] fixed top-[70px] bottom-0 sm:block bg-green-300">
          Sidebar
        </div>

        <div className="pt-[70px] sm:ml-[100px]">{children}</div>
      </body>
    </html>
  )
}
