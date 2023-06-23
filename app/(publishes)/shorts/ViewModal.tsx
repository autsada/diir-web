// For mobile view only
import React, { useCallback, useState, useEffect } from "react"
import { MdKeyboardBackspace } from "react-icons/md"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

import ViewItem from "./ViewItem"
import TipModal from "@/app/(watch)/watch/[id]/TipModal"
import ShareModal from "../ShareModal"
import AddToPlaylistsModal from "@/app/(watch)/watch/[id]/AddToPlaylistsModal"
import ReportModal from "../ReportModal"
import { useAuthContext } from "@/context/AuthContext"
import type {
  PublishEdge,
  Maybe,
  FetchPlaylistsResponse,
  Station,
  Publish,
  CheckPublishPlaylistsResponse,
} from "@/graphql/codegen/graphql"

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
  const initialItem = items.find((item) => item.node?.id === activeId)?.node
  const activeIndex = items.findIndex((item) => item.node?.id === activeId)

  const [targetPublish, setTargetPublish] = useState(initialItem)
  const [publishPlaylistsData, setPublishPlaylistsData] =
    useState<CheckPublishPlaylistsResponse>()
  const [loading, setLoading] = useState(false)
  const [tipModalVisible, setTipModalVisible] = useState(false)
  const [shareModalVisible, setShareModalVisible] = useState(false)
  const [reportModalVisible, setReportModalVisible] = useState(false)
  const [commentsModalVisible, setCommentsModalVisible] = useState(false)
  const [addToPlaylistsModalVisible, setAddToPlaylistsModalVisible] =
    useState(false)
  const [prevPlaylists, setPrevPlaylists] = useState(playlistsResult?.edges)
  const [playlists, setPlaylists] = useState(playlistsResult?.edges || [])
  // When playlists result changed
  if (playlistsResult?.edges !== prevPlaylists) {
    setPrevPlaylists(playlistsResult?.edges)
    setPlaylists(playlistsResult?.edges || [])
  }
  const [prevPlaylistsPageInfo, setPrevPlaylistsPageInfo] = useState(
    playlistsResult?.pageInfo
  )
  const [playlistsPageInfo, setPlaylistsPageInfo] = useState(
    playlistsResult?.pageInfo
  )
  // When playlists page info changed
  if (playlistsResult?.pageInfo !== prevPlaylistsPageInfo) {
    setPrevPlaylistsPageInfo(playlistsResult?.pageInfo)
    setPlaylistsPageInfo(playlistsResult?.pageInfo)
  }

  const { onVisible: openAuthModal } = useAuthContext()

  const onSlideChange = useCallback(
    (index: number, item: React.ReactNode) => {
      const viewItem = item as ReturnType<typeof ViewItem>
      const { publish } = viewItem?.props as { publish: Publish }
      setTargetPublish(publish)
      // If the slide reaches the end of the items array
      if (index === items.length - 1) {
        fetchMoreShorts()
      }
    },
    [items.length, fetchMoreShorts]
  )

  const fetchPublishPlaylistData = useCallback(async () => {
    try {
      if (!targetPublish || !isAuthenticated || !profile) return

      // Call the api route to check if the publish already add to any user's playlists
      setLoading(true)
      const res = await fetch(`/library/playlists/publish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publishId: targetPublish.id }),
      })
      const data = (await res.json()) as {
        result: CheckPublishPlaylistsResponse
      }
      setPublishPlaylistsData(data.result)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }, [targetPublish, isAuthenticated, profile])
  // Fetch publish playlist data
  useEffect(() => {
    fetchPublishPlaylistData()
  }, [fetchPublishPlaylistData])

  const handleStartTip = useCallback(() => {
    if (!targetPublish?.id) return

    if (!isAuthenticated) {
      openAuthModal()
    } else {
      setTipModalVisible(true)
    }
  }, [targetPublish, isAuthenticated, openAuthModal])

  const closeTipModal = useCallback(() => {
    setTipModalVisible(false)
  }, [])

  const openShareModal = useCallback(() => {
    setShareModalVisible(true)
  }, [])

  const closeShareModal = useCallback(() => {
    setShareModalVisible(false)
  }, [])

  const onStartShare = useCallback(async () => {
    if (typeof window === "undefined" || !targetPublish) return

    const shareData = {
      title: targetPublish.title || "",
      text: targetPublish.title || "",
      url: `https://4c04-2405-9800-b961-39d-98db-d99c-fb3e-5d9b.ngrok-free.app/watch/${targetPublish.id}`,
    }

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.error(error)
      }
    } else {
      openShareModal()
    }
  }, [targetPublish, openShareModal])

  const handleSavePublish = useCallback(async () => {
    if (!targetPublish) return

    if (!isAuthenticated) {
      openAuthModal()
    } else {
      setAddToPlaylistsModalVisible(true)
    }
  }, [targetPublish, isAuthenticated, openAuthModal])

  const closeAddToPlaylistsModal = useCallback(() => {
    setAddToPlaylistsModalVisible(false)
  }, [])

  const openReportModal = useCallback(() => {
    setReportModalVisible(true)
  }, [])

  const closeReportModal = useCallback(() => {
    setReportModalVisible(false)
  }, [])

  const openCommentsModal = useCallback(() => {
    setCommentsModalVisible(true)
  }, [])

  const closeCommentsModal = useCallback(() => {
    setCommentsModalVisible(false)
  }, [])

  return (
    <>
      <div className="fixed z-50 inset-0 bg-black">
        <div
          className="fixed z-50 top-8 left-4 p-2 cursor-pointer bg-neutral-400 rounded-full"
          onClick={loading ? undefined : closeModal}
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
            showArrows={false}
            showStatus={false}
            renderItem={(item: any, options) => {
              return <item.type {...item.props} {...options} />
            }}
            onChange={onSlideChange}
            // renderArrowPrev={(onClick) => {
            //   return (
            //     <button
            //       id="prev-page"
            //       type="button"
            //       className="hidden"
            //       onClick={onClick}
            //     >
            //       Prev
            //     </button>
            //   )
            // }}
            // renderArrowNext={(onClick) => {
            //   return (
            //     <button
            //       id="next-page"
            //       type="button"
            //       className="hidden"
            //       onClick={onClick}
            //     >
            //       Next
            //     </button>
            //   )
            // }}
          >
            {items
              .filter((edge) => !!edge.node)
              .map((edge) => (
                <ViewItem
                  key={edge.node?.id}
                  publish={edge.node!}
                  isAuthenticated={isAuthenticated}
                  handleStartTip={handleStartTip}
                  onStartShare={onStartShare}
                  handleSavePublish={handleSavePublish}
                  openReportModal={openReportModal}
                  openCommentsModal={openCommentsModal}
                />
              ))}
          </Carousel>
        )}
      </div>

      {/* Tip modal */}
      {tipModalVisible && targetPublish && (
        <TipModal
          publishId={targetPublish?.id}
          closeModal={closeTipModal}
          creator={targetPublish.creator}
        />
      )}

      {/* Share modal */}
      {shareModalVisible && targetPublish && (
        <ShareModal
          publishId={targetPublish.id}
          title={targetPublish.title || ""}
          closeModal={closeShareModal}
        />
      )}

      {/* Add to playlist modal */}
      {addToPlaylistsModalVisible &&
        publishPlaylistsData &&
        targetPublish &&
        !loading && (
          <AddToPlaylistsModal
            closeModal={closeAddToPlaylistsModal}
            publishId={targetPublish.id}
            playlists={playlists}
            setPlaylists={setPlaylists}
            playlistsPageInfo={playlistsPageInfo}
            setPlaylistsPageInfo={setPlaylistsPageInfo}
            publishPlaylistsData={publishPlaylistsData}
          />
        )}

      {/* Report modal */}
      {reportModalVisible && targetPublish && (
        <ReportModal
          publishId={targetPublish.id}
          closeModal={closeReportModal}
        />
      )}
    </>
  )
}

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
