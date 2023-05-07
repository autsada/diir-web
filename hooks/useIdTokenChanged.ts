import { useEffect, useState } from "react"
import { setCookie, deleteCookie } from "cookies-next"
import { useRouter } from "next/navigation"

import { firebaseAuth } from "@/firebase/config"

export function useIdTokenChanged() {
  const [idToken, setIdToken] = useState<string>()

  const router = useRouter()

  // When id token changed
  useEffect(() => {
    const unsubscribe = firebaseAuth.onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken()
        setIdToken(token)
        setCookie("dtoken", token)
      } else {
        setIdToken(undefined)
        deleteCookie("dtoken")
        deleteCookie("dsignature")
      }

      // Reload data
      router.refresh()
    })

    return unsubscribe
  }, [router])

  return { idToken }
}
