import type { ChangeEvent } from "react"

interface Props {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  value: string
  placeholder?: string
  disabled?: boolean
}

export default function EmailInput({
  handleChange,
  value,
  placeholder = "Email address",
  disabled = false,
}: Props) {
  return (
    <input
      type="email"
      name="email"
      className="h-14 md:h-12 w-full border border-orange-400 rounded-lg px-5 outline-none placeholder:font-extralight font-normal text-textRegular text-lg placeholder:text-textExtraLight focus:outline-none focus:border-[2px] focus:border-orange-500"
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
      disabled={disabled}
    />
  )
}
