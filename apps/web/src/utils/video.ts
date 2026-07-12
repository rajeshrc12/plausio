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
