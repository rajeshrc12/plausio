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
        onClick={() => window.history.back()}
        type="button"
        className={`absolute top-5 left-4 transition-opacity md:left-10 lg:left-36 ${
          controlsVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <ArrowLeft className="size-10" />
      </button>
    )
}
export default BackButton
