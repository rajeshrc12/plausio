import { getVideoCreationDate } from "@/utils/date"
import { useMemo, useState } from "react"

const MAX_LENGTH = 300

const Description = ({
  text,
  views,
  createdAt,
}: {
  text: string
  views: number
  createdAt: Date
}) => {
  if (!text) return "No description"
  const [expanded, setExpanded] = useState(false)

  const shouldTruncate = text.length > MAX_LENGTH

  const displayText = useMemo(() => {
    if (expanded || !shouldTruncate) return text

    return text.slice(0, MAX_LENGTH).trimEnd() + "..."
  }, [expanded, shouldTruncate, text])

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

export default Description
