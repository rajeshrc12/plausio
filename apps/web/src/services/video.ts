import axios from "axios"

export type UploadedPart = {
  PartNumber: number
  ETag: string
}

export const uploadPart = async (
  url: string,
  file: Blob,
  partNumber: number
): Promise<UploadedPart> => {
  const { headers } = await axios.put(url, file, {
    headers: {
      "Content-Type": file.type || "application/octet-stream",
    },
  })

  const etag = headers.etag

  if (!etag) {
    throw new Error(`Missing ETag for part ${partNumber}`)
  }

  return {
    PartNumber: partNumber,
    ETag: etag, // Keep the quotes
  }
}

export const uploadMultipartFile = (
  file: File,
  urls: { partNumber: number; url: string }[],
  partSize: number
) => {
  return Promise.all(
    urls.map(({ partNumber, url }, index) => {
      const start = index * partSize
      const end = Math.min(start + partSize, file.size)

      return uploadPart(url, file.slice(start, end), partNumber)
    })
  )
}

export const uploadSingleFile = (
  file: File,
  url: { partNumber: number; url: string }
) => {
  return uploadPart(url.url, file, url.partNumber)
}
