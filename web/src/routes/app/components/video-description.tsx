import { getVideoCreationDate } from "@/utils/date"
import { useEffect, useRef, useState } from "react"

const VideoDescription = ({
  description,
  views,
  createdAt,
}: {
  description: string
  views: number
  createdAt: Date
}) => {
  const [expanded, setExpanded] = useState(false)
  const [showMore, setShowMore] = useState(false)

  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkOverflow = () => {
      const el = contentRef.current
      if (!el) return

      setShowMore(el.scrollHeight > el.clientHeight + 1)
    }

    checkOverflow()

    window.addEventListener("resize", checkOverflow)

    return () => {
      window.removeEventListener("resize", checkOverflow)
    }
  }, [description])

  if (!description) {
    return (
      <div className="rounded-xl bg-accent p-3 text-sm">
        <div className="font-medium">
          {views} views {getVideoCreationDate(createdAt)}
        </div>
        <div>No description</div>
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-accent p-3 text-sm">
      <div className="font-medium">
        {views} views {getVideoCreationDate(createdAt)}
      </div>

      <div
        ref={contentRef}
        className={`wrap-break-words mt-2 overflow-hidden whitespace-pre-wrap ${
          expanded ? "" : "max-h-5"
        }`}
      >
        {description}
      </div>

      {showMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 font-semibold hover:underline"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  )
}

export default VideoDescription
