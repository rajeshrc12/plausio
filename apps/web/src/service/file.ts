import axios from "axios"

interface UploadUrl {
  partNumber: number
  url: string
}

interface VideoUploadMultipartProps {
  file: File
  partSize: number
  urls: UploadUrl[]
  contentType: string
  onProgress?: (progress: number) => void
}

export async function videoUploadMultipart({
  file,
  partSize,
  urls,
  contentType,
  onProgress,
}: VideoUploadMultipartProps) {
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
    parts: completedParts,
  }
}

interface ThumbnailUploadMultipartProps {
  file: File | undefined
  thumbnailUrl: UploadUrl
  contentType: string | undefined
}

export async function thumbnailUpload({
  thumbnailUrl,
  file,
  contentType,
}: ThumbnailUploadMultipartProps) {
  const { partNumber, url } = thumbnailUrl

  const response = await axios.put(url, file, {
    headers: {
      "Content-Type": contentType,
    },
  })
  const etag = response.headers.etag

  return [
    {
      PartNumber: partNumber,
      ETag: etag,
    },
  ]
}
