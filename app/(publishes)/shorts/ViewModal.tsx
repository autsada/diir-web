// For mobile view only
import React, { useCallback, useRef, useEffect, useState } from "react"
import { MdKeyboardBackspace } from "react-icons/md"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { isMobile } from "react-device-detect"

import type {
  PageInfo,
  PublishEdge,
  Publish,
  Maybe,
  FetchPlaylistsResponse,
  Station,
} from "@/graphql/codegen/graphql"
import ViewItem from "./ViewItem"

interface Props {
  isAuthenticated: boolean
  profile: Maybe<Station> | undefined
  playlistsResult: Maybe<FetchPlaylistsResponse> | undefined
  closeModal?: () => void
  items: PublishEdge[]
  activeId: string
  fetchMoreShorts: () => Promise<void>
}

export default function ViewModal({
  isAuthenticated,
  profile,
  playlistsResult,
  items,
  closeModal,
  activeId,
  fetchMoreShorts,
}: Props) {
  const activeIndex = items.findIndex((item) => item.node?.id === activeId)

  const containerRef = useRef<HTMLDivElement>(null)

  const onSlideChange = useCallback(
    (index: number, item: React.ReactNode) => {
      // If the slide reaches the end of the items array
      if (index === items.length - 1) {
        fetchMoreShorts()
      }
    },
    [items.length, fetchMoreShorts]
  )

  //   const prevId = activeIndex === 0 ? "" : items[activeIndex - 1]?.node?.id || ""
  //   const nextId =
  //     activeIndex === items.length - 1
  //       ? ""
  //       : items[activeIndex + 1]?.node?.id || ""
  //   //   const [isInitialLoad, setIsInitialLoad] = useState(true)
  //   const prevBtnRef = useRef<HTMLButtonElement>(null)
  //   const nextBtnRef = useRef<HTMLButtonElement>(null)

  //   const scrollIntoView = useCallback(
  //     (id: string) => {
  //       const el = document.getElementById(id)
  //       if (el) {
  //         el.scrollIntoView({
  //           behavior: "smooth",
  //           block: "start",
  //         })
  //       }
  //     },
  //     [items]
  //   )

  //   // Bring the initial item into view
  //   useEffect(() => {
  //     scrollIntoView(activeId)
  //   }, [])

  //   const goPrev = useCallback(() => {
  //     console.log("go prev -->")
  //     if (prevBtnRef?.current) {
  //       prevBtnRef.current.click()
  //     }
  //   }, [])

  //   const goNext = useCallback(() => {
  //     console.log("go next -->")
  //     if (nextBtnRef?.current) {
  //       nextBtnRef.current.click()
  //     }
  //   }, [])

  //   // Register scroll event
  //   useEffect(() => {
  //     if (typeof window === "undefined") return
  //     if (!containerRef?.current) return

  //     const container = containerRef.current
  //     let isScrolling = false
  //     let isInitialLoad = activeIndex === 0 ? false : true
  //     // const activeIndex = items.findIndex((item) => item.node?.id === initialId)
  //     // // let isInitialLoad = activeItemIndex === 0 ? false : true
  //     let timeoutId: NodeJS.Timer | undefined = undefined
  //     let previousScrollPosition = container.scrollTop

  //     function onScroll(e: Event) {
  //       e.preventDefault()

  //       const currentScrollPosition = container.scrollTop
  //       if (!isScrolling) {
  //         if (currentScrollPosition > previousScrollPosition) {
  //           if (isInitialLoad) {
  //             isInitialLoad = false
  //           } else {
  //             console.log("down -->")
  //             if (nextId) {
  //               goNext()
  //               setActiveId(nextId)
  //             }
  //           }
  //         } else if (currentScrollPosition < previousScrollPosition) {
  //           if (isInitialLoad) {
  //             isInitialLoad = false
  //           } else {
  //             console.log("up -->")
  //             if (prevId) {
  //               goPrev()
  //               setActiveId(prevId)
  //             }
  //           }
  //         }

  //         isScrolling = true
  //       }
  //       previousScrollPosition = currentScrollPosition

  //       // Clear the timeout on each scroll event
  //       if (timeoutId) clearTimeout(timeoutId)

  //       // Set a timeout to detect scroll end
  //       const id = setTimeout(() => {
  //         isScrolling = false
  //       }, 200)
  //       timeoutId = id
  //     }

  //     container.addEventListener("touchstart", onScroll, {
  //       capture: true,
  //       passive: true,
  //     })

  //     return () => {
  //       container.removeEventListener("touchstart", onScroll, false)
  //     }
  //   }, [prevId, nextId, setActiveId, goPrev, goNext])
  //   const customRenderItem = (
  //     item: React.ReactNode,
  //     props:
  //       | {
  //           isSelected: boolean
  //           isPrevious: boolean
  //         }
  //       | undefined
  //   ) => <item.type {...item.props} {...props} />

  return (
    <div className="fixed z-50 inset-0 bg-black">
      <div
        className="fixed z-50 top-8 left-4 p-2 cursor-pointer bg-neutral-400 rounded-full"
        onClick={closeModal}
      >
        <MdKeyboardBackspace color="white" size={25} />
      </div>
      {/* <div ref={containerRef} className="relative h-full z-40 w-full"> */}
      {items.length > 0 && (
        <Carousel
          selectedItem={activeIndex}
          axis="vertical"
          swipeable
          showThumbs={false}
          showIndicators={false}
          showArrows={isMobile ? false : true}
          showStatus={false}
          renderItem={(item: any, options) => {
            return <item.type {...item.props} {...options} />
          }}
          onChange={onSlideChange}
          renderArrowPrev={(onClick) => {
            return (
              <button
                id="prev-page"
                type="button"
                className="hidden"
                onClick={onClick}
              >
                Prev
              </button>
            )
          }}
          renderArrowNext={(onClick) => {
            return (
              <button
                id="next-page"
                type="button"
                className="hidden"
                onClick={onClick}
              >
                Next
              </button>
            )
          }}
        >
          {items
            .filter((edge) => !!edge.node)
            .map((edge) => (
              <ViewItem
                key={edge.node?.id}
                isAuthenticated={isAuthenticated}
                profile={profile}
                playlistsResult={playlistsResult}
                publish={edge.node!}
              />
            ))}
        </Carousel>
      )}
      {/* </div> */}
    </div>
  )
}
