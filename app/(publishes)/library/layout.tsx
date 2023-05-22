import { redirect } from "next/navigation"

import { getAccount } from "@/lib/server"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const data = await getAccount()
  const account = data?.account || null

  if (!data || !account) {
    redirect("/")
  }

  return <div className="py-4 sm:px-4 sm:ml-[100px]">{children}</div>
}
