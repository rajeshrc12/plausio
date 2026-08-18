import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"

const BackButton = ({ controlsVisible }: { controlsVisible: boolean }) => {
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
  if (!isFullscreen)
    return (
      <button
        type="button"
        className={`absolute top-5 left-40 transition-opacity ${
          controlsVisible
            ? "pointer-events-none opacity-100"
            : "pointer-events-auto opacity-0"
        }`}
      >
        <ArrowLeft className="size-10" />
      </button>
    )
}
export default BackButton
