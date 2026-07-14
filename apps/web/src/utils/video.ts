import { env } from "@/config/env"
import { Duration } from "luxon"

export const getVideoDuration = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video")

    video.preload = "metadata"
    video.src = URL.createObjectURL(file)

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src)
      resolve(video.duration)
    }

    video.onerror = () => {
      URL.revokeObjectURL(video.src)
      reject(new Error("Failed to load video metadata"))
    }
  })
}

export const getVideoContainer = (type: string) => {
  if (type.includes("mp4")) return "mp4"
  if (type.includes("matroska")) return "mkv"
  return "unknown"
}
export const getImageContainer = (type: string) => {
  if (type.includes("jpg")) return "jpg"
  if (type.includes("jpeg")) return "jpeg"
  if (type.includes("png")) return "png"
  return "unknown"
}

export const formatVideoDuration = (duration: number) => {
  const d = Duration.fromObject({ seconds: duration }).shiftTo(
    "hours",
    "minutes",
    "seconds"
  )

  const hours = Math.floor(d.hours)
  const minutes = Math.floor(d.minutes)
  const seconds = Math.floor(d.seconds)

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
  }

  return `${minutes}:${String(seconds).padStart(2, "0")}`
}

export const getThumbnailUrl = (videoId: number) => {
  return `${env.AWS_CDN_URL}/thumbnail/${videoId}/original`
}
export const getVideoUrl = (videoId: number) => {
  return `${env.AWS_CDN_URL}/video/${videoId}/original`
}
export const getProfileUrl = (channelId: number) => {
  return `${env.AWS_CDN_URL}/profile/${channelId}/original`
}
