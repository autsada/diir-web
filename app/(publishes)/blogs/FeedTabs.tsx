import React from "react"

export type FeedType = "For you" | "Latest"
interface Props {
  selectedTab: FeedType
  onSelectTab: (f: FeedType) => void
  loading: boolean
}

export default function FeedTabs({ selectedTab, onSelectTab, loading }: Props) {
  return (
    <div className="flex items-center gap-x-5">
      <Tab
        text="For you"
        selected={selectedTab}
        onSelectTab={onSelectTab}
        loading={loading}
      />
      <Tab
        text="Latest"
        selected={selectedTab}
        onSelectTab={onSelectTab}
        loading={loading}
      />
    </div>
  )
}

function Tab({
  text,
  onSelectTab,
  loading,
  selected,
}: {
  text: FeedType
  onSelectTab: (f: FeedType) => void
  loading: boolean
  selected?: FeedType
}) {
  return (
    <button
      type="button"
      className={`mx-0 h-8 text-lg cursor-pointer border-b-[2px] ${
        selected === text
          ? "font-semibold border-gray-600"
          : "text-textLight border-white"
      }`}
      disabled={loading}
      onClick={onSelectTab.bind(undefined, text)}
    >
      {text}
    </button>
  )
}
