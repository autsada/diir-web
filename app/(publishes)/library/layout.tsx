import { redirect } from "next/navigation"

import { getAccount } from "@/lib/server"
import { getStationById } from "@/graphql"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const data = await getAccount()
  const account = data?.account || null
  const idToken = data?.idToken
  const signature = data?.signature

  if (!data || !account || !idToken) {
    redirect("/")
  }

  if (!account?.defaultStation) {
    redirect("/station")
  }

  // Query station by id
  const station = await getStationById(account?.defaultStation?.id)

  if (!station) {
    redirect("/")
  }

  return <div className="py-4 sm:px-4 sm:ml-[100px]">{children}</div>
}
