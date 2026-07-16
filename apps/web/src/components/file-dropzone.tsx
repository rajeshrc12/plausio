import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"

const FileDropzone = ({
  value,
  onChange,
  accept,
  label,
}: {
  value?: File
  onChange: (file: File) => void
  accept: Record<string, string[]>
  label: string
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>()

  const isImage = value?.type.startsWith("image/")
  const isVideo = value?.type.startsWith("video/")
  const isMp4 =
    isVideo &&
    (value?.type === "video/mp4" || value?.name.toLowerCase().endsWith(".mp4"))

  useEffect(() => {
    if (!value) {
      setPreviewUrl(undefined)
      return
    }

    // Don't create a preview for non-MP4 videos
    if (isVideo && !isMp4) {
      setPreviewUrl(undefined)
      return
    }

    const url = URL.createObjectURL(value)
    setPreviewUrl(url)

    return () => URL.revokeObjectURL(url)
  }, [value, isVideo, isMp4])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept,
    onDrop: (files) => {
      if (files[0]) onChange(files[0])
    },
  })

  return (
    <div
      {...getRootProps()}
      className="flex h-full cursor-pointer items-center justify-center rounded-lg border border-dashed hover:bg-muted/50"
    >
      <input {...getInputProps()} />

      {isDragActive ? (
        <p>Drop file here...</p>
      ) : value ? (
        <>
          {isImage && previewUrl && (
            <img
              src={previewUrl}
              alt={value.name}
              className="rounded-lg object-contain"
            />
          )}

          {isVideo &&
            (isMp4 && previewUrl ? (
              <video src={previewUrl} controls className="rounded-lg" />
            ) : (
              <div>Preview is not available for this video format.</div>
            ))}
        </>
      ) : (
        <p>{label}</p>
      )}
    </div>
  )
}

export default FileDropzone
