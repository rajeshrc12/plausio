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
