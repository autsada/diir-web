import { useRef, useEffect } from "react"

/**
 * @param threshold number between 0 to 1
 * @param callback callback function
 */
export function useInfiniteScroll(threshold: number, callback: () => void) {
  const observedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    if (!observedRef?.current) return
    const ref = observedRef.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= threshold) {
            callback()
          }
        }
      },
      { root: null, threshold: threshold }
    )

    observer.observe(ref)

    return () => {
      if (ref) {
        observer.unobserve(ref)
      }
    }
  }, [callback, threshold])

  return { observedRef }
}
