import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"

const BackButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  return (
    <button
      type="button"
      className={`absolute top-5 left-40 transition-opacity ${
        isFullscreen
          ? "pointer-events-none opacity-0"
          : "pointer-events-auto opacity-100"
      }`}
    >
      <ArrowLeft className="size-10" />
    </button>
  )
}
export default BackButton
