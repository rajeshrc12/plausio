import axios from "axios"

interface UploadUrl {
  partNumber: number
  url: string
}

interface UploadMultipartProps {
  file: File
  uploadId: string
  key: string
  partSize: number
  urls: UploadUrl[]
  contentType: string
  onProgress?: (progress: number) => void
}

export async function uploadMultipart({
  file,
  uploadId,
  key,
  partSize,
  urls,
  contentType,
  onProgress,
}: UploadMultipartProps) {
  const uploaded = new Array(urls.length).fill(0)

  const completedParts: {
    PartNumber: number
    ETag: string
  }[] = []

  const CONCURRENT_UPLOADS = 5

  let currentIndex = 0

  async function worker() {
    while (currentIndex < urls.length) {
      const index = currentIndex++

      const { partNumber, url } = urls[index]

      const start = (partNumber - 1) * partSize
      const end = Math.min(start + partSize, file.size)

      const chunk = file.slice(start, end)

      const response = await axios.put(url, chunk, {
        headers: {
          "Content-Type": contentType,
        },

        onUploadProgress(progress) {
          uploaded[index] = progress.loaded

          const uploadedBytes = uploaded.reduce((a, b) => a + b, 0)

          const percentage = Math.round((uploadedBytes / file.size) * 100)

          onProgress?.(percentage)
        },
      })

      const etag = response.headers.etag
      console.log(`Part ${index} completed`)
      completedParts.push({
        PartNumber: partNumber,
        ETag: etag,
      })
    }
  }

  await Promise.all(Array.from({ length: CONCURRENT_UPLOADS }, worker))

  completedParts.sort((a, b) => a.PartNumber - b.PartNumber)

  return {
    uploadId,
    key,
    parts: completedParts,
  }
}
