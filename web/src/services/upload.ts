import axios from "axios"

interface UploadProps {
  file: File
  setProgress: React.Dispatch<React.SetStateAction<number>>
  url: string
}

export const uploadFiles = async ({
  file,
  setProgress,
  url,
}: UploadProps): Promise<boolean> => {
  try {
    await axios.put(url, file, {
      headers: {
        "Content-Type": file.type || "application/octet-stream",
      },
      onUploadProgress: (progressEvent) => {
        if (!progressEvent.total) return

        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        )

        setProgress(progress)
      },
    })

    setProgress(100)
    return true
  } catch (error) {
    console.error("S3 upload failed:", error)
    setProgress(0)
    return false
  }
}
