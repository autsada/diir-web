import { useEffect, useState } from "react"
import { setCookie } from "cookies-next"
import type { Unsubscribe } from "firebase/auth"

import { firebaseAuth } from "@/firebase/config"

export function useIdTokenChanged(walletAddress?: string) {
  const [idToken, setIdToken] = useState<string>()

  // When id token changed
  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined = undefined

    if (walletAddress) {
      unsubscribe = firebaseAuth.onIdTokenChanged(async (user) => {
        if (user) {
          const token = await user.getIdToken()
          setIdToken(token)
          // TODO: Encrypt the wallet address
          setCookie("dtoken", `${token}  starthere:${walletAddress}`)
        } else {
          setIdToken(undefined)
        }
      })
    } else {
      unsubscribe = firebaseAuth.onIdTokenChanged(async (user) => {
        if (user) {
          const token = await user.getIdToken()
          setIdToken(token)
          setCookie("dtoken", token)
        } else {
          setIdToken(undefined)
        }
      })
    }

    return unsubscribe
  }, [walletAddress])

  return { idToken }
}
