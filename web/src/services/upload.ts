import axios from "axios"

interface Files {
  url: string
  name: string
  file: File
}

export const uploadFiles = async (files: Files[]) => {
  const results = await Promise.allSettled(
    files.map(async ({ url, file, name }) => {
      await axios.put(url, file, {
        headers: {
          "Content-Type": file.type || "application/octet-stream",
        },
      })

      return name
    })
  )

  return results.reduce<Record<string, boolean>>((acc, result, index) => {
    const name = files[index].name
    acc[name] = result.status === "fulfilled"

    return acc
  }, {})
}
