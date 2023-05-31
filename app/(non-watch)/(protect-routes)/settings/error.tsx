"use client" // Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="text-center py-10">
      <h4 className="error font-semibold text-4xl">
        Sorry, something went wrong!
      </h4>
      <button
        className="btn-dark mt-10 px-8 rounded-full"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}
