import { useSidebar } from "@/hooks/useSidebar"
import { useEffect } from "react"
import { useParams } from "react-router"

const Video = () => {
  const { id } = useParams()
  const setAppSidebar = useSidebar((state) => state.setAppSidebar)

  useEffect(() => {
    setAppSidebar(false)
    return () => {
      setAppSidebar(true)
    }
  }, [])
  return <div>Video {id}</div>
}

export default Video
