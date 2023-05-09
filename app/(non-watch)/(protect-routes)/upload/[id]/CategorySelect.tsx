import { IoCaretDownSharp } from "react-icons/io5"

import { contentCategories } from "@/lib/helpers"

export default function CategorySelect({
  name,
  preSelectOption,
  value,
  //   handleSelect,
  options,
}: {
  name: string
  preSelectOption: string
  value?: (typeof contentCategories)[number] | string | null
  //   handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: typeof contentCategories | (typeof contentCategories)[number][]
}) {
  return (
    <>
      <select
        name={name}
        className="relative z-10 w-full bg-transparent appearance-none outline-none focus:outline-none cursor-pointer"
        defaultValue={value ? value : undefined}
      >
        <option value="">{preSelectOption}</option>
        {options.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <div className="absolute z-0 top-0 right-2 h-full flex flex-col justify-center">
        <IoCaretDownSharp />
      </div>
    </>
  )
}
