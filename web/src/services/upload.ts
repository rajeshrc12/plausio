import axios from "axios"

interface Files {
  url: string
  name: string
  file: File
}
interface UploadProps {
  files: Files[]
  setProgress: React.Dispatch<React.SetStateAction<number>>
}
export const uploadFiles = async ({ files, setProgress }: UploadProps) => {
  const totalSize = files.reduce((total, { file }) => total + file.size, 0)

  const uploadedByFile = new Map<string, number>()

  files.forEach(({ name }) => {
    uploadedByFile.set(name, 0)
  })

  const updateProgress = () => {
    const uploadedSize = Array.from(uploadedByFile.values()).reduce(
      (total, uploaded) => total + uploaded,
      0
    )

    const progress = Math.round((uploadedSize / totalSize) * 100)

    setProgress(progress)
  }

  const results = await Promise.allSettled(
    files.map(async ({ url, file, name }) => {
      await axios.put(url, file, {
        headers: {
          "Content-Type": file.type || "application/octet-stream",
        },

        onUploadProgress: ({ loaded }) => {
          uploadedByFile.set(name, loaded)
          updateProgress()
        },
      })

      // Make sure the file is considered fully uploaded
      uploadedByFile.set(name, file.size)
      updateProgress()

      return name
    })
  )

  return results.reduce<Record<string, boolean>>((acc, result, index) => {
    const name = files[index].name
    acc[name] = result.status === "fulfilled"

    return acc
  }, {})
}
