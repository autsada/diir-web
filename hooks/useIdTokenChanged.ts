import { useEffect, useState } from "react"
import { setCookie } from "cookies-next"
import type { Unsubscribe } from "firebase/auth"

import { firebaseAuth } from "@/firebase/config"

// TODO: For users that use their own wallet, sign a message and send to the server to verify in order to authenticate user.
export function useIdTokenChanged(walletAddress?: string, signedMsg?: string) {
  const [idToken, setIdToken] = useState<string>()

  // When id token changed
  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined = undefined

    if (walletAddress && signedMsg) {
      unsubscribe = firebaseAuth.onIdTokenChanged(async (user) => {
        if (user) {
          const token = await user.getIdToken()
          setIdToken(token)
          setCookie("dtoken", `${token}  :::${signedMsg} ${walletAddress}`)
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
  }, [walletAddress, signedMsg])

  return { idToken }
}
