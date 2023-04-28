import React, { ChangeEvent } from "react"

interface Props {
  name: string
  placeholder: string
  value: string | number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error: string
  isMandatory: boolean
}

export default function Input({
  name,
  placeholder,
  value,
  onChange,
  error,
  isMandatory,
}: Props) {
  return (
    <label htmlFor="name" className="block text-start">
      {name} {isMandatory && <span className="text-red-500">*</span>}
      <input
        type="text"
        name="name"
        maxLength={64}
        placeholder={placeholder}
        className={`block w-full h-12 pl-5 text-lg rounded-lg border border-orange-400 focus:outline-none focus:border-[2px] focus:border-orange-500`}
        value={value}
        onChange={onChange}
      />
      <p className="text-xs text-red-500">{error ? error : <>&nbsp;</>}</p>
    </label>
  )
}
