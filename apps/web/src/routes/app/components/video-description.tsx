import { getVideoCreationDate } from "@/utils/date"
import { useMemo, useState } from "react"

const MAX_LENGTH = 300

const VideoDescription = ({
  description,
  views,
  createdAt,
}: {
  description: string
  views: number
  createdAt: Date
}) => {
  if (!description) return "No description"
  const [expanded, setExpanded] = useState(false)

  const shouldTruncate = description.length > MAX_LENGTH

  const displayText = useMemo(() => {
    if (expanded || !shouldTruncate) return description

    return description.slice(0, MAX_LENGTH).trimEnd() + "..."
  }, [expanded, shouldTruncate, description])

  return (
    <div className="rounded-xl bg-accent p-3 text-sm wrap-break-word whitespace-pre-wrap">
      <div className="font-medium">
        {views} views {getVideoCreationDate(createdAt)}
      </div>
      <span className="text-sm">{displayText.trim()}</span>

      {shouldTruncate && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="ml-1 font-semibold hover:underline"
        >
          {expanded ? "show less" : "more"}
        </button>
      )}
    </div>
  )
}

export default VideoDescription
