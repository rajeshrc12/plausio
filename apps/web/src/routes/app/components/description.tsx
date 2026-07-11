import { useMemo, useState } from "react"

const MAX_LENGTH = 300

const Description = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false)

  const shouldTruncate = text.length > MAX_LENGTH

  const displayText = useMemo(() => {
    if (expanded || !shouldTruncate) return text

    return text.slice(0, MAX_LENGTH).trimEnd() + "..."
  }, [expanded, shouldTruncate, text])

  return (
    <div className="rounded-xl bg-accent p-3 text-sm wrap-break-word whitespace-pre-wrap">
      <span>{displayText.trim()}</span>

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
