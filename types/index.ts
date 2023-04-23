import type { RecaptchaVerifier } from "firebase/auth"

import { getMyAccount } from "@/graphql"

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier
    grecaptcha: any
    widgetId: number
  }
}

window.recaptchaVerifier = window.recaptchaVerifier || {}

export type ValueType<T> = T extends Promise<infer U> ? U : T
export type AccountData = ValueType<ReturnType<typeof getMyAccount>> | null
