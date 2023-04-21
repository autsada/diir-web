import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import PhoneInput, {
  getCountryCallingCode,
  isValidPhoneNumber,
} from "react-phone-number-input/input"
import _ from "lodash"
import { IoCaretDownOutline } from "react-icons/io5"
import type { Country } from "react-phone-number-input"

import { getCountryNames } from "@/lib"
import { OtpInput } from "./OtpInput"

export default function PhoneAuth() {
  const [country, setCountry] = useState<Country>("TH")
  const [phoneNumber, setPhoneNumber] = useState<string>()
  const [isNumberValid, setIsNumberValid] = useState(false)
  const [requestOtpLoading, setRequestOtpLoading] = useState(false)
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [userOtp, setUserOtp] = useState("")
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false)
  const [verifyOtpError, setVerifyOtpError] = useState("")

  function selectCountry(e: ChangeEvent<HTMLSelectElement>) {
    setCountry(e.target.value as Country)
  }

  const validatePhoneNumberDebounce = useMemo(
    () => _.debounce(validatePhoneNumber, 500),
    []
  )

  function validatePhoneNumber(phoneNumber: string, country: Country) {
    const valid = isValidPhoneNumber(phoneNumber, country)
    setIsNumberValid(valid)
  }

  // Validate phone number
  useEffect(() => {
    if (phoneNumber && country) {
      validatePhoneNumberDebounce(phoneNumber, country)
    }
  }, [phoneNumber, country, validatePhoneNumberDebounce])

  // When phone number is valid, blur the input
  useEffect(() => {
    if (isNumberValid) {
      const inputDivEl = document.getElementById("phone-input")
      if (inputDivEl) {
        const inputEl = inputDivEl.children[0] as HTMLInputElement
        if (inputEl) inputEl.blur()
      }
    }
  }, [isNumberValid])

  /**
   * @dev There are 2 steps to login with phone number.
   * 1. User request a verification code
   * 2. User enter and confirm the verification code they received
   */

  const handleOtpChange = useCallback((value: string) => {
    setUserOtp(value)
  }, [])

  return (
    <>
      <div className="mt-8 py-5 text-center">
        <h4>Sign in with Phone</h4>
      </div>

      <div className="mt-5 px-10">
        {/* Step 1 Request Code */}
        <div className="relative">
          <div className="border border-orange-400 rounded-lg">
            <div
              className={`relative px-4 h-12 flex items-center ${
                country ? "border-b border-orange-400" : ""
              }`}
            >
              <select
                value={country}
                onChange={selectCountry}
                className="relative z-10 w-full bg-transparent text-lg font-semibold text-textDark cursor-pointer appearance-none focus:outline-none"
              >
                <Option value="" name="Select country" />
                {getCountryNames().map((c) => (
                  <Option
                    key={c.code}
                    value={c.code as Country}
                    name={c.name}
                  />
                ))}
              </select>
              <IoCaretDownOutline
                color="#525252"
                className="absolute z-0 right-4 cursor-pointer"
              />
            </div>
            {country && (
              <div className="h-12 px-2 flex items-center">
                <div className="h-full w-20 border-r border-orange-400 flex justify-center items-center">
                  <h6 className="text-lg text-textDark">
                    {country && `+${getCountryCallingCode(country)}`}
                  </h6>
                </div>
                <div id="phone-input" className="h-full flex-grow">
                  <PhoneInput
                    country={country}
                    defaultCountry="TH"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    placeholder="Phone number"
                    className="w-full h-full leading-12 p-0 pl-4 appearance-none font-semibold text-textDark text-lg placeholder:font-extralight placeholder:text-textExtraLight focus:outline-none"
                  />
                </div>
              </div>
            )}
            {country && phoneNumber && (
              <p className="absolute font-thin text-sm pl-20 text-error">
                {!isNumberValid ? "Invalid number" : <>&nbsp;</>}
              </p>
            )}
          </div>

          <div className="my-6 h-[50px] px-1 flex items-center justify-center">
            <p className="text-center text-lg text-blueBase">
              {isNumberValid ? (
                "We will send you a 6-digits verification code."
              ) : (
                <>&nbsp;</>
              )}
            </p>
          </div>

          <button
            id="sign-in-button"
            className={`btn-dark w-full h-12 rounded-full text-lg ${
              !isNumberValid || requestOtpLoading ? "opacity-10" : "opacity-100"
            }`}
            disabled={!isNumberValid || requestOtpLoading}
            //   onClick={requestVerificationCode}
          >
            Get Code
          </button>
          {/* Prevent users interaction during verifying code */}
          {verifyOtpLoading && <div className="absolute z-20 inset-0" />}
        </div>

        {/* Step 2 Confirm Code */}
        {isOtpSent && (
          <div className="pt-14">
            <div className="relative mb-12">
              <OtpInput
                value={userOtp}
                valueLen={6}
                onChange={handleOtpChange}
              />
              {/* Prevent users from entering if OTP not sent or is sending */}
              {requestOtpLoading && <div className="absolute inset-0"></div>}
            </div>

            <div>
              <button
                id="sign-in-button"
                type="button"
                className={`btn-orange w-full mt-14 h-12 rounded-full text-lg ${
                  requestOtpLoading || verifyOtpLoading
                    ? "opacity-30"
                    : "opacity-100"
                }`}
                disabled={
                  requestOtpLoading ||
                  //   !confirmationResult ||
                  !userOtp ||
                  userOtp.length !== 6 ||
                  verifyOtpLoading
                }
              >
                Verify Code
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

function Option({ value, name }: { value: Country | ""; name: string }) {
  return (
    <option value={value} className="font-normal text-textRegular text-base">
      {name}
    </option>
  )
}
