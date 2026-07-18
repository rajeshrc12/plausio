import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FileVideo, Pencil, Trash2 } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

const FileDropzone = ({
  value,
  onChange,
  accept,
  label,
}: {
  value?: File
  onChange: (file?: File) => void
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

    if (isVideo && !isMp4) {
      setPreviewUrl(undefined)
      return
    }

    const url = URL.createObjectURL(value)
    setPreviewUrl(url)

    return () => URL.revokeObjectURL(url)
  }, [value, isVideo, isMp4])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    multiple: false,
    accept,
    noClick: true, // we'll control opening manually
    onDrop: (files) => {
      if (files[0]) onChange(files[0])
    },
  })

  return (
    <div className="relative h-full overflow-hidden rounded-lg border border-dashed">
      {value && (
        <div className="absolute top-2 right-2 z-20 flex items-center gap-3 rounded-lg bg-background/80 p-2 shadow-lg backdrop-blur">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-3 w-3"
            onClick={(e) => {
              e.stopPropagation()
              open() // Edit
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-3 w-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation()
              onChange(undefined) // Delete
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div
        {...getRootProps()}
        className="flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg transition-colors hover:bg-muted/50"
        onClick={open}
      >
        <input {...getInputProps()} />

        {isDragActive ? (
          <p>Drop file here...</p>
        ) : value ? (
          <>
            {isImage && previewUrl && (
              <img
                onClick={(e) => e.stopPropagation()}
                src={previewUrl}
                alt={value.name}
                className="h-full w-full rounded-lg object-contain"
              />
            )}

            {isVideo &&
              (isMp4 && previewUrl ? (
                <video
                  onClick={(e) => e.stopPropagation()}
                  src={previewUrl}
                  controls
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
                  <FileVideo className="h-10 w-10 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Preview unavailable</p>
                    <p className="text-sm text-muted-foreground">
                      Only MP4 videos can be previewed. You can still upload
                      this file.
                    </p>
                  </div>
                </div>
              ))}
          </>
        ) : (
          <p>{label}</p>
        )}
      </div>
    </div>
  )
}

export default FileDropzone
